import React from 'react';
import { Card } from './ui/card';
import { ScrollAnimation } from './ScrollAnimation';
import { Code, Database, Globe, Palette, Server, Zap } from 'lucide-react';

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

function SkillCategory({ title, icon, skills, color }: SkillCategoryProps) {
  return (
    <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} border border-white/10`}>
          <div className="w-6 h-6 text-white">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="p-3 rounded-xl bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <span className="text-sm font-medium text-foreground group-hover:text-blue-500 transition-colors duration-300">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface SkillBarProps {
  skill: string;
  level: number;
  color: string;
}

function SkillBar({ skill, level, color }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Globe />,
      color: 'from-blue-500 to-blue-600',
      skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Astro', 'Shadcn', 'ReUI'],
    },
    {
      title: 'Backend Development',
      icon: <Server />,
      color: 'from-green-500 to-green-600',
      skills: ['Node.js', 'Express.js', 'PHP', 'RESTful APIs'],
    },
    {
      title: 'Database Management',
      icon: <Database />,
      color: 'from-purple-500 to-purple-600',
      skills: ['MySQL', 'MongoDB'],
    },
    {
      title: 'Development Tools',
      icon: <Code />,
      color: 'from-orange-500 to-orange-600',
      skills: ['Git', 'Material UI'],
    },
  ];

  const proficiencyLevels = [
    { skill: 'HTML', level: 95, color: 'from-orange-400 to-orange-500' },
    { skill: 'CSS', level: 90, color: 'from-blue-400 to-blue-500' },
    { skill: 'JavaScript', level: 85, color: 'from-yellow-400 to-yellow-500' },
    { skill: 'React.js', level: 80, color: 'from-cyan-400 to-cyan-500' },
    { skill: 'PHP', level: 85, color: 'from-purple-400 to-purple-500' },
    { skill: 'MySQL', level: 80, color: 'from-blue-600 to-blue-700' },
    { skill: 'Node.js', level: 75, color: 'from-green-400 to-green-500' },
    { skill: 'Tailwind CSS', level: 90, color: 'from-teal-400 to-teal-500' },
  ];

  return (
    <div className="space-y-10">
      {/* Skills Header */}
      <ScrollAnimation>
        <Card className="relative overflow-hidden bg-gradient-to-br from-background/60 via-muted/20 to-background/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
              Technical Skills & Expertise
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A comprehensive overview of my technical skills, tools, and technologies I've mastered 
              throughout my <span className="text-foreground font-semibold">3+ years</span> of development experience.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">Frontend Specialist</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Full-Stack Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm text-muted-foreground">AI Integration</span>
              </div>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        </Card>
      </ScrollAnimation>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <ScrollAnimation key={index} delay={index * 100}>
            <SkillCategory {...category} />
          </ScrollAnimation>
        ))}
      </div>

      {/* Proficiency Levels */}
      <ScrollAnimation delay={600}>
        <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Proficiency Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proficiencyLevels.map((item, index) => (
              <SkillBar key={index} {...item} />
            ))}
          </div>
        </Card>
      </ScrollAnimation>

      {/* Certifications & Learning */}
      <ScrollAnimation delay={800}>
        <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Certifications & Achievements</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold text-foreground">Recognition for Technical Mastery</h3>
              <p className="text-muted-foreground">ACLC College of Sta. Maria</p>
              <p className="text-sm text-blue-500 font-medium">Server-side programming and integration</p>
            </div>
          </div>
        </Card>
      </ScrollAnimation>
    </div>
  );
}
