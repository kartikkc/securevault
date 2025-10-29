import { motion } from 'motion/react';
import { Shield, Lock, Zap, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useScrollAnimation, useParallaxEffect } from '../hooks/useScrollAnimation';
import { ThemeToggle } from './ThemeToggle';

interface LandingPageProps {
  onNavigate: (view: 'login' | 'signup') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const heroParallax = useParallaxEffect(0.3);
  const { isVisible: featuresVisible, ref: featuresRef } = useScrollAnimation();
  const { isVisible: pricingVisible, ref: pricingRef } = useScrollAnimation();

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">SecureVault</span>
          </motion.div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={() => onNavigate('login')}
              className="hover:bg-accent"
            >
              Login
            </Button>
            <Button
              onClick={() => onNavigate('signup')}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5"
          style={{ transform: `translateY(${heroParallax}px)` }}
        />
        
        {/* Floating 3D Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-sm"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`
              }}
            />
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto text-center px-6 z-10">
          <motion.h1
            className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Secure Your
            <motion.span
              className="block text-primary"
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Digital Life
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            The most advanced password manager with military-grade encryption,
            seamless sync, and intelligent security monitoring.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button
              size="lg"
              onClick={() => onNavigate('signup')}
              className="group bg-primary hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-2"
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef as any} className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl mb-6">
              Built for{' '}
              <span className="text-primary">Security</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced features that protect your passwords and personal data with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Military-Grade Encryption',
                description: 'AES-256 encryption ensures your passwords are protected with the highest security standards',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Instant password generation and autofill across all your devices and platforms',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Globe,
                title: 'Universal Sync',
                description: 'Seamless synchronization across all devices with real-time updates and offline access',
                color: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                animate={featuresVisible ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0 
                } : { 
                  opacity: 0, 
                  y: 50, 
                  rotateY: -10 
                }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  y: -10, 
                  rotateX: 5,
                  scale: 1.02
                }}
              >
                <Card className="p-8 h-full bg-gradient-to-br from-card via-card to-accent/20 border-2 hover:border-primary/20 transition-all duration-300">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </motion.div>
                  <h3 className="text-2xl mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef as any} className="py-32 px-6 bg-gradient-to-br from-accent/30 via-background to-secondary/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={pricingVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl mb-6">
              Choose Your{' '}
              <span className="text-primary">Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Flexible pricing for individuals, families, and businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Personal',
                price: 'Free',
                description: 'Perfect for getting started',
                features: ['Up to 50 passwords', 'Basic encryption', 'Mobile app access', 'Email support']
              },
              {
                name: 'Premium',
                price: '$4.99/mo',
                description: 'For power users',
                features: ['Unlimited passwords', 'Advanced encryption', 'Multi-device sync', 'Priority support', '2FA authentication'],
                popular: true
              },
              {
                name: 'Family',
                price: '$9.99/mo',
                description: 'For families and teams',
                features: ['Everything in Premium', 'Up to 6 accounts', 'Family sharing', 'Admin controls', '24/7 support']
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={pricingVisible ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                } : { 
                  opacity: 0, 
                  y: 50, 
                  scale: 0.9 
                }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02
                }}
              >
                <Card className={`p-8 h-full relative ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-2xl shadow-primary/20' 
                    : 'border border-border'
                } bg-card`}>
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, type: "spring" }}
                    >
                      <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </motion.div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl mb-2">{plan.name}</h3>
                    <div className="text-4xl mb-2">{plan.price}</div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-secondary hover:bg-secondary/90'
                    }`}
                    onClick={() => onNavigate('signup')}
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-accent/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">SecureVault</span>
          </motion.div>
          <p className="text-muted-foreground">
            © 2025 SecureVault. All rights reserved. Built with security in mind.
          </p>
        </div>
      </footer>
    </div>
  );
}