import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { Menu } from 'lucide-react';

import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/data/content';
import { cn } from '@/lib/utils';

interface Props {
  scrolled: boolean;
  activeId: string;
}

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  active: boolean;
}

// forwardRef + prop spreading so Radix's `Slot` (used by SheetClose asChild)
// can merge its onClick/ref onto the real anchor to close the mobile sheet.
const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ label, active, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground',
          active && 'text-primary hover:text-primary',
          className,
        )}
        {...props}
      >
        <span className="text-muted-foreground/50">/</span>
        {label}
        {active && <span className="caret" aria-hidden="true" />}
      </a>
    );
  },
);
NavLink.displayName = 'NavLink';

export function Navbar({ scrolled, activeId }: Props) {
  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-[1000] border-b border-transparent transition-all duration-300',
        scrolled && 'border-border bg-background/90 backdrop-blur-xl',
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={activeId === item.href.slice(1)} />
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle navigation menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="border-border">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="flex flex-col items-center gap-7 py-8">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <NavLink href={item.href} label={item.label} active={activeId === item.href.slice(1)} className="text-base" />
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
