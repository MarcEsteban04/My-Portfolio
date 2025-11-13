import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollAnimation } from './ScrollAnimation';
import { ExternalLink, Github, Code, Search, Filter, Calendar, Users, Zap, Star, Clock, CheckCircle, AlertCircle, Lightbulb, Eye, Image } from 'lucide-react';

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  period: string;
  status: 'completed' | 'in-progress' | 'concept' | 'planning';
  impact?: string;
  featured?: boolean;
  image?: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  client?: string;
  testimonial?: string;
  metrics?: {
    users?: string;
    performance?: string;
    satisfaction?: string;
  };
}

function ProjectCard({ project, onViewDetails, onViewGallery }: { project: ProjectProps; onViewDetails: (project: ProjectProps) => void; onViewGallery: (project: ProjectProps) => void }) {

  const statusConfig = {
    completed: { icon: <CheckCircle className="w-4 h-4" />, color: 'from-green-500 to-green-600', text: 'Completed' },
    'in-progress': { icon: <Clock className="w-4 h-4" />, color: 'from-blue-500 to-blue-600', text: 'In Progress' },
    concept: { icon: <Lightbulb className="w-4 h-4" />, color: 'from-purple-500 to-purple-600', text: 'Concept' },
    planning: { icon: <AlertCircle className="w-4 h-4" />, color: 'from-orange-500 to-orange-600', text: 'Planning' }
  };


  return (
    <Card className="group overflow-hidden rounded-3xl shadow-lg border border-white/10 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl hover:scale-[1.02] hover:border-white/20 break-inside-avoid mb-6">
      {/* Project Header */}
      <div className="aspect-video bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 relative overflow-hidden">
        {project.image ? (
          <>
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to default design if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/0 to-background/30" />
          </>
        ) : project.liveUrl ? (
          <>
            <iframe 
              src={project.liveUrl}
              className="w-full h-full border-0 scale-50 origin-top-left transform"
              style={{ width: '200%', height: '200%' }}
              title={`${project.title} Preview`}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/0 to-background/30 pointer-events-none" />
            <div className="absolute top-2 left-2 px-2 py-1 bg-green-500/80 backdrop-blur-sm rounded-md text-xs text-white font-medium">
              Live Preview
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-background/0 to-background/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Code className="w-12 h-12 text-blue-500 group-hover:text-purple-500 transition-colors duration-300" />
              </div>
            </div>
          </>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${statusConfig[project.status].color} rounded-full text-white text-xs font-medium`}>
          {statusConfig[project.status].icon}
          {statusConfig[project.status].text}
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-medium">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}
        
        {/* Period */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
          <Calendar className="w-3 h-3" />
          {project.period}
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-6 right-12 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Project Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors duration-300">{project.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
          {project.client && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              Client: {project.client}
            </div>
          )}
        </div>

        {/* Impact Metric */}
        {project.impact && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <Zap className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-400 font-medium">{project.impact}</span>
          </div>
        )}


        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-background/80 to-muted/40 backdrop-blur-sm border border-white/10 rounded-full text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-background/80 to-muted/40 backdrop-blur-sm border border-white/10 rounded-full text-muted-foreground">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10 hover:border-white/20 transition-all duration-300"
            onClick={() => onViewDetails(project)}
          >
            <Eye className="w-4 h-4" />
            Details
          </Button>
          {project.images && project.images.length > 1 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-white/10 hover:border-white/20 transition-all duration-300"
              onClick={() => onViewGallery(project)}
            >
              <Image className="w-4 h-4" />
              Gallery
            </Button>
          )}
          {project.liveUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-white/10 hover:border-white/20 transition-all duration-300"
              asChild
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Live
              </a>
            </Button>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-white/10 hover:border-white/20 transition-all duration-300"
              asChild
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function GalleryModal({ project, isOpen, onClose }: { project: ProjectProps | null; isOpen: boolean; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !project || !project.images) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl max-h-[90vh]">
        {/* Close Button */}
        <Button 
          variant="ghost" 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
        >
          ✕
        </Button>

        {/* Navigation Buttons */}
        {project.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              ←
            </Button>
            <Button
              variant="ghost"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              →
            </Button>
          </>
        )}

        {/* Main Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {project.images.length}
        </div>

        {/* Thumbnail Navigation */}
        {project.images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex ? 'border-blue-500 scale-110' : 'border-white/30 hover:border-white/60'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectModal({ project, isOpen, onClose }: { project: ProjectProps | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background/90 to-muted/20 backdrop-blur-xl border border-white/20 rounded-3xl">
        <div className="p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
              <p className="text-muted-foreground">{project.client && `Client: ${project.client}`}</p>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-muted-foreground hover:text-foreground">
              ✕
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Project Overview</h3>
                <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </div>

            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-background/80 to-muted/40 backdrop-blur-sm border border-white/10 rounded-full text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <Button 
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white gap-2"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View Live Project
                </a>
              </Button>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  View Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export function EnhancedProjectsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  const projects: ProjectProps[] = [
    {
      id: '1',
      title: 'AI-Powered Dermatology Support System',
      description: 'Comprehensive clinic management system with Google Gemini AI integration for diagnostic support.',
      longDescription: 'Developed for DermaSculpt Clinic featuring appointment scheduling, patient communication, symptom tracking, and AI-assisted clinical decision-making. The system includes real-time chat support, automated patient follow-ups, and intelligent diagnostic recommendations powered by Google Gemini AI.',
      tags: ['HTML', 'CSS', 'TailwindCSS', 'PHP', 'MySQL', 'JavaScript', 'Gemini AI'],
      category: 'Healthcare',
      period: 'Capstone Project 2024',
      status: 'completed',
      impact: 'Improved clinic efficiency by 35%',
      client: 'DermaSculpt Clinic',
      metrics: {
        users: '150+',
        performance: '+35%',
        satisfaction: '96%'
      },
      image: '/dermasculpt/derma1.png',
      images: [
        '/dermasculpt/derma1.png',
        '/dermasculpt/derma2.png',
        '/dermasculpt/derma3.png',
        '/dermasculpt/derma4.png',
        '/dermasculpt/derma5.png',
        '/dermasculpt/derma6.png',
        '/dermasculpt/derma7.png',
        '/dermasculpt/derma8.png',
        '/dermasculpt/derma9.png',
        '/dermasculpt/derma10.png',
        '/dermasculpt/derma11.png',
        '/dermasculpt/derma12.png',
        '/dermasculpt/derma13.png',
        '/dermasculpt/derma14.png',
        '/dermasculpt/derma15.png'
      ]
    },
    {
      id: '2',
      title: 'RB Fireworks E-commerce Platform',
      description: 'Full-featured online fireworks store with catalog, cart, checkout, and user management.',
      longDescription: 'Complete e-commerce solution with integrated wishlist functionality, secure order tracking, and mobile-responsive design. Features advanced product filtering, real-time inventory management, secure payment processing, and comprehensive admin dashboard for order management.',
      tags: ['HTML', 'PHP', 'MySQL', 'JavaScript', 'CSS', 'Bootstrap'],
      category: 'E-commerce',
      period: 'Client Project 2025',
      status: 'completed',
      impact: 'Increased online sales by 150%',
      client: 'RB Fireworks',
      metrics: {
        users: '500+',
        performance: '+40%',
        satisfaction: '98%'
      },
      liveUrl: 'https://cs42a.com/rb_fireworks_shop/',
      githubUrl: '#',
      image: '/rbfireworks/rb_fireworks.png',
      images: [
        '/rbfireworks/rb_fireworks.png'
      ]
    },
    {
      id: '3',
      title: 'AI-Powered Learning Assistant for ACLC',
      description: 'Intelligent learning platform with personalized study recommendations and progress tracking.',
      longDescription: 'Educational technology solution designed for ACLC College of Sta. Maria students featuring AI-powered study recommendations, interactive learning modules, progress analytics, and personalized learning paths. Includes real-time collaboration tools and comprehensive performance tracking.',
      tags: ['HTML', 'CSS', 'TailwindCSS', 'PHP', 'MySQL', 'JavaScript', 'Gemini AI'],
      category: 'Education',
      period: 'Academic Project 2024',
      status: 'completed',
      impact: 'Enhanced learning outcomes by 40%',
      client: 'ACLC College of Sta. Maria',
      metrics: {
        users: '300+',
        performance: '+40%',
        satisfaction: '94%'
      },
      image: '/ai-learning-assistant/Screenshot1.png',
      images: [
        '/ai-learning-assistant/Screenshot1.png',
        '/ai-learning-assistant/Screenshot2.png',
        '/ai-learning-assistant/Screenshot3.png',
        '/ai-learning-assistant/Screenshot4.png',
        '/ai-learning-assistant/Screenshot5.png',
        '/ai-learning-assistant/Screenshot6.png',
        '/ai-learning-assistant/Screenshot7.png',
        '/ai-learning-assistant/Screenshot8.png',
        '/ai-learning-assistant/Screenshot9.png',
        '/ai-learning-assistant/Screenshot10.png',
        '/ai-learning-assistant/Screenshot11.png',
        '/ai-learning-assistant/Screenshot12.png',
        '/ai-learning-assistant/Screenshot13.png',
        '/ai-learning-assistant/Screenshot14.png',
        '/ai-learning-assistant/Screenshot15.png',
        '/ai-learning-assistant/Screenshot16.png',
        '/ai-learning-assistant/Screenshot17.png',
        '/ai-learning-assistant/Screenshot18.png',
        '/ai-learning-assistant/Screenshot19.png',
        '/ai-learning-assistant/Screenshot20.png'
      ]
    },
    {
      id: '4',
      title: 'AI-Powered Personal Finance Tracker',
      description: 'Intelligent finance management system with AI-powered insights and expense tracking.',
      longDescription: 'A comprehensive personal finance management application that leverages Google Gemini AI to provide intelligent financial insights, automated expense categorization, and personalized budgeting recommendations. Features include real-time expense tracking, financial goal setting, AI-powered spending analysis, and interactive financial dashboards.',
      tags: ['ReactJS', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI'],
      category: 'Finance',
      period: 'Personal Project 2025',
      status: 'completed',
      impact: 'Streamlined personal finance management with AI insights',
      client: 'Personal Project',
      metrics: {
        users: '100+',
        performance: '+50%',
        satisfaction: '95%'
      },
      image: '/finance-tracker/finance-tracker.png',
      images: [
        '/finance-tracker/finance-tracker.png'
      ],
      liveUrl: 'https://financeai-v1.vercel.app/',
      githubUrl: '#'
    },
    {
      id: '5',
      title: 'Rental Marketplace (Airbnb-style)',
      description: 'Full-featured rental marketplace with host payouts, security deposits, and calendar-based availability.',
      longDescription: 'A comprehensive rental marketplace platform similar to Airbnb featuring host payouts after guest checkout, security deposit holds, dispute/refund management, and calendar-based availability system. Includes advanced booking management, real-time messaging, and integrated payment processing.',
      tags: ['Next.js', 'NestJS', 'Stripe Connect', 'PostgreSQL', 'Redis'],
      category: 'Marketplace',
      period: 'Planning Phase 2025',
      status: 'planning',
      impact: 'Targeting rental market automation',
      metrics: {
        users: 'TBD',
        performance: 'TBD',
        satisfaction: 'TBD'
      }
    },
    {
      id: '6',
      title: 'Emergency Roadside Assistance Platform',
      description: 'Real-time roadside assistance platform connecting drivers with nearby mechanics and service providers.',
      longDescription: 'Emergency roadside assistance platform with real-time location tracking, ETA calculations, route visualization, and mechanic payouts. Features live updates via WebSocket, Google Maps integration for distance calculations and directions, and comprehensive payment processing through Stripe.',
      tags: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Socket.io', 'Google Maps API', 'Stripe API'],
      category: 'Emergency Services',
      period: 'Planning Phase 2025',
      status: 'planning',
      impact: 'Targeting emergency response efficiency',
      metrics: {
        users: 'TBD',
        performance: 'TBD',
        satisfaction: 'TBD'
      }
    },
    {
      id: '7',
      title: 'HOA Management Platform',
      description: 'Comprehensive HOA management system for homeowners and administrators with payment tracking and community features.',
      longDescription: 'A web application for homeowners to view announcements, pay dues, file maintenance requests, and see property maps. Administrators can manage residents, payments, and updates through a comprehensive dashboard. Features interactive community mapping, payment tracking via Stripe & PayMongo, maintenance request system, and event management.',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Prisma ORM', 'PostgreSQL', 'NextAuth.js', 'Stripe API', 'PayMongo API', 'Leaflet.js'],
      category: 'Property Management',
      period: 'Planning Phase 2025',
      status: 'planning',
      impact: 'Targeting HOA management efficiency',
      metrics: {
        users: 'TBD',
        performance: 'TBD',
        satisfaction: 'TBD'
      }
    },
    {
      id: '8',
      title: 'Sales & Client CRM',
      description: 'Intuitive CRM system for managing clients, leads, deals, and activities with pipeline visualization.',
      longDescription: 'Comprehensive CRM solution for managing clients, leads, deals, and activities through an intuitive dashboard. Includes pipeline visualization, automated reminders, detailed notes system, email logging, and advanced analytics. Built with modern technologies for optimal performance and user experience.',
      tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'PostgreSQL', 'Supabase', 'Prisma', 'NextAuth.js', 'React Query', 'Recharts'],
      category: 'CRM',
      period: 'Planning Phase 2025',
      status: 'planning',
      impact: 'Targeting sales process optimization',
      metrics: {
        users: 'TBD',
        performance: 'TBD',
        satisfaction: 'TBD'
      }
    }
  ];

  const categories = ['all', 'Healthcare', 'E-commerce', 'Education', 'Finance', 'Marketplace', 'Emergency Services', 'Property Management', 'CRM'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.period).getTime() - new Date(a.period).getTime();
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const handleViewDetails = (project: ProjectProps) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleViewGallery = (project: ProjectProps) => {
    setSelectedProject(project);
    setIsGalleryOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollAnimation>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
            My Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work spanning e-commerce platforms, AI-powered applications, 
            marketplace solutions, CRM systems, and innovative web solutions that drive business growth.
          </p>
        </div>
      </ScrollAnimation>


      {/* Filters and Search */}
      <ScrollAnimation delay={300}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-white/10 focus:border-blue-500/50"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-background/50 border border-white/10 text-foreground text-sm focus:border-blue-500/50"
            >
              <option value="recent">Recent</option>
              <option value="featured">Featured</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </ScrollAnimation>

      {/* Projects Grid */}
      <ScrollAnimation delay={400}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedProjects.map((project, index) => (
            <div key={project.id} className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 150}ms` }}>
              <ProjectCard project={project} onViewDetails={handleViewDetails} onViewGallery={handleViewGallery} />
            </div>
          ))}
        </div>
      </ScrollAnimation>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <ScrollAnimation delay={500}>
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        </ScrollAnimation>
      )}

      {/* Project Details Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Gallery Modal */}
      <GalleryModal 
        project={selectedProject}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
