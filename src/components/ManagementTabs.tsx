
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AgentsTab } from './tabs/AgentsTab';
import { PromptsTab } from './tabs/PromptsTab';
import { KnowledgeBasesTab } from './tabs/KnowledgeBasesTab';

export function ManagementTabs() {
  return (
    <div className="h-full bg-white">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciamento</h1>
        <p className="text-gray-600">Configure agentes, prompts e bases de conhecimento</p>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="agents" className="h-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="agents">Agentes</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="knowledge">Conhecimento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents" className="mt-6">
            <AgentsTab />
          </TabsContent>
          
          <TabsContent value="prompts" className="mt-6">
            <PromptsTab />
          </TabsContent>
          
          <TabsContent value="knowledge" className="mt-6">
            <KnowledgeBasesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
