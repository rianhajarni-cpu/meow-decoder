import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";
import { Mic, FlaskConical, Music, BookOpen, Cat, Sparkles } from "lucide-react";
import catMascot from "@/assets/cat-mascot.png";

const features = [
  {
    icon: FlaskConical,
    title: "Science-Based",
    description: "21+ documented cat vocalizations",
    path: "/science",
    delay: "100ms",
  },
  {
    icon: Mic,
    title: "Real-Time Translation",
    description: "Decode meows instantly",
    path: "/translator",
    delay: "200ms",
  },
  {
    icon: Music,
    title: "Sound Library",
    description: "Complete vocalization guide",
    path: "/sounds",
    delay: "300ms",
  },
  {
    icon: BookOpen,
    title: "Cat Communication Tips",
    description: "Understand your feline friend",
    path: "/tips",
    delay: "400ms",
  },
];

export default function HomePage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="text-center pt-4 pb-8">
        <div className="relative inline-block mb-6">
          <img
            src={catMascot}
            alt="MeowSpeak mascot"
            className="w-32 h-32 mx-auto animate-float"
          />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-primary animate-pulse-soft" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold font-display mb-3 text-gradient">
          MeowSpeak
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-xs mx-auto">
          Decode your cat's language with science-backed translation
        </p>
        
        <Link to="/translator">
          <Button variant="hero" size="xl" className="gap-3">
            <Mic className="w-5 h-5" />
            Start Translating
          </Button>
        </Link>
      </div>

      {/* Stats Bar */}
      <Card variant="gradient" className="mb-8">
        <CardContent className="py-4">
          <div className="flex items-center justify-around text-center">
            <div>
              <div className="text-2xl font-bold text-primary">21+</div>
              <div className="text-xs text-muted-foreground">Sounds</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-2xl font-bold text-primary">12K</div>
              <div className="text-xs text-muted-foreground">Years of Study</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-2xl font-bold text-primary">AI</div>
              <div className="text-xs text-muted-foreground">Powered</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold font-display flex items-center gap-2 px-1">
          <Cat className="w-5 h-5 text-primary" />
          Explore Features
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.path}
                to={feature.path}
                className="animate-fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <Card variant="interactive" className="h-full">
                  <CardContent className="p-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Fun Fact */}
      <Card variant="feature" className="mt-8">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🐱</div>
            <div>
              <p className="font-medium text-sm mb-1">Did you know?</p>
              <p className="text-xs text-muted-foreground">
                Adult cats primarily meow to communicate with humans, not other cats! 
                They've evolved this behavior specifically for us over 12,000 years.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
