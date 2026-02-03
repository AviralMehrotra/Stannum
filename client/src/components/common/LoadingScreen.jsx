import { Loader2, Server } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      {/* Background Decorative Elements - Changed to utilize Teal/Success theme */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-success/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative flex flex-col items-center gap-6 p-10 rounded-3xl bg-card shadow-2xl border border-border max-w-md mx-4 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          {/* Using text-success for the greenish tone */}
          <Loader2
            className="h-16 w-16 animate-spin text-success"
            color="teal"
          />
          <Server
            className="h-6 w-6 text-success absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            color="teal"
          />
        </div>

        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Waking Up Our Servers
          </h2>
          <p className="text-base text-muted-foreground">
            We're hosted on a free tier, so it takes about{" "}
            <span className="text-foreground font-medium underline decoration-success/50">
              30-50 seconds
            </span>{" "}
            for the backend to start after inactivity.
          </p>
          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-xs font-medium text-muted-foreground px-1">
              <span>Initializing...</span>
              <span>Almost there</span>
            </div>
            <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden shadow-inner border border-success/10">
              {/* Progress bar using gradient-secondary (Blue to Teal) for a premium green/blue look */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-full animate-loading-bar rounded-full" />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60 italic border-t border-border pt-4 w-full text-center">
          Thank you for your patience during the initial start.
        </p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 45s linear forwards;
        }
      `,
        }}
      />
    </div>
  );
}

export default LoadingScreen;
