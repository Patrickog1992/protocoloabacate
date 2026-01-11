import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onCtaClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onCtaClick }) => {
  const [showButton, setShowButton] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [notification, setNotification] = useState<{name: string, city: string} | null>(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const buyers = [
    { name: 'Maria Silva', city: 'São Paulo' },
    { name: 'João Santos', city: 'Rio de Janeiro' },
    { name: 'Ana Costa', city: 'Belo Horizonte' },
    { name: 'Pedro Oliveira', city: 'Curitiba' },
    { name: 'Lúcia Ferreira', city: 'Porto Alegre' },
    { name: 'Carlos Souza', city: 'Salvador' },
    { name: 'Fernanda Lima', city: 'Recife' },
    { name: 'Antônio Rodrigues', city: 'Fortaleza' },
    { name: 'Patricia Gomes', city: 'Brasília' },
    { name: 'Roberto Alves', city: 'Goiânia' },
    { name: 'Sandra M.', city: 'Campinas' },
    { name: 'Ricardo B.', city: 'Manaus' }
  ];

  useEffect(() => {
    // Set current date in PT-BR format
    setCurrentDate(new Date().toLocaleDateString('pt-BR'));

    // Timer for 3 minutes (180000ms)
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 180000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const showNotification = () => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      setNotification(randomBuyer);
      setIsNotificationVisible(true);

      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 4000); // Show for 4 seconds
    };

    // First show after 2 seconds
    const initialTimer = setTimeout(() => {
      showNotification();
    }, 2000);

    // Then interval every 12 seconds
    const interval = setInterval(() => {
      showNotification();
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const scriptId = 'converteai-sdk';
    // Prevent duplicate script injection
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
      script.async = true;
      script.id = scriptId;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans relative">
      {/* Social Proof Notification */}
      <div 
        className={`fixed top-1 right-1 z-50 bg-white/95 backdrop-blur-sm rounded shadow-md border border-gray-100 p-1.5 flex items-center gap-1.5 transform transition-all duration-700 max-w-[160px] ${
          isNotificationVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-green-100 p-0.5 rounded-full shrink-0">
          <CheckCircle2 size={12} className="text-green-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-800 leading-none mb-0.5">
            {notification?.name}
          </span>
          <span className="text-[8px] text-gray-600 leading-tight">
            de {notification?.city} recebeu o <span className="font-black text-green-700 tracking-wide">PROTOCOLO</span>
          </span>
        </div>
      </div>

      {/* Red Warning Banner */}
      <div className="w-full bg-red-600 text-white text-center py-3 px-4 font-bold text-sm md:text-base shadow-md z-10">
        ATENÇÃO: Devido a alta demanda essa página ira sair do ar no dia <span className="text-yellow-300">{currentDate}</span>
      </div>

      <div className="flex flex-col items-center justify-start flex-1 text-gray-900 px-4 py-8 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-red-600 leading-tight">
          ESSE TRUQUE DO ABACATE ESTÁ MELHORANDO A DIABETES TIPO 2 DA POPULAÇÃO
        </h1>
        
        <p className="text-lg text-center mb-6 font-medium text-gray-700">
          E o melhor de tudo totalmente natural sem química
        </p>

        <div className="w-full mb-4">
          <div id="ifr_6963b277a0bc9c70579d8187_wrapper" style={{ margin: '0 auto', width: '100%', maxWidth: '400px' }}>
            <div style={{ position: 'relative', padding: '133.33333333333331% 0 0 0' }} id="ifr_6963b277a0bc9c70579d8187_aspect">
              <iframe
                frameBorder="0"
                allowFullScreen
                src="https://scripts.converteai.net/fd7cffcf-a128-4cf6-8573-7102145d7c17/players/6963b277a0bc9c70579d8187/v4/embed.html"
                id="ifr_6963b277a0bc9c70579d8187"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                referrerPolicy="origin"
              ></iframe>
            </div>
          </div>
        </div>

        {showButton && (
          <div className="w-full px-4 mt-6 flex justify-center md:px-0">
            <button
              onClick={onCtaClick}
              className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full shadow-lg text-xl uppercase tracking-wider animate-pulse transition duration-300 transform hover:scale-105"
            >
              QUERO MINHA CONSULTA GRATUITA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};