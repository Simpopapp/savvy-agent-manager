
import { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { PromptDialog } from '../dialogs/PromptDialog';
import { Prompt } from '@/types';

export function PromptsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  
  const { prompts, deletePrompt } = useStore();
  
  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este prompt?')) {
      deletePrompt(id);
    }
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPrompt(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Prompts de Sistema</h2>
          <p className="text-gray-600">Gerencie os prompts que definem o comportamento dos agentes</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Prompt
        </Button>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Prévia do Conteúdo</TableHead>
              <TableHead className="w-24">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prompts.map((prompt) => (
              <TableRow key={prompt.id}>
                <TableCell className="font-medium">{prompt.name}</TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">
                    {prompt.content.substring(0, 100)}
                    {prompt.content.length > 100 && '...'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(prompt)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(prompt.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <PromptDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        prompt={editingPrompt}
      />
    </div>
  );
}
