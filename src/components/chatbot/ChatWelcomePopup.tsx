import { useEffect, useState } from "react";
import { MessageCircle, Sparkles, X } from "lucide-react";
import divrawebLogo from "@/assets/divraweb-logo.jpg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const WELCOME_POPUP_KEY = "divraweb_chat_welcome_popup_seen";

interface ChatWelcomePopupProps {
  onStartChat: () => void;
}

export function ChatWelcomePopup({ onStartChat }: ChatWelcomePopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(WELCOME_POPUP_KEY) === "true";
    if (seen) return;

    const timer = window.setTimeout(() => setOpen(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(WELCOME_POPUP_KEY, "true");
    setOpen(false);
  };

  const handleStartChat = () => {
    localStorage.setItem(WELCOME_POPUP_KEY, "true");
    setOpen(false);
    onStartChat();
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? handleDismiss() : setOpen(nextOpen))}>
      <DialogContent className="max-w-[92vw] overflow-hidden border-border bg-background p-0 shadow-2xl sm:max-w-md">
        <div className="relative">
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-4 top-4 z-10 inline-flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-accent"
            aria-label="Close welcome popup"
          >
            <X className="size-4" />
          </button>

          <div className="border-b border-border bg-gradient-to-br from-primary to-primary/80 px-6 pb-8 pt-7 text-primary-foreground">
            <div className="mb-5 flex items-center gap-3">
              <img src={divrawebLogo} alt="Divraweb logo" className="h-10 w-10 rounded-xl object-cover ring-2 ring-background/20" />
              <div>
                <DialogTitle className="text-left text-xl font-semibold text-primary-foreground">Need help choosing the right build?</DialogTitle>
                <DialogDescription className="mt-1 text-left text-primary-foreground/80">
                  Chat with Divraweb&apos;s AI assistant for quick answers, project guidance, or a faster way to connect.
                </DialogDescription>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-background/10 px-3 py-1 text-xs font-medium tracking-[0.22em] uppercase text-primary-foreground/85">
              <Sparkles className="size-3.5" />
              New visitor invite
            </div>
          </div>

          <div className="space-y-5 px-6 py-6">
            <div className="rounded-2xl border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
              Ask about services, timelines, project ideas, or jump straight into the contact form if you want Divyanshu to reply.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={handleStartChat} className="flex-1 rounded-full">
                <MessageCircle className="size-4" />
                Start chat
              </Button>
              <Button variant="outline" onClick={handleDismiss} className="flex-1 rounded-full">
                Maybe later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}