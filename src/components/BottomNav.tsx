import { Link, useLocation } from "react-router-dom";
import { Home, FlaskConical, Mic, Music, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/science", icon: FlaskConical, label: "Science" },
  { path: "/translator", icon: Mic, label: "Translate" },
  { path: "/sounds", icon: Music, label: "Sounds" },
  { path: "/tips", icon: BookOpen, label: "Tips" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-primary bg-primary/10 scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "animate-bounce-soft")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
