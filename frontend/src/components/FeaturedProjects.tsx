import React from 'react';
import { Card } from './ui/card';
import { ExternalLink, Github, Code } from 'lucide-react';
import { Button } from './ui/button';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden rounded-3xl shadow-lg border border-white/10 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl hover:scale-[1.02] hover:border-white/20">
      {/* Project Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/0 to-background/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
            <Code className="w-10 h-10 text-blue-500 group-hover:text-purple-500 transition-colors duration-300" />
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Project Info */}
      <div className="p-8 space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors duration-300">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-background/80 to-muted/40 backdrop-blur-sm border border-white/10 rounded-full text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" size="sm" className="flex-1 gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10 hover:border-white/20 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300">
            <ExternalLink className="w-4 h-4" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-white/10 hover:border-white/20 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
            <Github className="w-4 h-4" />
            Code
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function FeaturedProjects() {
  const projects = [
    {
      title: 'RB Fireworks E-commerce Platform',
      description: 'Fully functional online store with catalog, cart, checkout, and user authentication. Integrated wishlist and secure order tracking features.',
      tags: ['HTML', 'PHP', 'MySQL', 'JavaScript'],
    },
    {
      title: 'AI-Powered Dermatology Support System',
      description: 'Clinic management & diagnostic support system with Google Gemini AI integration for patient support and clinical decision-making.',
      tags: ['React', 'Node.js', 'Google Gemini AI'],
    },
    {
      title: 'M5B Hardware Inventory System',
      description: 'Comprehensive inventory management system with integrated POS features, reducing manual entry errors by 40%.',
      tags: ['HTML', 'PHP', 'CSS', 'MySQL'],
    },
    {
      title: 'AI-Powered Personal Finance Tracker',
      description: 'Personal finance dashboard with expense tracking, budgeting, and AI-powered automated categorization.',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Featured Work</h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          View All →
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
