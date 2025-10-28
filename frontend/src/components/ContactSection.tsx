import React from 'react';
import { Card } from './ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface SocialLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function SocialLink({ icon, label, href }: SocialLinkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-background/80 to-muted/40 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <div className="w-6 h-6 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">{icon}</div>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ContactSection() {
  const socials = [
    { icon: <Github />, label: 'GitHub', href: 'https://github.com/marcesteban' },
    { icon: <Linkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/marcesteban' },
    { icon: <Mail />, label: 'Email', href: 'mailto:marcdelacruzesteban@gmail.com' },
  ];

  return (
    <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-center">Get in Touch</h3>
      <div className="flex gap-4 justify-center">
        {socials.map((social, index) => (
          <SocialLink key={index} {...social} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">+639934528204</p>
        <p className="text-xs text-muted-foreground">marcdelacruzesteban@gmail.com</p>
      </div>
    </Card>
  );
}
