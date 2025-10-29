import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

interface ThemeToggleProps {
  variant?: 'default' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export function ThemeToggle({ variant = 'ghost', size = 'default' }: ThemeToggleProps) {
  // Add error handling for the context
  let theme: 'light' | 'dark';
  let toggleTheme: () => void;
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (error) {
    // Fallback if context fails
    console.error('ThemeToggle: useTheme failed:', error);
    theme = 'light';
    toggleTheme = () => {};
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="relative overflow-hidden group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="relative w-5 h-5"
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Sun Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            opacity: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : -90
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Sun className="w-5 h-5 text-yellow-500" />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : 90
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Moon className="w-5 h-5 text-blue-400" />
        </motion.div>
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-primary/10 rounded-full scale-0"
        animate={{ scale: 0 }}
        whileTap={{ scale: 1.5, opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.4 }}
      />
    </Button>
  );
}

export function ThemeToggleDetailed() {
  // Add error handling for the context
  let theme: 'light' | 'dark';
  let toggleTheme: () => void;
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (error) {
    console.error('ThemeToggleDetailed: useTheme failed:', error);
    theme = 'light';
    toggleTheme = () => {};
  }

  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.02 }}
    >
      <motion.button
        onClick={toggleTheme}
        className="relative p-3 rounded-2xl bg-gradient-to-r from-card to-accent/20 border border-border hover:border-primary/30 transition-all duration-300 group overflow-hidden"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            background: theme === 'dark' 
              ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
              : 'linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))'
          }}
        />

        <div className="relative flex items-center space-x-3">
          {/* Icon container */}
          <motion.div
            className="relative w-6 h-6"
            animate={{ rotateY: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Sun Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{
                scale: theme === 'light' ? 1 : 0,
                opacity: theme === 'light' ? 1 : 0,
                rotateY: theme === 'light' ? 0 : -180
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Sun className="w-6 h-6 text-amber-500" />
            </motion.div>

            {/* Moon Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{
                scale: theme === 'dark' ? 1 : 0,
                opacity: theme === 'dark' ? 1 : 0,
                rotateY: theme === 'dark' ? 0 : 180
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Moon className="w-6 h-6 text-blue-400" />
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="text-left">
            <motion.p
              className="text-sm font-medium"
              animate={{ color: theme === 'dark' ? '#e2e8f0' : '#1e293b' }}
            >
              {theme === 'light' ? 'Light' : 'Dark'} Mode
            </motion.p>
            <motion.p
              className="text-xs text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to switch
            </motion.p>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </motion.div>
  );
}