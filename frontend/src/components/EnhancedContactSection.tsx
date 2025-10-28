import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollAnimation } from './ScrollAnimation';
import { ConfettiAnimation, triggerSuccessConfetti } from './ConfettiAnimation';
import { SuccessModal } from './SuccessModal';
import { getApiUrl, API_CONFIG } from '../config/api';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar,
  MapPin,
  Github,
  Linkedin,
  Star,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Users,
  Coffee, 
  Globe, 
  Heart,
  Facebook
} from 'lucide-react';

interface ContactMethod {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  responseTime: string;
  preferred: boolean;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactMethod: string;
  urgency: string;
}

function AvailabilityStatus() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Available 9 AM - 10 PM Philippine Time (UTC+8)
      const hour = now.getHours();
      setIsAvailable(hour >= 9 && hour <= 22);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <Card className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isAvailable ? 'bg-green-500/20' : 'bg-orange-500/20'}`}>
            <Clock className={`w-6 h-6 ${isAvailable ? 'text-green-500' : 'text-orange-500'}`} />
          </div>
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            {isAvailable ? 'Available Now' : 'Currently Offline'}
          </h3>
          <p className="text-sm text-muted-foreground">
            Philippine Time: {timeString}
          </p>
          <p className="text-xs text-muted-foreground">
            {isAvailable ? 'Typically responds within 2 hours' : 'Will respond within 24 hours'}
          </p>
        </div>
      </div>
    </Card>
  );
}

function ContactMethodCard({ method, isSelected, onSelect }: { 
  method: ContactMethod; 
  isSelected: boolean; 
  onSelect: () => void;
}) {
  return (
    <Card 
      className={`p-4 rounded-2xl shadow-lg border transition-all duration-300 cursor-pointer hover:scale-105 ${
        isSelected 
          ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl' 
          : 'border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl hover:border-white/20'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500/20' : 'bg-muted/30'}`}>
          <div className={`w-5 h-5 ${isSelected ? 'text-blue-500' : 'text-muted-foreground'}`}>
            {method.icon}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{method.label}</h3>
            {method.preferred && (
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{method.responseTime}</p>
        </div>
      </div>
    </Card>
  );
}

function FormProgress({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i < step ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8' : 'bg-muted/30 w-4'
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-2">
        Step {step} of {totalSteps}
      </span>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's your typical response time?",
      answer: "I usually respond to emails within 2-4 hours during business hours (9 AM - 10 PM PHT). For urgent matters, feel free to call or message me directly."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! I work with clients worldwide and am flexible with different time zones. I'm available for meetings via video call at mutually convenient times."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in React, Node.js, TypeScript, Python, and modern web frameworks. I'm also experienced with databases, cloud platforms, and AI integration."
    },
    {
      question: "How do you handle project pricing?",
      answer: "I offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. I provide detailed quotes after understanding your specific requirements."
    },
    {
      question: "What's your preferred project communication method?",
      answer: "I prefer a combination of email for formal communications and Slack/Discord for day-to-day project discussions. Video calls for important milestones and reviews."
    },
    {
      question: "Are you available for long-term projects?",
      answer: "Yes, I'm open to both short-term projects and long-term partnerships. I believe in building lasting relationships with clients and growing together."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Absolutely! I offer various support packages including bug fixes, feature updates, and maintenance. I believe in long-term partnerships with my clients."
    }
  ];

  return (
    <Card className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
      <h3 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-white/10 last:border-b-0 pb-3 last:pb-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors duration-200"
            >
              <span className="font-medium text-foreground text-sm">{faq.question}</span>
              <div className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                ↓
              </div>
            </button>
            {openIndex === index && (
              <div className="mt-2 p-2 text-sm text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function EnhancedContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'email',
    urgency: 'normal'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedMethod, setSelectedMethod] = useState('email');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail />,
      label: 'Email',
      value: 'marcdelacruzesteban@gmail.com',
      href: 'mailto:marcdelacruzesteban@gmail.com',
      responseTime: 'Within 2-4 hours',
      preferred: true
    },
    {
      icon: <Phone />,
      label: 'Phone',
      value: '+639934528204',
      href: 'tel:+639934528204',
      responseTime: 'Immediate',
      preferred: false
    },
    {
      icon: <Facebook />,
      label: 'Facebook',
      value: 'Marc Esteban',
      href: 'https://www.facebook.com/marcesteban04',
      responseTime: 'Within 1-2 hours',
      preferred: false
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      href: 'https://github.com/MarcEsteban04',
      username: '@MarcEsteban04',
      color: 'hover:text-gray-400'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/marc-esteban/',
      username: 'Marc Esteban',
      color: 'hover:text-blue-500'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      href: 'mailto:marcdelacruzesteban@gmail.com',
      username: 'Send Email',
      color: 'hover:text-green-500'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.SEND_EMAIL), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          urgency: formData.urgency,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Trigger confetti animation
        setShowConfetti(true);
        triggerSuccessConfetti();
        
        // Show success modal after a brief delay to let confetti start
        setTimeout(() => {
          setShowSuccessModal(true);
        }, 500);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            contactMethod: 'email',
            urgency: 'normal'
          });
          setCurrentStep(1);
          setSubmitStatus('idle');
          setShowConfetti(false);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <ScrollAnimation>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
            Let's Work Together
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? I'm available for freelance projects, 
            full-time opportunities, and exciting collaborations. Let's create something amazing together.
          </p>
        </div>
      </ScrollAnimation>

      {/* Availability Status */}
      <ScrollAnimation delay={200}>
        <AvailabilityStatus />
      </ScrollAnimation>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Contact Information Column */}
        <div className="space-y-8">
          {/* Quick Contact Card */}
          <ScrollAnimation delay={300}>
            <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Start Your Project?</h2>
                  <p className="text-muted-foreground mb-6">
                    Let's discuss how I can help bring your ideas to life. I'm always excited about new challenges and collaborations.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="mailto:marcdelacruzesteban@gmail.com?subject=Project Inquiry&body=Hi Marc, I'd like to discuss a project with you."
                    className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email
                  </a>
                  <a
                    href="tel:+639934528204"
                    className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </div>
              </div>
            </Card>
          </ScrollAnimation>

          {/* What I Can Help With */}
          <ScrollAnimation delay={400}>
            <Card className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                What I Can Help With
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <Globe className="w-5 h-5" />, title: "Web Development", desc: "Full-stack applications" },
                  { icon: <Users className="w-5 h-5" />, title: "UI/UX Design", desc: "User-centered design" },
                  { icon: <MessageSquare className="w-5 h-5" />, title: "Consulting", desc: "Technical guidance" },
                  { icon: <Heart className="w-5 h-5" />, title: "Maintenance", desc: "Ongoing support" }
                ].map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-500">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{service.title}</h4>
                      <p className="text-xs text-muted-foreground">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollAnimation>

          {/* FAQ */}
          <ScrollAnimation delay={500}>
            <FAQ />
          </ScrollAnimation>
        </div>

        {/* Contact Info & Additional Sections */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <ScrollAnimation delay={400}>
            <Card className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-3">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-500 group-hover:text-purple-500 transition-colors duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{method.label}</p>
                        {method.preferred && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.value}</p>
                      <p className="text-xs text-muted-foreground">{method.responseTime}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </ScrollAnimation>

          {/* Social Links */}
          <ScrollAnimation delay={500}>
            <Card className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-foreground mb-4">Connect With Me</h2>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group ${social.color}`}
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-muted-foreground group-hover:scale-110 transition-all duration-300">
                      {social.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{social.label}</p>
                      <p className="text-sm text-muted-foreground">{social.username}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </ScrollAnimation>

          {/* Working Hours & Availability */}
          <ScrollAnimation delay={600}>
            <Card className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-500" />
                Working Hours
              </h2>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 10:00 PM", timezone: "PHT" },
                  { day: "Saturday", hours: "10:00 AM - 6:00 PM", timezone: "PHT" },
                  { day: "Sunday", hours: "Available for urgent projects", timezone: "" }
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10">
                    <span className="font-medium text-foreground text-sm">{schedule.day}</span>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                      {schedule.timezone && <span className="text-xs text-muted-foreground ml-1">({schedule.timezone})</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-blue-500">Note:</strong> I'm flexible with time zones for international clients. Let's find a time that works for both of us!
                </p>
              </div>
            </Card>
          </ScrollAnimation>

          {/* Location & Fun Facts */}
          <ScrollAnimation delay={700}>
            <Card className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="font-semibold text-foreground">Based in Philippines</h3>
                  <p className="text-sm text-muted-foreground">Sta. Maria, Bulacan</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Coffee className="w-4 h-4 text-amber-500" />
                  <span>Fueled by coffee and passion for great code</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Always excited about new challenges and collaborations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Open to remote work and international projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>3+ years of experience helping clients succeed</span>
                </div>
              </div>
            </Card>
          </ScrollAnimation>

          {/* Response Time Guarantee */}
          <ScrollAnimation delay={800}>
            <Card className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                My Commitment to You
              </h3>
              <div className="space-y-3">
                {[
                  { icon: <Clock className="w-4 h-4 text-blue-500" />, text: "Response within 2-4 hours during business hours" },
                  { icon: <Star className="w-4 h-4 text-yellow-500" />, text: "Quality work that exceeds expectations" },
                  { icon: <Heart className="w-4 h-4 text-red-500" />, text: "Transparent communication throughout the project" },
                  { icon: <CheckCircle className="w-4 h-4 text-green-500" />, text: "On-time delivery and ongoing support" }
                ].map((commitment, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-gradient-to-br from-background/40 to-muted/20">
                      {commitment.icon}
                    </div>
                    <span className="text-sm text-muted-foreground">{commitment.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
      
      {/* Confetti Animation */}
      <ConfettiAnimation 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        senderName={formData.name}
      />
    </div>
  );
}
