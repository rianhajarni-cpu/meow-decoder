import { useState, useRef, useEffect, forwardRef } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, RefreshCw, Cat, AlertCircle } from "lucide-react";
import { useMicrophone } from "@/hooks/useMicrophone";
import catMascot from "@/assets/cat-mascot.png";

const catTranslations = [
  { sound: "Short meow", meaning: "Hello! Nice to see you!", mood: "happy" },
  { sound: "Multiple meows", meaning: "I'm so excited to see you!", mood: "excited" },
  { sound: "Mid-pitch meow", meaning: "I'd like something, please", mood: "requesting" },
  { sound: "Long, drawn-out meow", meaning: "I really need your attention now!", mood: "demanding" },
  { sound: "Low-pitch meow", meaning: "I'm not happy about something", mood: "annoyed" },
  { sound: "High-pitch meow", meaning: "That hurt! or I'm startled", mood: "distressed" },
  { sound: "Purring", meaning: "I'm content and comfortable", mood: "content" },
  { sound: "Trill/Chirrup", meaning: "Happy greeting! Follow me!", mood: "friendly" },
  { sound: "Chattering", meaning: "I see prey but can't reach it!", mood: "frustrated" },
  { sound: "Hissing", meaning: "Back off! I feel threatened", mood: "defensive" },
];

const moodEmojis: Record<string, string> = {
  happy: "😊",
  excited: "🎉",
  requesting: "🙏",
  demanding: "😤",
  annoyed: "😾",
  distressed: "😿",
  content: "😌",
  friendly: "💕",
  frustrated: "😾",
  defensive: "🙀",
};

const moodColors: Record<string, string> = {
  happy: "bg-cat-teal/20 border-cat-teal",
  excited: "bg-cat-pink/20 border-cat-pink",
  requesting: "bg-primary/20 border-primary",
  demanding: "bg-primary/20 border-primary",
  annoyed: "bg-cat-brown/20 border-cat-brown",
  distressed: "bg-destructive/20 border-destructive",
  content: "bg-cat-teal/20 border-cat-teal",
  friendly: "bg-cat-pink/20 border-cat-pink",
  frustrated: "bg-primary/20 border-primary",
  defensive: "bg-destructive/20 border-destructive",
};

const TranslatorPage = forwardRef<HTMLDivElement>((_, ref) => {
  const { isListening, error, startListening: startMic, stopListening: stopMic } = useMicrophone();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<typeof catTranslations[0] | null>(null);
  const [waveformLevels, setWaveformLevels] = useState<number[]>(Array(12).fill(0.3));
  const animationRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const simulateWaveform = () => {
    const newLevels = Array(12).fill(0).map(() => 0.3 + Math.random() * 0.7);
    setWaveformLevels(newLevels);
    animationRef.current = requestAnimationFrame(simulateWaveform);
  };

  const handleStartListening = async () => {
    try {
      await startMic();
      setCurrentTranslation(null);
      
      // Start waveform animation
      animationRef.current = requestAnimationFrame(simulateWaveform);
      
      // Simulate detection after random time
      timeoutRef.current = setTimeout(() => {
        handleStopListening();
        setIsAnalyzing(true);
        
        // Simulate analysis
        setTimeout(() => {
          setIsAnalyzing(false);
          const randomTranslation = catTranslations[Math.floor(Math.random() * catTranslations.length)];
          setCurrentTranslation(randomTranslation);
        }, 1500);
      }, 2000 + Math.random() * 2000);
      
    } catch (err) {
      console.error("Failed to start listening:", err);
    }
  };

  const handleStopListening = () => {
    stopMic();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setWaveformLevels(Array(12).fill(0.3));
  };

  const reset = () => {
    setCurrentTranslation(null);
    setIsAnalyzing(false);
    handleStopListening();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <PageLayout>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold font-display mb-2">Cat Translator</h1>
        <p className="text-muted-foreground">
          Tap to listen and decode your cat's message
        </p>
      </div>

      {/* Main Translator Interface */}
      <Card variant="gradient" className="mb-6 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            {/* Cat Mascot */}
            <div className="relative mb-4">
              <img
                src={catMascot}
                alt="Cat"
                className={`w-24 h-24 ${isListening ? "animate-pulse-soft" : ""}`}
              />
              {isListening && (
                <div className="absolute -inset-4 rounded-full border-4 border-primary/30 animate-ping" />
              )}
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-center gap-1 h-16 mb-6">
              {waveformLevels.map((level, i) => (
                <div
                  key={i}
                  className="w-2 bg-primary rounded-full transition-all duration-100"
                  style={{ 
                    height: `${level * 48}px`,
                    opacity: isListening ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-destructive mb-4 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Status Text */}
            <p className="text-sm font-medium text-muted-foreground mb-4">
              {isListening && "Listening for meows..."}
              {isAnalyzing && "Analyzing cat sound..."}
              {!isListening && !isAnalyzing && !currentTranslation && !error && "Tap the button to start"}
              {currentTranslation && "Translation complete!"}
            </p>

            {/* Main Button */}
            {!currentTranslation ? (
              <Button
                variant={isListening ? "destructive" : "glow"}
                size="xl"
                className="w-full max-w-xs"
                onClick={isListening ? handleStopListening : handleStartListening}
                disabled={isAnalyzing}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-6 h-6" />
                    Stop Listening
                  </>
                ) : isAnalyzing ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6" />
                    Start Listening
                  </>
                )}
              </Button>
            ) : (
              <Button variant="outline" size="lg" onClick={reset}>
                <RefreshCw className="w-5 h-5" />
                Translate Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Translation Result */}
      {currentTranslation && (
        <Card 
          variant="elevated" 
          className={`animate-scale-in border-2 ${moodColors[currentTranslation.mood]}`}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-4xl mb-3">
                {moodEmojis[currentTranslation.mood]}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-3">
                <Volume2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {currentTranslation.sound}
                </span>
              </div>
              
              <p className="text-xl font-semibold font-display mb-2">
                "{currentTranslation.meaning}"
              </p>
              
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm">
                <Cat className="w-3 h-3" />
                <span className="capitalize">{currentTranslation.mood}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      {!currentTranslation && !isListening && !isAnalyzing && (
        <Card variant="feature" className="animate-fade-in">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-2">💡 Pro Tips:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Hold your phone near your cat when they vocalize</li>
              <li>• Works best with clear, distinct sounds</li>
              <li>• Try during feeding time for best results</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
});

TranslatorPage.displayName = "TranslatorPage";

export default TranslatorPage;
