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
          'group relative pb-1 text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:text-foreground',
          active && 'text-foreground',
          className,
        )}
        {...props}
      >
        {label}
        <span
          className={cn(
            'absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-sky-400 transition-all duration-300 ease-spring group-hover:w-full',
            active && 'w-full',
          )}
        />
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
        scrolled && 'border-border/80 bg-background/85 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl',
      )}
    >
      <div className="container flex h-[70px] items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-9 md:flex">
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
          <SheetContent side="top" className="rounded-b-2xl border-border">
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
