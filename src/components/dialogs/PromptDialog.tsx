
import { useState, useEffect } from 'react';
import { useStore } from '@/hooks/useStore';
import { Prompt } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  prompt?: Prompt | null;
}

export function PromptDialog({ isOpen, onClose, prompt }: PromptDialogProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  
  const { addPrompt, updatePrompt } = useStore();
  
  const isEditing = !!prompt;
  
  useEffect(() => {
    if (prompt) {
      setName(prompt.name);
      setContent(prompt.content);
    } else {
      setName('');
      setContent('');
    }
  }, [prompt]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim()) return;
    
    const promptData = {
      name: name.trim(),
      content: content.trim(),
    };
    
    if (isEditing && prompt) {
      updatePrompt(prompt.id, promptData);
    } else {
      addPrompt(promptData);
    }
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Prompt' : 'Novo Prompt'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do prompt"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="content">Conteúdo do Prompt</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Descreva como o agente deve se comportar..."
              className="min-h-[200px]"
              required
            />
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
