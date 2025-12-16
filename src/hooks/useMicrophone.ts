import { useState, useCallback, useRef, useEffect } from 'react';

// Check if we're running in a Capacitor environment
const isCapacitor = () => {
  return typeof window !== 'undefined' && !!(window as any).Capacitor;
};

interface UseMicrophoneReturn {
  isListening: boolean;
  hasPermission: boolean | null;
  error: string | null;
  startListening: () => Promise<void>;
  stopListening: () => void;
  requestPermission: () => Promise<boolean>;
}

export function useMicrophone(): UseMicrophoneReturn {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check permission status on mount
  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      if (isCapacitor()) {
        // For Capacitor, we'll check when user tries to use the mic
        console.log('Running in Capacitor environment');
        setHasPermission(null);
      } else {
        // For web, check using Permissions API
        const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setHasPermission(result.state === 'granted');
        
        result.onchange = () => {
          setHasPermission(result.state === 'granted');
        };
      }
    } catch (err) {
      console.log('Permission check not supported, will request on use');
      setHasPermission(null);
    }
  };

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      
      // Permission granted, stop the stream immediately
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      console.log('Microphone permission granted');
      return true;
    } catch (err: any) {
      console.error('Microphone permission error:', err);
      setHasPermission(false);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone access denied. Please enable it in your device settings.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found on this device.');
      } else {
        setError('Failed to access microphone: ' + err.message);
      }
      return false;
    }
  }, []);

  const startListening = useCallback(async () => {
    try {
      setError(null);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        }
      });
      
      streamRef.current = stream;
      setIsListening(true);
      setHasPermission(true);
      console.log('Microphone started successfully');
      
    } catch (err: any) {
      console.error('Error starting microphone:', err);
      setIsListening(false);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone access denied. Please enable it in your device settings.');
        setHasPermission(false);
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found on this device.');
      } else {
        setError('Failed to start microphone: ' + err.message);
      }
      throw err;
    }
  }, []);

  const stopListening = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Microphone track stopped');
      });
      streamRef.current = null;
    }
    setIsListening(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return {
    isListening,
    hasPermission,
    error,
    startListening,
    stopListening,
    requestPermission,
  };
}
