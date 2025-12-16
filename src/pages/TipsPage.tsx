import { forwardRef } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Eye, Heart, AlertTriangle, MessageCircle, Cat } from "lucide-react";

const tips = [
  {
    icon: Eye,
    title: "Watch Body Language",
    content: "Combine vocalizations with tail position, ear angle, and pupil size for full understanding. A slow blink means trust!",
    color: "bg-cat-teal",
  },
  {
    icon: MessageCircle,
    title: "Context Matters",
    content: "The same meow can mean different things. A meow near the food bowl likely means hunger, while one at the door means 'let me out.'",
    color: "bg-primary",
  },
  {
    icon: Heart,
    title: "Respond Consistently",
    content: "Cats learn that certain sounds get specific responses. Consistent reactions help develop a shared vocabulary with your cat.",
    color: "bg-cat-pink",
  },
  {
    icon: AlertTriangle,
    title: "Notice Changes",
    content: "Sudden changes in vocalization patterns can indicate health issues. More vocal or silent than usual? Consider a vet visit.",
    color: "bg-destructive",
  },
];

const bodyLanguageGuide = [
  {
    signal: "Slow Blink",
    meaning: "'I love and trust you' - Try blinking slowly back!",
    emoji: "😌",
  },
  {
    signal: "Tail Up",
    meaning: "Happy, confident, and friendly greeting",
    emoji: "😊",
  },
  {
    signal: "Tail Puffed",
    meaning: "Frightened or agitated - give space",
    emoji: "😨",
  },
  {
    signal: "Ears Forward",
    meaning: "Curious and interested in something",
    emoji: "🧐",
  },
  {
    signal: "Ears Flat",
    meaning: "Defensive, scared, or aggressive",
    emoji: "😾",
  },
  {
    signal: "Kneading",
    meaning: "Content and comforted (nursing behavior)",
    emoji: "🥰",
  },
  {
    signal: "Belly Exposed",
    meaning: "Trust (but not always an invitation to rub!)",
    emoji: "😸",
  },
  {
    signal: "Dilated Pupils",
    meaning: "Excited, playful, or potentially aggressive",
    emoji: "👀",
  },
];

const communicationTips = [
  "Speak in a higher pitch - cats respond better to softer, higher tones",
  "Use your cat's name often - they can recognize it!",
  "Never punish vocalization - it's their way of communicating with you",
  "Quiet cats aren't unhappy - some breeds are naturally quieter",
  "Meowing increases with age - senior cats often become more vocal",
];

const TipsPage = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <PageLayout ref={ref}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-display mb-2">Communication Tips</h1>
        <p className="text-muted-foreground">
          Strengthen your bond with your cat
        </p>
      </div>

      {/* Main Tips */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <Card 
              key={index} 
              variant="elevated"
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-xl ${tip.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{tip.title}</h3>
                <p className="text-xs text-muted-foreground">{tip.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Body Language Guide */}
      <Card variant="glass" className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Cat className="w-5 h-5 text-primary" />
            Body Language Decoder
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2">
            {bodyLanguageGuide.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50"
              >
                <span className="text-xl">{item.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{item.signal}</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">{item.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card variant="feature">
        <CardHeader>
          <CardTitle className="text-lg">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-3">
            {communicationTips.map((tip, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 text-sm animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Fun Fact Footer */}
      <div className="mt-6 text-center">
        <Card variant="gradient" className="inline-block">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-1">🐱 Fun Fact</p>
            <p className="text-xs text-muted-foreground">
              Cats purr at a frequency of 25-150 Hz, which has been shown to 
              promote healing and reduce stress in both cats and humans!
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
});

TipsPage.displayName = "TipsPage";

export default TipsPage;
