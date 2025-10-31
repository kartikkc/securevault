import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft, Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ThemeToggle } from './ThemeToggle';
import { signup } from '@/lib/api';
import { Toaster, toast } from 'sonner';

interface SignupPageProps {
  onSignup: (email: string) => void;
  onNavigate: (view: 'landing' | 'login') => void;
}

export function SignupPage({ onSignup, onNavigate }: SignupPageProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [masterString, setMasterString] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showMasterString, setShowMasterString] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const result = await signup({ username, email, password, masterString });
      const token = result?.token;
      if (token) {
        sessionStorage.setItem('auth_token', token);
        toast.success('Account Created');
      }
      onSignup(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const masterStringStrength = () => {
    let strength = 0;
    if (masterString.length >= 8) strength++;
    if (/[A-Z]/.test(masterString)) strength++;
    if (/[0-9]/.test(masterString)) strength++;
    if (/[^A-Za-z0-9]/.test(masterString)) strength++;
    return strength;
  }

  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-background via-accent/20 to-secondary/20 overflow-hidden">
      <Toaster richColors />
      {/* Floating background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 blur-sm"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 270, 360]
            }}
            transition={{
              duration: 8 + i * 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${5 + i * 10}%`,
              top: `${15 + i * 7}%`
            }}
          />
        ))}
      </motion.div>

      {/* Back button and theme toggle */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="group hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>

      {/* Signup Form */}
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 50, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="p-8 backdrop-blur-sm bg-card/80 border-2 shadow-2xl">
          {/* Logo and Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="flex items-center justify-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="h-10 w-10 text-primary" />
              <span className="text-2xl font-semibold">SecureVault</span>
            </motion.div>
            <h1 className="text-3xl mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Join thousands who trust us with their security
            </p>
          </motion.div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </motion.div> */}

            {/* Username */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Label htmlFor="username"> Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Create username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 bg-input-background border-border focus:border-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {password && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex space-x-1">
                    {[0, 1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-colors ${level < passwordStrength() ? strengthColors[passwordStrength() - 1] : 'bg-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password strength: {strengthLabels[passwordStrength() - 1] || 'Very weak'}
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-12 bg-input-background border-border focus:border-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>
            {/* Master String */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Label htmlFor="masterPassword">Master Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="masterPassword"
                  type={showMasterString ? 'text' : 'password'}
                  placeholder="Create a strong master password"
                  value={masterString}
                  onChange={(e) => setMasterString(e.target.value)}
                  className="pl-10 pr-12 bg-input-background border-border focus:border-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowMasterString(!showMasterString)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showMasterString ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {masterString && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex space-x-1">
                    {[0, 1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-colors ${level < masterStringStrength() ? strengthColors[masterStringStrength() - 1] : 'bg-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Master Password strength: {strengthLabels[masterStringStrength() - 1] || 'Very weak'}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Terms and conditions */}
            <motion.div
              className="flex items-start space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded"
                required
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Create Account
                    <motion.div
                      className="ml-2"
                      whileHover={{ x: 2 }}
                    >
                      →
                    </motion.div>
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Login link */}
          <motion.div
            className="text-center mt-6 pt-6 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </motion.div>
        </Card>

        {/* Security features */}
        <motion.div
          className="mt-6 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          {[
            'End-to-end encryption',
            'Zero-knowledge architecture',
            '30-day money-back guarantee'
          ].map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              {feature}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}