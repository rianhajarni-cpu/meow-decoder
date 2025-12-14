import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="container max-w-md mx-auto px-4 py-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
