import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollAnimation } from './ScrollAnimation';
import { ConfettiAnimation, triggerSuccessConfetti } from './ConfettiAnimation';
import { SuccessModal } from './SuccessModal';
import { getApiUrl, API_CONFIG } from '../config/api';
import { Github, Linkedin, Mail, Phone, MapPin, Send, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactFullSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
          urgency: 'normal',
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
          });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'marcdelacruzesteban@gmail.com',
      href: 'mailto:marcdelacruzesteban@gmail.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+639934528204',
      href: 'tel:+639934528204',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'Sta. Maria, Bulacan, Philippines',
      href: '#',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'marcdelacruzesteban@gmail.com',
      href: 'mailto:marcdelacruzesteban@gmail.com',
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      href: 'https://github.com/marcesteban',
      username: '@marcesteban',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/marcesteban',
      username: 'Marc Esteban',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      href: 'mailto:marcdelacruzesteban@gmail.com',
      username: 'Send Email',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Contact Header */}
      <ScrollAnimation>
        <Card className="relative overflow-hidden bg-gradient-to-br from-background/60 via-muted/20 to-background/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
              Let's Work Together
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Ready to bring your ideas to life? I'm available for freelance projects, 
              full-time opportunities, and exciting collaborations.
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-400">Available for new projects</span>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        </Card>
      </ScrollAnimation>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <ScrollAnimation delay={200}>
          <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-background/50 border-white/10 focus:border-blue-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="bg-background/50 border-white/10 focus:border-blue-500/50"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, collaboration, etc."
                  className="bg-background/50 border-white/10 focus:border-blue-500/50"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or how we can work together..."
                  rows={6}
                  className="bg-background/50 border-white/10 focus:border-blue-500/50 resize-none"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>

            {/* Error Messages */}
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 font-medium">Failed to send message</span>
                </div>
                <p className="text-sm text-red-300 mt-1">Please try again or contact me directly.</p>
              </div>
            )}
          </Card>
        </ScrollAnimation>

        {/* Contact Info & Social */}
        <div className="space-y-6">
          {/* Contact Information */}
          <ScrollAnimation delay={400}>
            <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-500 group-hover:text-purple-500 transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{info.label}</p>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </ScrollAnimation>

          {/* Social Links */}
          <ScrollAnimation delay={600}>
            <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Connect With Me</h2>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-500 group-hover:text-purple-500 transition-colors duration-300">
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
