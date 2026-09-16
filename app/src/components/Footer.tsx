export function Footer() {
  return (
    <footer className="border-t border-border bg-card/20 py-8">
      <div className="container flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
        <p>© 2026 Naren Viswanath — built with ❤ · hosted on GitHub Pages</p>
        <a href="#home" className="text-primary transition-colors hover:text-primary/70">
          <span className="text-muted-foreground">$</span> cd ~
        </a>
      </div>
    </footer>
  );
}
