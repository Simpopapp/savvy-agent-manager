
import { useState, useEffect } from 'react';
import { useStore } from '@/hooks/useStore';
import { Agent } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agent?: Agent | null;
}

export function AgentDialog({ isOpen, onClose, agent }: AgentDialogProps) {
  const [name, setName] = useState('');
  const [modelId, setModelId] = useState('');
  const [promptId, setPromptId] = useState<string>('');
  const [knowledgeBaseId, setKnowledgeBaseId] = useState<string>('none');
  
  const { prompts, knowledgeBases, addAgent, updateAgent } = useStore();
  
  const isEditing = !!agent;
  
  // Modelos disponíveis (mock - será integrado com backend)
  const availableModels = [
    'anthropic/claude-3-opus',
    'anthropic/claude-3-sonnet',
    'openai/gpt-4-turbo',
    'openai/gpt-3.5-turbo',
    'meta-llama/llama-2-70b-chat',
  ];
  
  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setModelId(agent.model_id);
      setPromptId(agent.prompt_id.toString());
      setKnowledgeBaseId(agent.knowledge_base_id?.toString() || 'none');
    } else {
      setName('');
      setModelId('');
      setPromptId('');
      setKnowledgeBaseId('none');
    }
  }, [agent]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !modelId || !promptId) return;
    
    const agentData = {
      name: name.trim(),
      model_id: modelId,
      prompt_id: parseInt(promptId),
      knowledge_base_id: knowledgeBaseId === 'none' ? undefined : parseInt(knowledgeBaseId),
    };
    
    if (isEditing && agent) {
      updateAgent(agent.id, agentData);
    } else {
      addAgent(agentData);
    }
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Agente' : 'Novo Agente'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do agente"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="model">Modelo</Label>
            <Select value={modelId} onValueChange={setModelId} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um modelo" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map(model => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="prompt">Prompt de Sistema</Label>
            <Select value={promptId} onValueChange={setPromptId} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um prompt" />
              </SelectTrigger>
              <SelectContent>
                {prompts.map(prompt => (
                  <SelectItem key={prompt.id} value={prompt.id.toString()}>
                    {prompt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="knowledge">Base de Conhecimento</Label>
            <Select value={knowledgeBaseId} onValueChange={setKnowledgeBaseId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma base (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhuma</SelectItem>
                {knowledgeBases.map(kb => (
                  <SelectItem key={kb.id} value={kb.id.toString()}>
                    {kb.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
