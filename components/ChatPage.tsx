import React, { useState, useEffect, useRef } from 'react';
import { Message, MessageType, UserData, ChatStep } from '../types';
import { MessageBubble } from './MessageBubble';
import { Send, Mic, MoreVertical, Phone, Video } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<ChatStep>(ChatStep.INTRO);
  const [userData, setUserData] = useState<UserData>({ name: '', age: '' });
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Helper to add messages
  const addMessage = (
    sender: 'bot' | 'user' | 'system',
    type: MessageType,
    content?: string,
    mediaUrl?: string
  ) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      type,
      content,
      mediaUrl,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Main Logic Flow
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const runStep = async () => {
      switch (step) {
        case ChatStep.INTRO:
          addMessage('system', 'system', '✅ Parabéns, você foi selecionado (a)');
          await new Promise(r => setTimeout(r, 800));
          addMessage('system', 'system', 'Atenção: Não saia desta página, pois o atendimento será reiniciado e você poderá perder o progresso atual. Fique até o final para realizar a consulta que vai te curar da Diabetes');
          await new Promise(r => setTimeout(r, 1000));
          addMessage('bot', 'text', 'Olá, tudo bem com você?');
          setStep(ChatStep.AUDIO_1);
          break;

        case ChatStep.AUDIO_1:
          await new Promise(r => setTimeout(r, 500));
          addMessage('bot', 'audio', undefined, 'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/ptfaxgt2lebhxffsxzk1cuhl?v=1751824775721');
          // Waiting for audio end via callback
          break;

        case ChatStep.INTRO_REPORT:
          // Triggered by audio 1 ending
          addMessage('bot', 'text', 'Meu nome é Lair Ribeiro.');
          await new Promise(r => setTimeout(r, 1000));
          addMessage('bot', 'text', 'Sou médico nutrólogo, especialista em curar a Diabetes\nInclusive olha a minha reportagem que saiu mês passado 👇🏻👇🏻');
          await new Promise(r => setTimeout(r, 800));
          addMessage('bot', 'image', undefined, 'https://i.imgur.com/EBiOXN3.png');
          await new Promise(r => setTimeout(r, 1200));
          addMessage('bot', 'text', 'Qual é o seu primeiro nome?');
          setStep(ChatStep.WAIT_NAME);
          break;
        
        // Step 4: WAIT_NAME -> handled by handleSend

        case ChatStep.ASK_AGE:
          await new Promise(r => setTimeout(r, 600));
          addMessage('bot', 'text', `E quantos anos você tem, ${userData.name}?`);
          setStep(ChatStep.WAIT_AGE);
          break;

        // Step 6: WAIT_AGE -> handled by handleSend

        case ChatStep.EXPLAIN_AUDIO:
          await new Promise(r => setTimeout(r, 600));
          addMessage('bot', 'text', `${userData.name}, vou te enviar um áudio para te explicar como funciona...`);
          setStep(ChatStep.AUDIO_2);
          break;
        
        case ChatStep.AUDIO_2:
          await new Promise(r => setTimeout(r, 800));
           addMessage('bot', 'audio', undefined, 'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/aq33v3m34vzhx6sdsrcogj7r?v=1751824801497');
           break;
        
        case ChatStep.INDUSTRY_SECRET:
          // Triggered by audio 2 ending
          addMessage('bot', 'text', `${userData.name}, infelizmente a indústria farmacêutica tenta esconder isso de você…`);
          await new Promise(r => setTimeout(r, 1000));
          addMessage('bot', 'image', undefined, 'https://i.imgur.com/qdobNPv.jpeg');
          setStep(ChatStep.AUDIO_3);
          break;

        case ChatStep.AUDIO_3:
           await new Promise(r => setTimeout(r, 1000));
           addMessage('bot', 'audio', undefined, 'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/dn7wpncg4472cr24czlx6i2y?v=1751824840976');
           break;

        case ChatStep.ASK_SYMPTOMS:
           // Triggered by audio 3 ending
           addMessage('bot', 'text', `Para te enviar a melhor\nreceita, me diga ${userData.name}`);
           await new Promise(r => setTimeout(r, 800));
           addMessage('bot', 'text', `Você sofre com\nalgum desses sintomas?\n👉🏼 Cansaço constante\n👉🏼 Sede excessiva\n👉🏼 Visão embaçada\n👉🏼 Formigamento\n👉🏼 Dores no Corpo\n👉🏼 Formigamento\n👉🏼 Infecções recorrentes\n👉🏼 Fome extrema\n👉🏼 Mudanças de humor`);
           setStep(ChatStep.WAIT_SYMPTOMS);
           break;
        
        // WAIT_SYMPTOMS handled by input

        case ChatStep.EXPLAIN_SYMPTOMS:
           await new Promise(r => setTimeout(r, 600));
           addMessage('bot', 'text', `Veja bem, ${userData.name}\n\nCom ${userData.age} anos, esses sintomas podem ter diversas causas...\nAs causas mais comuns são...\n🟡 Idade avançada\n🟡 Histórico familiar\n🟡 Metabolismo lento\n🟡 Alto consumo de açúcar\n🟡 Resistência à insulina\n🟡 Alimentos industrializados\n🟡 Uso de remédios\n🟡 Passar muito tempo sentada ou deitada`);
           await new Promise(r => setTimeout(r, 2000));
           addMessage('bot', 'text', `${userData.name}, eu preciso te contar algo muito importante...`);
           await new Promise(r => setTimeout(r, 800));
           addMessage('bot', 'text', 'Podemos continuar?');
           setStep(ChatStep.WAIT_CONTINUE);
           break;

        // WAIT_CONTINUE handled by Button

        case ChatStep.AUDIOS_SERIES_1:
           // 4 Audios played in sequence
           await new Promise(r => setTimeout(r, 500));
           addMessage('bot', 'audio', undefined, 'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/pcpn92jxby5abyh1clchp9ob?v=1751824871509');
           break;
           // The handler for audio ended will check current step and index to play next
        
        case ChatStep.ASK_TREATMENT:
           addMessage('bot', 'text', `${userData.name}, gostaria de tratar seus sintomas com a medicina alternativa?`);
           setStep(ChatStep.WAIT_TREATMENT);
           break;
        
        case ChatStep.CASES_INTRO:
           addMessage('bot', 'text', `${userData.name}, deixa eu te mostrar alguns casos parecidos com o seu...`);
           await new Promise(r => setTimeout(r, 1000));
           addMessage('bot', 'text', 'A Odete venceu a diabetes e eliminou 21KGs utilizando o protocolo de tratamento personalizado que enviei para ela');
           await new Promise(r => setTimeout(r, 800));
           addMessage('bot', 'image', undefined, 'https://i.imgur.com/HM40CKw.png');
           await new Promise(r => setTimeout(r, 1500));
           addMessage('bot', 'text', 'E a Maria conseguiu eliminar a diabetes tipo 2, deixando para trás as picadas no dedo e o uso de remédios....');
           await new Promise(r => setTimeout(r, 800));
           addMessage('bot', 'video', undefined, 'https://i.imgur.com/dbLffd4.mp4');
           await new Promise(r => setTimeout(r, 3000)); // Wait a bit for video presence
           addMessage('bot', 'text', `${userData.name}, eu tenho certeza que você vai ter resultados incríveis como elas tiveram!`);
           await new Promise(r => setTimeout(r, 800));
           addMessage('bot', 'text', 'Gostaria de ter esses resultados?');
           setStep(ChatStep.WAIT_RESULTS);
           break;
        
        case ChatStep.EXPLAIN_PROTOCOL:
            addMessage('bot', 'text', 'Sabe o que todas elas tem em comum?');
            await new Promise(r => setTimeout(r, 1000));
            addMessage('bot', 'text', 'Todas elas aplicaram um Protocolo criado por mim...\nEu chamo ele de "Protocolo Truque do Abacate"');
            setStep(ChatStep.PROTOCOL_AUDIOS);
            break;

        case ChatStep.PROTOCOL_AUDIOS:
            await new Promise(r => setTimeout(r, 500));
            addMessage('bot', 'audio', undefined, 'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/q4shxwce524it3h56imslygg?v=1751824968006');
            break;

        case ChatStep.PROTOCOL_BENEFITS:
            addMessage('bot', 'text', 'Veja os principais benefícios do Protocolo Truque do Abacate…\n✅ Cura total da diabetes\n✅ Controla os níveis de açúcar no sangue\n✅ Elimina as dores e formigamentos\n✅ Aumenta a expectativa de vida\n✅ Fim dos medicamentos\n✅ Melhor qualidade de vida\n✅ Evita infecções na pele\n✅ Melhora a ansiedade\n✅ Ação anti-envelhecimento\n✅ Reduz a gordura do corpo\n✅ Elimina a gordura no fígado');
            setStep(ChatStep.AUDIO_BENEFITS);
            break;

        case ChatStep.AUDIO_BENEFITS:
            await new Promise(r => setTimeout(r, 1000));
            addMessage('bot', 'audio', undefined, 'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/iyi6c8tgole3v2v49bvmo1rl?v=1751825020589');
            break;

        case ChatStep.ASK_WANT_BENEFITS:
             // Triggered by audio end
             addMessage('bot', 'text', `${userData.name}, você gostaria de ter todos os benefícios do Protocolo Truque do Abacate?`);
             setStep(ChatStep.WAIT_WANT_BENEFITS);
             break;

        case ChatStep.CONGRATS_DECISION:
             addMessage('bot', 'text', `${userData.name}, parabéns pela sua decisão!`);
             await new Promise(r => setTimeout(r, 800));
             addMessage('bot', 'text', `Quando a gente chega nos ${userData.age} anos é muito importante cuidar da nossa saúde!`);
             setStep(ChatStep.AUDIOS_SERIES_2);
             break;

        case ChatStep.AUDIOS_SERIES_2:
             await new Promise(r => setTimeout(r, 500));
             addMessage('bot', 'audio', undefined, 'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/mqscwshpsoudmy15bkpepvh6?v=1751825039715');
             break;
        
        case ChatStep.PROPOSAL_INTRO:
             addMessage('bot', 'text', `${userData.name}, eu confio tanto na medicina alternativa que eu tenho uma proposta para te fazer...`);
             setStep(ChatStep.PROPOSAL_AUDIOS);
             break;

        case ChatStep.PROPOSAL_AUDIOS:
             await new Promise(r => setTimeout(r, 500));
             addMessage('bot', 'audio', undefined, 'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/mpev0agw8oek7exxs33smex2?v=1751825172534');
             break;
        
        case ChatStep.FINAL_CTA:
             addMessage('bot', 'text', `${userData.name}, estou ansioso para aplicarmos o protocolo juntos e com Deus nos abençoando 🙏`);
             await new Promise(r => setTimeout(r, 800));
             addMessage('bot', 'text', 'Para garantir a sua vaga,\nclique no botão abaixo.');
             break;
      }
    };

    timeoutId = setTimeout(runStep, 100);
    return () => clearTimeout(timeoutId);
  }, [step]); // removed userData dependancy to avoid loop, we read it inside

  // Handle User Inputs
  const handleSend = () => {
    if (!inputText.trim()) return;

    addMessage('user', 'text', inputText);
    const text = inputText;
    setInputText('');

    if (step === ChatStep.WAIT_NAME) {
      setUserData(prev => ({ ...prev, name: text }));
      setStep(ChatStep.ASK_AGE);
    } else if (step === ChatStep.WAIT_AGE) {
      setUserData(prev => ({ ...prev, age: text }));
      setStep(ChatStep.EXPLAIN_AUDIO);
    } else if (step === ChatStep.WAIT_SYMPTOMS) {
      setStep(ChatStep.EXPLAIN_SYMPTOMS);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // Logic for Audio Chaining (Queueing)
  const audioSeries1 = [
     'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/pcpn92jxby5abyh1clchp9ob?v=1751824871509',
     'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/t16ac9s1nrdadaglgxp7j9q5?v=1751824886097',
     'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/njwd86xh2i04mgzxqt8nfbng?v=1751824901156',
     'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/th4vc77atu7aaec6b8udeplz?v=1751824914445'
  ];

  const audioSeriesProtocol = [
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/q4shxwce524it3h56imslygg?v=1751824968006',
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/h0rk7ha6cmenycta7ic8p2hh?v=1751824991235'
  ];

  const audioSeries2 = [
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/mqscwshpsoudmy15bkpepvh6?v=1751825039715',
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/gnmu92c5znba6qbsonjx9opl?v=1751944072975',
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/qfiqlbj3vaftaguv21x0trda?v=1751825076430',
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/x9vxagvqvkdj81zaaw0q8bzi?v=1751825089119',
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/n15j6a03imakduv5ju6ic0lj?v=1751825106608',
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/qo0yjvgp4iyng1ynl51inaan?v=1751825130464'
  ];

  const audioSeriesProposal = [
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/mpev0agw8oek7exxs33smex2?v=1751825172534',
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/h95u68u04h3xg3ipltcau3nx?v=1751825181725',
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/skw177lo72mivj1k1dsguju9?v=1751825196543',
      'https://storage.saudebemestarmais.com/typebot/public/workspaces/cm22oix9z000116z1ylpznldm/typebots/cmcrz6bff0012t8cjq3lpep98/blocks/gph6yx2pllw43qa4mo4hl5yv?v=1751825207919'
  ];

  const [currentAudioSeriesIndex, setCurrentAudioSeriesIndex] = useState(0);

  const handleAudioEnded = () => {
    // Logic to proceed to next step or next audio in series
    if (step === ChatStep.AUDIO_1) setStep(ChatStep.INTRO_REPORT);
    else if (step === ChatStep.AUDIO_2) setStep(ChatStep.INDUSTRY_SECRET);
    else if (step === ChatStep.AUDIO_3) setStep(ChatStep.ASK_SYMPTOMS);
    else if (step === ChatStep.AUDIOS_SERIES_1) {
        if (currentAudioSeriesIndex < audioSeries1.length - 1) {
            const nextIdx = currentAudioSeriesIndex + 1;
            setCurrentAudioSeriesIndex(nextIdx);
            addMessage('bot', 'audio', undefined, audioSeries1[nextIdx]);
        } else {
            setCurrentAudioSeriesIndex(0);
            setStep(ChatStep.ASK_TREATMENT);
        }
    }
    else if (step === ChatStep.PROTOCOL_AUDIOS) {
        if (currentAudioSeriesIndex < audioSeriesProtocol.length - 1) {
            const nextIdx = currentAudioSeriesIndex + 1;
            setCurrentAudioSeriesIndex(nextIdx);
            addMessage('bot', 'audio', undefined, audioSeriesProtocol[nextIdx]);
        } else {
            setCurrentAudioSeriesIndex(0);
            setStep(ChatStep.PROTOCOL_BENEFITS);
        }
    }
    else if (step === ChatStep.AUDIO_BENEFITS) {
        setStep(ChatStep.ASK_WANT_BENEFITS);
    }
    else if (step === ChatStep.AUDIOS_SERIES_2) {
        if (currentAudioSeriesIndex < audioSeries2.length - 1) {
            const nextIdx = currentAudioSeriesIndex + 1;
            setCurrentAudioSeriesIndex(nextIdx);
            addMessage('bot', 'audio', undefined, audioSeries2[nextIdx]);
        } else {
            setCurrentAudioSeriesIndex(0);
            setStep(ChatStep.PROPOSAL_INTRO);
        }
    }
    else if (step === ChatStep.PROPOSAL_AUDIOS) {
        if (currentAudioSeriesIndex < audioSeriesProposal.length - 1) {
            const nextIdx = currentAudioSeriesIndex + 1;
            setCurrentAudioSeriesIndex(nextIdx);
            addMessage('bot', 'audio', undefined, audioSeriesProposal[nextIdx]);
        } else {
            setCurrentAudioSeriesIndex(0);
            setStep(ChatStep.FINAL_CTA);
        }
    }
  };

  // Button Handlers
  const handleOptionClick = (text: string, nextStep: ChatStep) => {
    addMessage('user', 'text', text);
    setStep(nextStep);
  };

  // Determine Bot Status Text
  const getBotStatusText = (currentStep: ChatStep) => {
    const audioSteps = [
        ChatStep.AUDIO_1,
        ChatStep.AUDIO_2,
        ChatStep.AUDIO_3,
        ChatStep.AUDIOS_SERIES_1,
        ChatStep.PROTOCOL_AUDIOS,
        ChatStep.AUDIO_BENEFITS,
        ChatStep.AUDIOS_SERIES_2,
        ChatStep.PROPOSAL_AUDIOS
    ];

    const waitingSteps = [
        ChatStep.WAIT_NAME,
        ChatStep.WAIT_AGE,
        ChatStep.WAIT_SYMPTOMS,
        ChatStep.WAIT_CONTINUE,
        ChatStep.WAIT_TREATMENT,
        ChatStep.WAIT_RESULTS,
        ChatStep.WAIT_WANT_BENEFITS,
        ChatStep.FINAL_CTA
    ];

    if (waitingSteps.includes(currentStep)) return 'Online agora';
    if (audioSteps.includes(currentStep)) return 'está gravando...';
    return 'está digitando...';
  };

  const statusText = getBotStatusText(step);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-whatsapp-bg font-sans">
      {/* Header */}
      <div className="bg-whatsapp-teal p-3 flex items-center shadow-md z-10">
        <div className="flex items-center space-x-3 text-white w-full">
           {/* Back Arrow (Visual Only) */}
           <div className="cursor-pointer">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
           </div>
          <div className="relative">
            <img 
              src="https://i.imgur.com/9Aijnph.jpeg" 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-whatsapp-green border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg leading-none">DR Lair Ribeiro</h2>
            <p className="text-xs text-green-100 opacity-90 transition-all duration-300">
               {statusText === 'Online agora' ? statusText : statusText}
            </p>
          </div>
          <div className="flex space-x-4">
             <Video size={22} />
             <Phone size={20} />
             <MoreVertical size={20} />
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundRepeat: 'repeat', backgroundSize: '400px' }}>
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            onAudioEnded={handleAudioEnded}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-2 flex items-center space-x-2 shadow-inner">
        {step === ChatStep.WAIT_CONTINUE ? (
             <button onClick={() => handleOptionClick('PODEMOS CONTINUAR DOUTOR', ChatStep.AUDIOS_SERIES_1)} className="w-full bg-whatsapp-green text-white font-bold py-3 rounded-full hover:bg-green-600 transition">
                 PODEMOS CONTINUAR DOUTOR
             </button>
        ) : step === ChatStep.WAIT_TREATMENT ? (
             <button onClick={() => handleOptionClick('EU QUERO TRATAR MEUS SINTOMAS', ChatStep.CASES_INTRO)} className="w-full bg-whatsapp-green text-white font-bold py-3 rounded-full hover:bg-green-600 transition">
                 EU QUERO TRATAR MEUS SINTOMAS
             </button>
        ) : step === ChatStep.WAIT_RESULTS ? (
             <button onClick={() => handleOptionClick('SIM EU QUERO', ChatStep.EXPLAIN_PROTOCOL)} className="w-full bg-whatsapp-green text-white font-bold py-3 rounded-full hover:bg-green-600 transition">
                 SIM EU QUERO
             </button>
        ) : step === ChatStep.WAIT_WANT_BENEFITS ? (
             <button onClick={() => handleOptionClick('SIM EU QUERO', ChatStep.CONGRATS_DECISION)} className="w-full bg-whatsapp-green text-white font-bold py-3 rounded-full hover:bg-green-600 transition">
                 SIM EU QUERO
             </button>
        ) : step === ChatStep.FINAL_CTA ? (
             <a href="https://pay.kiwify.com.br/5j1fD0L" target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-green-600 text-white font-bold py-3 rounded-full hover:bg-green-700 transition animate-pulse">
                 QUERO COMEÇAR AGORA!
             </a>
        ) : (
             // Standard Input (Wait Name, Wait Age, Wait Symptoms)
            (step === ChatStep.WAIT_NAME || step === ChatStep.WAIT_AGE || step === ChatStep.WAIT_SYMPTOMS) ? (
            <>
                <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua resposta..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-whatsapp-green"
                />
                <button 
                    onClick={handleSend}
                    className="p-3 bg-whatsapp-teal text-white rounded-full hover:bg-teal-800 transition"
                >
                    <Send size={20} />
                </button>
            </>
            ) : (
                // Locked State (while bot talks or audio plays)
                <div className="w-full text-center text-gray-500 text-sm py-2 italic flex items-center justify-center gap-1">
                    <span className="font-semibold">DR Lair Ribeiro</span>
                    <span>{statusText}</span>
                </div>
            )
        )}
      </div>
    </div>
  );
};