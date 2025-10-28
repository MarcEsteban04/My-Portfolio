import React from 'react';
import { Card } from './ui/card';
import { ScrollAnimation } from './ScrollAnimation';
import { MapPin, Calendar, Award, Briefcase } from 'lucide-react';

export function AboutSection() {
  const experiences = [
    {
      title: 'IT Support Intern',
      company: 'Municipality of Sta. Maria, Bulacan',
      period: 'Aug 2024 – Dec 2024',
      description: 'Provided technical assistance, troubleshooting, and OS installations. Boosted system uptime by 25%, improving operational efficiency across departments.',
    },
    {
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: 'Feb 2023 – Present',
      description: 'Delivered 4+ custom projects, including e-commerce platforms and inventory systems. Focused on tailored client solutions, responsive UI/UX, and efficient backend implementation.',
    },
    {
      title: 'Full-Stack Developer',
      company: 'M5B Hardware',
      period: 'Sept 2023 – Oct 2023',
      description: 'Built a comprehensive inventory management system with integrated POS features using HTML, PHP, CSS, JavaScript, and MySQL. Enhanced inventory tracking and sales processing.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* About Header */}
      <ScrollAnimation>
        <Card className="relative overflow-hidden bg-gradient-to-br from-background/60 via-muted/20 to-background/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
              About Marc Esteban
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Full-Stack Web Developer with <span className="text-foreground font-semibold">3+ years</span> of experience 
              delivering scalable, user-focused applications and business solutions. Skilled in PHP, MySQL, JavaScript, 
              Tailwind CSS, and the MERN stack, with proven success integrating AI-powered features to improve efficiency by 25%.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-xs text-muted-foreground">Sta. Maria, Bulacan</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Experience</p>
                  <p className="text-xs text-muted-foreground">3+ Years</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Education</p>
                  <p className="text-xs text-muted-foreground">BS Computer Science</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Projects</p>
                  <p className="text-xs text-muted-foreground">4+ Completed</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        </Card>
      </ScrollAnimation>

      {/* Education */}
      <ScrollAnimation delay={200}>
        <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Education</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold text-foreground">Bachelor of Science in Computer Science</h3>
              <p className="text-muted-foreground font-medium">ACLC College of Sta. Maria</p>
              <p className="text-sm text-muted-foreground">2021 - 2025</p>
              <p className="text-sm text-blue-500 font-medium mt-2">Award: Recognition for technical mastery in server-side programming and integration</p>
            </div>
          </div>
        </Card>
      </ScrollAnimation>

      {/* Experience */}
      <ScrollAnimation delay={400}>
        <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Professional Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-blue-500 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </ScrollAnimation>
    </div>
  );
}
