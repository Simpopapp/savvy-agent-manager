
import { useState, useRef } from 'react';
import { useStore } from '@/hooks/useStore';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Trash2, FileText, File } from 'lucide-react';

export function KnowledgeBasesTab() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { knowledgeBases, addKnowledgeBase, deleteKnowledgeBase } = useStore();
  
  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type === 'text/plain' || file.name.endsWith('.md')) {
        addKnowledgeBase({
          name: file.name,
          file_path: `/uploads/${file.name}`
        });
      }
    });
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar esta base de conhecimento?')) {
      deleteKnowledgeBase(id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Bases de Conhecimento</h2>
          <p className="text-gray-600">Faça upload de documentos (.txt, .md) para enriquecer seus agentes</p>
        </div>
      </div>
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Arraste arquivos aqui ou clique para selecionar
        </h3>
        <p className="text-gray-600 mb-4">
          Formatos suportados: .txt, .md
        </p>
        <Button 
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
        >
          Selecionar Arquivos
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".txt,.md"
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />
      </div>
      
      {/* Files Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Arquivo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Caminho</TableHead>
              <TableHead className="w-24">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {knowledgeBases.map((kb) => (
              <TableRow key={kb.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  {kb.name.endsWith('.md') ? (
                    <FileText className="w-4 h-4 text-blue-500" />
                  ) : (
                    <File className="w-4 h-4 text-gray-500" />
                  )}
                  {kb.name}
                </TableCell>
                <TableCell>
                  {kb.name.endsWith('.md') ? 'Markdown' : 'Texto'}
                </TableCell>
                <TableCell className="text-gray-600">{kb.file_path}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(kb.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
