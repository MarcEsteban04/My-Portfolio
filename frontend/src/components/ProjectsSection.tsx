import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollAnimation } from './ScrollAnimation';
import { ExternalLink, Github, Code, Calendar, Users, Zap } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  period: string;
  impact?: string;
  featured?: boolean;
}

function ProjectCard({ title, description, longDescription, tags, period, impact, featured }: ProjectProps) {
  return (
    <Card className={`group overflow-hidden rounded-3xl shadow-lg border border-white/10 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl hover:scale-[1.02] hover:border-white/20 ${featured ? 'ring-2 ring-blue-500/20' : ''}`}>
      {/* Project Header */}
      <div className="aspect-video bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/0 to-background/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
            <Code className="w-12 h-12 text-blue-500 group-hover:text-purple-500 transition-colors duration-300" />
          </div>
        </div>
        
        {featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-xs font-medium text-blue-400">
            Featured
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <Calendar className="w-3 h-3" />
          {period}
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-6 right-12 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Project Info */}
      <div className="p-8 space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors duration-300">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">{longDescription}</p>
        </div>

        {impact && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <Zap className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-400 font-medium">{impact}</span>
          </div>
        )}

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
            View Live
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-white/10 hover:border-white/20 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
            <Github className="w-4 h-4" />
            Source Code
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function ProjectsSection() {
  const projects: ProjectProps[] = [
    {
      title: 'RB Fireworks E-commerce Platform',
      description: 'Fully functional online store with catalog, cart, checkout, and user authentication.',
      longDescription: 'Developed a comprehensive e-commerce solution with integrated wishlist functionality, secure order tracking, and mobile-responsive design to boost user accessibility.',
      tags: ['HTML', 'PHP', 'MySQL', 'JavaScript', 'CSS'],
      period: 'Client Project',
      featured: true,
    },
    {
      title: 'AI-Powered Dermatology Support System',
      description: 'Clinic management & diagnostic support system with Google Gemini AI integration.',
      longDescription: 'Designed for DermaSculpt Clinic with appointment scheduling, booking, patient communication, symptom tracking, and AI-assisted clinical decision-making capabilities.',
      tags: ['React', 'Node.js', 'Google Gemini AI', 'MongoDB'],
      period: 'Capstone Project',
      impact: 'Improved efficiency by 25%',
      featured: true,
    },
    {
      title: 'M5B Hardware Inventory System',
      description: 'Comprehensive inventory management system with integrated POS features.',
      longDescription: 'Built using HTML, PHP, CSS, JavaScript, and MySQL. Enhanced inventory tracking and sales processing, reducing manual entry errors significantly.',
      tags: ['HTML', 'PHP', 'CSS', 'JavaScript', 'MySQL'],
      period: 'Sept 2023 – Oct 2023',
      impact: 'Reduced manual errors by 40%',
    },
    {
      title: 'AI-Powered Personal Finance Tracker',
      description: 'Personal finance dashboard with expense tracking, budgeting, and goal management.',
      longDescription: 'Features automated expense categorization using AI, personalized financial insights, real-time analytics, and comprehensive data visualization for better financial planning.',
      tags: ['React', 'Node.js', 'MongoDB', 'AI Integration'],
      period: 'Personal Project',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Projects Header */}
      <ScrollAnimation>
        <Card className="relative overflow-hidden bg-gradient-to-br from-background/60 via-muted/20 to-background/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
              My Projects
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A showcase of my work spanning e-commerce platforms, AI-powered applications, 
              inventory management systems, and innovative web solutions.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">4+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-muted-foreground">15+ Clients Served</span>
              </div>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        </Card>
      </ScrollAnimation>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ScrollAnimation key={index} delay={index * 200}>
            <ProjectCard {...project} />
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
}
