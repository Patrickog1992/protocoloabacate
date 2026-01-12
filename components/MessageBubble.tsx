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

  // Robust Autoplay Logic for Mobile (Aggressive Mode)
  useEffect(() => {
    if (message.type === 'audio' && audioRef.current) {
      const audio = audioRef.current;
      
      const attemptPlay = () => {
        // We catch errors because mobile browsers throw exceptions if autoplay is blocked
        // by policy or if the media isn't ready. We just want to keep trying.
        audio.play().catch(() => {
          // console.log("Autoplay attempt failed, retrying...");
        });
      };

      // 1. Attempt immediately on mount
      attemptPlay();

      // 2. Set up an interval to keep trying every 250ms (Faster retry)
      // This handles cases where the network is slow or the browser needs a moment
      const intervalId = setInterval(() => {
        if (audio.paused) {
          attemptPlay();
        } else {
          // If it's playing, we can stop hammering the play button
          clearInterval(intervalId);
        }
      }, 250);

      // 3. Safety timeout: Stop trying after 8 seconds to save resources/battery
      // if the user really doesn't want to play it or policy is strictly blocking.
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 8000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
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
                // playsInline removed as it's not standard for audio and might cause issues
                className="w-full"
                onEnded={onAudioEnded}
                onLoadedMetadata={() => {
                   // Trigger when metadata loads
                   audioRef.current?.play().catch(() => {});
                }}
                onCanPlay={() => {
                   // Extra trigger when enough data is loaded
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