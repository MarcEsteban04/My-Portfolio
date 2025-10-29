import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { HeroSection } from './HeroSection';
import { SkillSet } from './SkillSet';
import { Expertise } from './Expertise';
import { ContactSection } from './ContactSection';
import { ScrollAnimation } from './ScrollAnimation';
import { EnhancedProjectsSection } from './EnhancedProjectsSection';
import { EnhancedAboutSection } from './EnhancedAboutSection';
import { EnhancedContactSection } from './EnhancedContactSection';
import { EnhancedSkillsSection } from './EnhancedSkillsSection';
import { EnhancedGitHubSection } from './EnhancedGitHubSection';
import { TechStackModal } from './TechStackModal';
import { useNavigation } from './NavigationProvider';
import { useSidebar } from './SidebarProvider';

export function DashboardLayout() {
  const { currentSection } = useNavigation();
  const { isCollapsed } = useSidebar();
  const [isTechStackModalOpen, setIsTechStackModalOpen] = useState(false);

  const sidebarMargin = isCollapsed ? "lg:ml-[100px]" : "lg:ml-[320px]";

  const renderContent = () => {
    switch (currentSection) {
      case 'projects':
        return (
          <div className={`${sidebarMargin} pt-16 lg:pt-0 min-h-screen transition-all duration-300`}>
            <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 md:py-6 lg:py-10 relative z-10">
              <div className="pt-6">
                <EnhancedProjectsSection />
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className={`${sidebarMargin} pt-16 lg:pt-0 min-h-screen transition-all duration-300`}>
            <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 md:py-6 lg:py-10 relative z-10">
              <div className="pt-6">
                <EnhancedSkillsSection />
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className={`${sidebarMargin} pt-16 lg:pt-0 min-h-screen transition-all duration-300`}>
            <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 md:py-6 lg:py-10 relative z-10">
              <div className="pt-6">
                <EnhancedContactSection />
              </div>
            </div>
          </div>
        );
      case 'github':
        return (
          <div className={`${sidebarMargin} pt-16 lg:pt-0 min-h-screen transition-all duration-300`}>
            <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 md:py-6 lg:py-10 relative z-10">
              <div className="pt-6">
                <EnhancedGitHubSection />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`${sidebarMargin} pt-16 lg:pt-0 min-h-screen transition-all duration-300`}>
            <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 md:gap-8 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 md:py-6 lg:py-10 relative z-10">
            {/* Main Content */}
            <main className="space-y-10 pt-6">
              {/* Hero Section */}
              <ScrollAnimation>
                <HeroSection />
              </ScrollAnimation>


              {/* About Information */}
              <ScrollAnimation delay={400}>
                <EnhancedAboutSection />
              </ScrollAnimation>
            </main>

            {/* Right Sidebar */}
            <aside className="space-y-8 pt-6 w-full">
              {/* Skill Set */}
              <ScrollAnimation delay={600}>
                <SkillSet />
              </ScrollAnimation>

              {/* Expertise */}
              <ScrollAnimation delay={800}>
                <Expertise />
              </ScrollAnimation>

              {/* Contact Section */}
              <ScrollAnimation delay={1000}>
                <ContactSection />
              </ScrollAnimation>
            </aside>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/5 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block relative z-10">
        <Sidebar onOpenTechStackModal={() => setIsTechStackModalOpen(true)} />
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Dynamic Content */}
      {renderContent()}

      {/* Tech Stack Modal */}
      <TechStackModal 
        isOpen={isTechStackModalOpen} 
        onClose={() => setIsTechStackModalOpen(false)} 
      />
    </div>
  );
}
