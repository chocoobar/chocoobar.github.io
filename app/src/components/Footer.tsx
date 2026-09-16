export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 py-9">
      <div className="container flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">&copy; 2026 Naren Viswanath. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <p className="text-sm text-muted-foreground">Built with ❤️ and hosted on GitHub Pages</p>
          <a href="#home" className="text-sm font-semibold text-primary hover:underline">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
