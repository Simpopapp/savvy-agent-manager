
import { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { AgentDialog } from '../dialogs/AgentDialog';
import { Agent } from '@/types';

export function AgentsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  
  const { agents, prompts, knowledgeBases, deleteAgent } = useStore();
  
  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este agente?')) {
      deleteAgent(id);
    }
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAgent(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Agentes</h2>
          <p className="text-gray-600">Gerencie seus agentes de IA</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agente
        </Button>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Prompt</TableHead>
              <TableHead>Base de Conhecimento</TableHead>
              <TableHead className="w-24">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => {
              const prompt = prompts.find(p => p.id === agent.prompt_id);
              const kb = knowledgeBases.find(k => k.id === agent.knowledge_base_id);
              
              return (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.model_id}</TableCell>
                  <TableCell>{prompt?.name || 'N/A'}</TableCell>
                  <TableCell>{kb?.name || 'Nenhuma'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(agent)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(agent.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      <AgentDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        agent={editingAgent}
      />
    </div>
  );
}
