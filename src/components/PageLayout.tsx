import { ReactNode, forwardRef } from "react";
import { BottomNav } from "./BottomNav";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="min-h-screen bg-background pb-24">
        <main className="container max-w-md mx-auto px-4 py-6">
          {children}
        </main>
        <BottomNav />
      </div>
    );
  }
);

PageLayout.displayName = "PageLayout";
