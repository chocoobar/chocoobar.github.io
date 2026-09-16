import { useState, type FormEvent } from 'react';
import { Github, Instagram, Linkedin, Mail, MapPin, Twitter, type LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMagnetic } from '@/hooks/useMagnetic';
import { contactInfo, socialLinks } from '@/data/content';
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
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
    >
      <Icon className="h-[1.1rem] w-[1.1rem]" />
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
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      form.reset();
    }, 1500);
  }

  return (
    <section id="contact" className="bg-background py-24 md:py-36">
      <div className="container">
        <SectionHeading index="05" title="Get In Touch" subtitle="Let's work together on your next project" />

        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal index={0}>
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Email</h3>
                  <p className="text-foreground">{contactInfo.email}</p>
                </div>
              </div>

              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Location</h3>
                  <p className="text-foreground">{contactInfo.location}</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                {socialLinks.map((social) => (
                  <SocialLink key={social.label} {...social} />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal index={1}>
            <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-card p-9">
              <div className="mb-6 space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" name="name" placeholder="Ada Lovelace" />
              </div>
              <div className="mb-6 space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" name="email" type="email" placeholder="ada@example.com" />
              </div>
              <div className="mb-6 space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Let's build something" />
              </div>
              <div className="mb-6 space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" name="message" rows={5} placeholder="Tell me about your project" />
              </div>

              {status === 'error' && (
                <p role="alert" className="mb-4 text-sm font-medium text-destructive">
                  {errorMessage}
                </p>
              )}
              {status === 'success' && (
                <p role="status" className="mb-4 text-sm font-medium text-primary">
                  Thank you! Your message has been sent successfully.
                </p>
              )}

              <Button
                ref={submitRef}
                type="submit"
                size="lg"
                disabled={status === 'sending'}
                className={cn('w-full sm:w-auto', status === 'sending' && 'opacity-70')}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
