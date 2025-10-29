import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, Code, Layers, Server, Palette } from 'lucide-react';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TechStackModal({ isOpen, onClose }: TechStackModalProps) {
  if (!isOpen) return null;

  const techStack = [
    { 
      icon: <Layers />, 
      name: 'Astro', 
      description: 'Modern static site generator with zero JS by default',
      version: 'v5.15.2',
      color: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
      features: ['Static Site Generation', 'Component Islands', 'Built-in Optimizations']
    },
    { 
      icon: <Server />, 
      name: 'Node.js', 
      description: 'JavaScript runtime for building scalable backend services',
      version: '>=18.0.0',
      color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      features: ['Express.js API', 'Email Service', 'CORS & Security']
    },
    { 
      icon: <Palette />, 
      name: 'Tailwind CSS', 
      description: 'Utility-first CSS framework for rapid UI development',
      version: 'v4.1.16',
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      features: ['Responsive Design', 'Dark Mode', 'Custom Components']
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background/98 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Code className="w-6 h-6 text-blue-500" />
                About This Portfolio
              </h2>
              <p className="text-muted-foreground">Built with modern web technologies</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-background/60 to-muted/20 border border-white/10 hover:scale-105 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tech.color}`}>
                      <div className="w-6 h-6 text-current">{tech.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{tech.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{tech.version}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">Key Features</h4>
                    <ul className="space-y-1">
                      {tech.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Architecture Overview */}
          <Card className="p-6 bg-gradient-to-br from-background/60 to-muted/20 border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-foreground">Full Stack Architecture</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Frontend</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span><strong className="text-orange-500">Astro</strong> - Static site generation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span><strong className="text-blue-500">React</strong> - Interactive components</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span><strong className="text-cyan-500">Tailwind CSS</strong> - Styling & animations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span><strong className="text-purple-500">TypeScript</strong> - Type safety</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Backend</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span><strong className="text-green-500">Node.js</strong> - Runtime environment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                      <span><strong className="text-gray-500">Express.js</strong> - Web framework</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span><strong className="text-purple-500">EmailJS</strong> - Contact form service</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </Card>
    </div>
  );
}
