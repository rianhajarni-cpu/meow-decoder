import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, BookOpen, Brain, Mic2, Users } from "lucide-react";

const researchFindings = [
  {
    icon: Mic2,
    title: "21+ Distinct Vocalizations",
    content: "Scientific research has documented at least 21 different types of cat vocalizations, each with specific meanings and contexts.",
    source: "Journal of Veterinary Behavior",
  },
  {
    icon: Users,
    title: "Human-Directed Meows",
    content: "Adult cats primarily meow to communicate with humans. They developed this behavior specifically for human interaction over 12,000 years of domestication.",
    source: "Applied Animal Behaviour Science",
  },
  {
    icon: Brain,
    title: "Context-Dependent Sounds",
    content: "Cat meows vary in duration, pitch, and intonation based on context - whether requesting food, greeting, or expressing discomfort.",
    source: "ScienceDirect 2023",
  },
];

const vocalCategories = [
  {
    category: "Murmur Patterns",
    sounds: ["Purring", "Trill", "Chirrups"],
    meaning: "Contentment, greeting, acknowledgment",
    color: "bg-cat-teal/10 text-cat-teal",
  },
  {
    category: "Vowel Patterns",
    sounds: ["Meow", "Mew", "Howl"],
    meaning: "Requests, complaints, mating calls",
    color: "bg-primary/10 text-primary",
  },
  {
    category: "Strained Intensity",
    sounds: ["Growl", "Hiss", "Spit", "Shriek"],
    meaning: "Warning, defense, aggression",
    color: "bg-destructive/10 text-destructive",
  },
];

export default function SciencePage() {
  return (
    <PageLayout>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <FlaskConical className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-display mb-2">The Science</h1>
        <p className="text-muted-foreground">
          Peer-reviewed research on cat communication
        </p>
      </div>

      {/* Research Findings */}
      <div className="space-y-4 mb-8">
        <h2 className="font-semibold font-display flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Key Research Findings
        </h2>
        
        {researchFindings.map((finding, index) => {
          const Icon = finding.icon;
          return (
            <Card 
              key={index} 
              variant="elevated" 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{finding.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{finding.content}</p>
                    <span className="text-xs text-primary font-medium">{finding.source}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Vocal Categories */}
      <div className="space-y-4 mb-8">
        <h2 className="font-semibold font-display">Vocalization Categories</h2>
        
        {vocalCategories.map((cat, index) => (
          <Card 
            key={index} 
            variant="glass"
            className="animate-slide-in-right"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-4">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${cat.color}`}>
                {cat.category}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {cat.sounds.map((sound) => (
                  <span key={sound} className="px-2 py-1 bg-secondary rounded-lg text-xs font-medium">
                    {sound}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{cat.meaning}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Technology */}
      <Card variant="gradient">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI-Powered Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Modern AI tools are now being developed to analyze cat vocalizations, 
            suggesting that cats have a far richer vocabulary than previously thought. 
            Apps like MeowSpeak use machine learning to decode the 12,000-year conversation 
            between cats and humans.
          </p>
          <div className="mt-4 p-3 bg-primary/5 rounded-xl">
            <p className="text-xs text-muted-foreground italic">
              "AI is shedding new light on cat-human communication, revealing house cats 
              wield a far richer vocabulary than once thought."
              <br />
              <span className="text-primary font-medium">— Scientific American, 2025</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
