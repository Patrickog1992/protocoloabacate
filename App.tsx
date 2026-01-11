import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ChatPage } from './components/ChatPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'chat'>('landing');

  const handleStartChat = () => {
    setCurrentView('chat');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === 'landing' ? (
        <LandingPage onCtaClick={handleStartChat} />
      ) : (
        <ChatPage />
      )}
    </div>
  );
};

export default App;