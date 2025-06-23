
import { useStore } from '@/hooks/useStore';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Settings, Bot } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Sidebar() {
  const { 
    agents, 
    activeAgentId, 
    setActiveAgent 
  } = useStore();
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const activeAgent = agents.find(agent => agent.id === activeAgentId);
  
  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="w-8 h-8 text-blue-400" />
          Orquestrador
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant={location.pathname === '/' ? 'secondary' : 'ghost'}
          className="w-full justify-start text-white hover:bg-gray-700"
          onClick={() => navigate('/')}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat
        </Button>
        
        <Button
          variant={location.pathname === '/management' ? 'secondary' : 'ghost'}
          className="w-full justify-start text-white hover:bg-gray-700"
          onClick={() => navigate('/management')}
        >
          <Settings className="w-4 h-4 mr-2" />
          Gerenciamento
        </Button>
      </nav>
      
      {/* Agent Selector */}
      <div className="p-4 border-t border-gray-700">
        <label className="text-sm text-gray-400 mb-2 block">Agente Ativo</label>
        <Select 
          value={activeAgentId?.toString() || ""} 
          onValueChange={(value) => setActiveAgent(value ? parseInt(value) : null)}
        >
          <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white">
            <SelectValue placeholder="Selecione um agente" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            {agents.map(agent => (
              <SelectItem 
                key={agent.id} 
                value={agent.id.toString()}
                className="text-white hover:bg-gray-700"
              >
                {agent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {activeAgent && (
          <div className="mt-2 text-xs text-gray-400">
            <div>Modelo: {activeAgent.model_id}</div>
          </div>
        )}
      </div>
    </div>
  );
}
