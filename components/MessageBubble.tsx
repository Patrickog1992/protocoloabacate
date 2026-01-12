import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  onAudioEnded?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onAudioEnded }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  const audioRef = useRef<HTMLAudioElement>(null);

  // Format time HH:MM
  const timeString = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Robust Autoplay Logic for Mobile
  useEffect(() => {
    if (message.type === 'audio' && audioRef.current) {
      const audio = audioRef.current;
      
      const attemptPlay = async () => {
        try {
          await audio.play();
        } catch (err) {
          console.warn("Autoplay prevented, retrying in 1s...", err);
          // Retry once for mobile connection lag
          setTimeout(() => {
             audio.play().catch(e => console.error("Retry failed", e));
          }, 1000);
        }
      };

      attemptPlay();
    }
  }, [message.type]);

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-yellow-100 text-yellow-900 text-xs px-3 py-1 rounded shadow-sm text-center max-w-xs">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-[85%] md:max-w-[70%] p-2 rounded-lg shadow-sm ${
          isUser
            ? 'bg-whatsapp-light rounded-tr-none'
            : 'bg-white rounded-tl-none'
        }`}
      >
        {/* Name for Bot in groups usually, but here 1-on-1 we can skip or add nicely */}
        {!isUser && (
          <p className="text-xs font-bold text-orange-500 mb-1">~ DR Lair Ribeiro</p>
        )}

        {/* Content Render */}
        {message.type === 'text' && (
          <p className="text-sm md:text-base whitespace-pre-line text-gray-800 leading-relaxed">
            {message.content}
          </p>
        )}

        {message.type === 'image' && message.mediaUrl && (
          <div className="mb-1">
             <img src={message.mediaUrl} alt="Conteúdo" className="rounded-lg w-full h-auto object-cover" />
             {message.content && <p className="mt-2 text-sm text-gray-800">{message.content}</p>}
          </div>
        )}

        {message.type === 'video' && message.mediaUrl && (
          <div className="mb-1">
            <video 
              controls 
              playsInline 
              {...{ "webkit-playsinline": "true" } as any} /* Force iOS inline */
              poster={message.thumbnailUrl}
              className="rounded-lg w-full h-auto bg-black"
              style={{ width: '100%', maxHeight: '400px' }}
            >
              <source src={message.mediaUrl} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
            {message.content && <p className="mt-2 text-sm text-gray-800">{message.content}</p>}
          </div>
        )}

        {message.type === 'audio' && message.mediaUrl && (
          <div className="min-w-[200px] md:min-w-[250px]">
             <audio 
                ref={audioRef}
                controls
                autoPlay
                preload="auto"
                playsInline
                className="w-full"
                onEnded={onAudioEnded}
                onLoadedData={() => {
                   // Double ensure play starts when data is ready
                   audioRef.current?.play().catch(() => {});
                }}
             >
                <source src={message.mediaUrl} type="audio/mpeg" />
                Seu navegador não suporta áudio.
             </audio>
          </div>
        )}

        {/* Timestamp & Status */}
        <div className="flex justify-end items-center mt-1 space-x-1">
          <span className="text-[10px] text-gray-500">{timeString}</span>
          {isUser && <CheckCheck size={14} className="text-blue-500" />}
        </div>
      </div>
    </div>
  );
};