import { useState, forwardRef } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Volume2 } from "lucide-react";

interface CatSound {
  name: string;
  description: string;
  meaning: string;
  emoji: string;
  category: "friendly" | "demanding" | "warning" | "other";
  tips: string;
}

const catSounds: CatSound[] = [
  {
    name: "Short Meow",
    description: "Quick, brief vocalization",
    meaning: "Standard greeting - 'Hello!'",
    emoji: "👋",
    category: "friendly",
    tips: "Common when you enter a room or come home",
  },
  {
    name: "Multiple Meows",
    description: "Several meows in quick succession",
    meaning: "Excited greeting - 'I'm so happy to see you!'",
    emoji: "🎉",
    category: "friendly",
    tips: "Often happens after you've been away",
  },
  {
    name: "Purring",
    description: "Continuous rumbling vibration",
    meaning: "Contentment - 'I'm happy and comfortable'",
    emoji: "😌",
    category: "friendly",
    tips: "Can also indicate self-soothing when stressed",
  },
  {
    name: "Trill / Chirrup",
    description: "Rising musical note, between meow and purr",
    meaning: "Happy acknowledgment - 'Follow me!'",
    emoji: "💕",
    category: "friendly",
    tips: "Mother cats use this to communicate with kittens",
  },
  {
    name: "Long Meow",
    description: "Extended, drawn-out vocalization",
    meaning: "Demand - 'I need something NOW!'",
    emoji: "😤",
    category: "demanding",
    tips: "Usually for food, attention, or to go outside",
  },
  {
    name: "Mid-Pitch Meow",
    description: "Standard pitch, moderate length",
    meaning: "Request - 'May I have something?'",
    emoji: "🙏",
    category: "demanding",
    tips: "More polite than a long meow",
  },
  {
    name: "Yowl / Howl",
    description: "Long, loud, wailing sound",
    meaning: "Distress or mating call - 'I'm upset!'",
    emoji: "😿",
    category: "demanding",
    tips: "May indicate pain if sudden onset",
  },
  {
    name: "Chattering",
    description: "Rapid teeth chattering, chirping sounds",
    meaning: "Prey frustration - 'I see prey but can't reach it!'",
    emoji: "🐦",
    category: "other",
    tips: "Usually when watching birds through window",
  },
  {
    name: "Hiss",
    description: "Sharp, air-expelling sound",
    meaning: "Warning - 'Back off! I'm scared!'",
    emoji: "😾",
    category: "warning",
    tips: "Give your cat space when they hiss",
  },
  {
    name: "Growl",
    description: "Low, rumbling vocalization",
    meaning: "Aggression - 'I'm about to attack'",
    emoji: "🙀",
    category: "warning",
    tips: "Do not approach - cat feels threatened",
  },
  {
    name: "Spit",
    description: "Short, explosive sound",
    meaning: "Startled defense - 'You surprised me!'",
    emoji: "⚡",
    category: "warning",
    tips: "Reflexive response to sudden threats",
  },
  {
    name: "Silent Meow",
    description: "Mouth moves but no audible sound",
    meaning: "Sweet request - 'Please? I'm being cute...'",
    emoji: "🥺",
    category: "friendly",
    tips: "Often used to manipulate their favorite human",
  },
];

const categoryColors = {
  friendly: "bg-cat-teal/10 border-cat-teal/30 text-cat-teal",
  demanding: "bg-primary/10 border-primary/30 text-primary",
  warning: "bg-destructive/10 border-destructive/30 text-destructive",
  other: "bg-secondary border-border text-foreground",
};

const categoryLabels = {
  friendly: "Friendly",
  demanding: "Demanding",
  warning: "Warning",
  other: "Other",
};

const SoundsPage = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedSound, setExpandedSound] = useState<string | null>(null);

  const filteredSounds = activeCategory
    ? catSounds.filter((s) => s.category === activeCategory)
    : catSounds;

  return (
    <PageLayout ref={ref}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Music className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-display mb-2">Sound Library</h1>
        <p className="text-muted-foreground">
          Complete guide to cat vocalizations
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(null)}
          className="whitespace-nowrap"
        >
          All ({catSounds.length})
        </Button>
        {Object.entries(categoryLabels).map(([key, label]) => {
          const count = catSounds.filter((s) => s.category === key).length;
          return (
            <Button
              key={key}
              variant={activeCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(key)}
              className="whitespace-nowrap"
            >
              {label} ({count})
            </Button>
          );
        })}
      </div>

      {/* Sound Cards */}
      <div className="space-y-3">
        {filteredSounds.map((sound, index) => (
          <Card
            key={sound.name}
            variant="interactive"
            className={`animate-fade-in cursor-pointer ${
              expandedSound === sound.name ? "ring-2 ring-primary" : ""
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setExpandedSound(expandedSound === sound.name ? null : sound.name)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{sound.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{sound.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[sound.category]}`}>
                      {categoryLabels[sound.category]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {sound.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Volume2 className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">
                      {sound.meaning}
                    </span>
                  </div>
                  
                  {/* Expanded Content */}
                  {expandedSound === sound.name && (
                    <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                      <p className="text-sm text-muted-foreground">
                        💡 <strong>Tip:</strong> {sound.tips}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Info */}
      <Card variant="gradient" className="mt-6">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Based on scientific research documenting 21+ distinct cat vocalizations. 
            Tap any sound card to learn more!
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  );
});

SoundsPage.displayName = "SoundsPage";

export default SoundsPage;
