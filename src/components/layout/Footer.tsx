import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Divyanshu Rathore. All rights reserved.
        </p>
        <a
          href="mailto:divyanshurathore2806@gmail.com"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Mail className="size-4" />
          divyanshurathore2806@gmail.com
        </a>
      </div>
    </footer>
  );
}
