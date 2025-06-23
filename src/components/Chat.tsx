
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/hooks/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '@/types';

export function Chat() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    activeAgentId, 
    agents, 
    chatHistory, 
    addMessage 
  } = useStore();
  
  const activeAgent = agents.find(agent => agent.id === activeAgentId);
  const messages = activeAgentId ? chatHistory[activeAgentId] || [] : [];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!message.trim() || !activeAgentId || isLoading) return;
    
    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);
    
    // Adiciona mensagem do usuário
    addMessage(activeAgentId, { role: 'user', content: userMessage });
    
    // Simula resposta do agente (aqui será integrado com o backend)
    setTimeout(() => {
      const responses = [
        "Entendi sua pergunta! Como posso ajudá-lo melhor?",
        "Interessante perspectiva. Deixe-me processar isso...",
        "Baseado no meu conhecimento, posso sugerir algumas abordagens.",
        "Essa é uma excelente questão. Vou analisar os detalhes.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(activeAgentId, { role: 'assistant', content: randomResponse });
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!activeAgent) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum Agente Selecionado
          </h2>
          <p className="text-gray-500">
            Selecione um agente na barra lateral para começar a conversar.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-blue-500" />
          <div>
            <h2 className="font-semibold text-gray-900">{activeAgent.name}</h2>
            <p className="text-sm text-gray-500">Modelo: {activeAgent.model_id}</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>Comece uma conversa com {activeAgent.name}!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white ml-auto'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  {msg.role === 'assistant' && (
                    <Bot className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  )}
                  {msg.role === 'user' && (
                    <User className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 max-w-[70%]">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="bg-white border-t px-6 py-4">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Conversar com ${activeAgent.name}...`}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
