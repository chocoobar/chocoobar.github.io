import { useState, type FormEvent, type ReactNode } from 'react';
import { Github, Instagram, Linkedin, Mail, MapPin, Twitter, type LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { TerminalWindow } from '@/components/TerminalWindow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMagnetic } from '@/hooks/useMagnetic';
import { contactInfo, sectionCommands, socialLinks } from '@/data/content';
import { cn } from '@/lib/utils';

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

function SocialLink({ href, label, icon }: (typeof socialLinks)[number]) {
  const ref = useMagnetic<HTMLAnchorElement>(0.4);
  const Icon = socialIcons[icon];
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded border border-border text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

type Status = 'idle' | 'error' | 'sending' | 'success';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const submitRef = useMagnetic<HTMLButtonElement>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email') as string;
    const subject = data.get('subject');
    const message = data.get('message');

    if (!name || !email || !subject || !message) {
      setStatus('error');
      setErrorMessage('missing required field(s)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('invalid email format');
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      form.reset();
    }, 1500);
  }

  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <div className="container">
        <SectionHeading command={sectionCommands.contact} title="Get In Touch" subtitle="Let's work together on your next project" />

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <Reveal index={0}>
            <div className="space-y-6 font-mono text-sm">
              <div>
                <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  email
                </div>
                <p className="text-foreground">{contactInfo.email}</p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  location
                </div>
                <p className="text-foreground">{contactInfo.location}</p>
              </div>
              <div className="flex gap-2.5 pt-2">
                {socialLinks.map((social) => (
                  <SocialLink key={social.label} {...social} />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal index={1}>
            <TerminalWindow title="contact.sh">
              <form onSubmit={handleSubmit} noValidate className="space-y-5 font-mono text-sm">
                <FormField label="name">
                  <Input id="name" name="name" placeholder="ada_lovelace" />
                </FormField>
                <FormField label="email">
                  <Input id="email" name="email" type="email" placeholder="ada@example.com" />
                </FormField>
                <FormField label="subject">
                  <Input id="subject" name="subject" placeholder="lets-build-something" />
                </FormField>
                <FormField label="message">
                  <Textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." />
                </FormField>

                {status === 'error' && (
                  <p role="alert" className="text-destructive">
                    <span className="text-muted-foreground">[ERROR]</span> {errorMessage}
                  </p>
                )}
                {status === 'success' && (
                  <p role="status" className="text-primary">
                    <span className="text-muted-foreground">[OK]</span> message sent successfully
                  </p>
                )}

                <Button
                  ref={submitRef}
                  type="submit"
                  disabled={status === 'sending'}
                  className={cn('w-full justify-start rounded-sm sm:w-auto', status === 'sending' && 'opacity-70')}
                >
                  <span className="text-muted-foreground">$</span>
                  {status === 'sending' ? 'sending...' : './send.sh'}
                </Button>
              </form>
            </TerminalWindow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={label} className="text-primary/80">
        {label}=
      </Label>
      {children}
    </div>
  );
}
