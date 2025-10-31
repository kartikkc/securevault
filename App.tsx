import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { Dashboard } from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/globals.css';
import { Toaster } from './components/ui/sonner';
import { getPasswords } from './lib/api';

type View = 'landing' | 'login' | 'signup' | 'dashboard';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [user, setUser] = useState<{ email: string } | null>(null);

  const handleLogin = (email: string) => {
    setUser({ email });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {currentView === 'landing' && (
        <ErrorBoundary>
          <LandingPage onNavigate={navigateTo} />
        </ErrorBoundary>
      )}
      {currentView === 'login' && (
        <ErrorBoundary>
          <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />
        </ErrorBoundary>
      )}
      {currentView === 'signup' && (
        <ErrorBoundary>
          <SignupPage onSignup={handleLogin} onNavigate={navigateTo} />
        </ErrorBoundary>
      )}
      {currentView === 'dashboard' && user && (
        <ErrorBoundary>
          <Dashboard user={user} onLogout={handleLogout} />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Application Error</h1>
          <p className="text-gray-600 mb-4">Something went wrong. Please refresh the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Refresh Page
          </button>
        </div>
      </div>
    }>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}