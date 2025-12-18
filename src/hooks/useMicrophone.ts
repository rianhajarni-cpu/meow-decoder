import { useState, useCallback, useRef, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { VoiceRecorder } from 'capacitor-voice-recorder';

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
      if (Capacitor.isNativePlatform()) {
        // On native, we'll check when trying to access
        console.log('Running on native platform:', Capacitor.getPlatform());
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

  const ensureNativeMicPermission = useCallback(async (): Promise<boolean> => {
    if (!Capacitor.isNativePlatform()) return true;

    try {
      const current = await VoiceRecorder.hasAudioRecordingPermission();
      if (current.value) return true;

      const requested = await VoiceRecorder.requestAudioRecordingPermission();
      return requested.value === true;
    } catch (e) {
      // If the plugin isn't available for some reason, fall back to getUserMedia prompt.
      console.warn('Native mic permission check/request failed, falling back to getUserMedia:', e);
      return true;
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      console.log('Requesting microphone permission...');
      console.log('Platform:', Capacitor.getPlatform());
      console.log('Is native:', Capacitor.isNativePlatform());

      const nativeOk = await ensureNativeMicPermission();
      if (!nativeOk) {
        setHasPermission(false);
        setError('Microphone permission denied. Go to Settings > Apps > MeowSpeak > Permissions and enable Microphone.');
        return false;
      }

      // Request microphone access - this triggers the permission prompt in browsers and some WebViews
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Permission granted, stop the stream immediately
      stream.getTracks().forEach((track) => track.stop());
      setHasPermission(true);
      console.log('Microphone permission granted');
      return true;
    } catch (err: any) {
      console.error('Microphone permission error:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      setHasPermission(false);

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        if (Capacitor.isNativePlatform()) {
          setError('Microphone permission denied. Go to Settings > Apps > MeowSpeak > Permissions and enable Microphone.');
        } else {
          setError('Microphone access denied. Please enable it in your browser settings.');
        }
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found on this device.');
      } else if (err.name === 'NotSupportedError') {
        setError('Microphone not supported on this device.');
      } else {
        setError('Failed to access microphone: ' + err.message);
      }
      return false;
    }
  }, [ensureNativeMicPermission]);

  const startListening = useCallback(async () => {
    try {
      setError(null);
      console.log('Starting microphone...');

      const nativeOk = await ensureNativeMicPermission();
      if (!nativeOk) {
        setHasPermission(false);
        setIsListening(false);
        setError('Microphone permission denied. Go to Settings > Apps > MeowSpeak > Permissions and enable Microphone.');
        throw new Error('Microphone permission denied');
      }

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        },
      });

      streamRef.current = stream;
      setIsListening(true);
      setHasPermission(true);
      console.log('Microphone started successfully');
    } catch (err: any) {
      console.error('Error starting microphone:', err);
      console.error('Error name:', err.name);
      setIsListening(false);

      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        if (Capacitor.isNativePlatform()) {
          setError('Microphone permission denied. Go to Settings > Apps > MeowSpeak > Permissions and enable Microphone.');
        } else {
          setError('Microphone access denied. Please enable it in your browser settings.');
        }
        setHasPermission(false);
      } else if (err?.name === 'NotFoundError') {
        setError('No microphone found on this device.');
      } else {
        setError('Failed to start microphone: ' + (err?.message ?? String(err)));
      }
      throw err;
    }
  }, [ensureNativeMicPermission]);

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
