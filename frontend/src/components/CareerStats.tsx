import React from 'react';
import { Card } from './ui/card';
import { Briefcase, Code, Users, Award } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card className="group p-8 rounded-3xl shadow-lg border border-white/10 hover:scale-[1.05] transition-all duration-300 bg-gradient-to-br from-background/60 to-muted/30 backdrop-blur-xl hover:shadow-2xl hover:border-white/20">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
          <div className="w-6 h-6 text-blue-500 group-hover:text-purple-500 transition-colors duration-300">{icon}</div>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">{value}</p>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
        </div>
      </div>
    </Card>
  );
}

export function CareerStats() {
  const stats = [
    { icon: <Briefcase />, label: 'Experience', value: '3+ Years' },
    { icon: <Code />, label: 'Projects', value: '4+' },
    { icon: <Users />, label: 'Clients', value: '15+' },
    { icon: <Award />, label: 'Certifications', value: '5' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
