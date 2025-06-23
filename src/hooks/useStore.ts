
import { create } from 'zustand';
import { Agent, Prompt, KnowledgeBase, ChatHistory } from '@/types';

interface AppState {
  // Estado principal
  activeAgentId: number | null;
  agents: Agent[];
  prompts: Prompt[];
  knowledgeBases: KnowledgeBase[];
  chatHistory: ChatHistory;
  
  // Actions
  setActiveAgent: (agentId: number | null) => void;
  
  // Agents
  addAgent: (agent: Omit<Agent, 'id'>) => void;
  updateAgent: (id: number, agent: Partial<Agent>) => void;
  deleteAgent: (id: number) => void;
  
  // Prompts
  addPrompt: (prompt: Omit<Prompt, 'id'>) => void;
  updatePrompt: (id: number, prompt: Partial<Prompt>) => void;
  deletePrompt: (id: number) => void;
  
  // Knowledge Bases
  addKnowledgeBase: (kb: Omit<KnowledgeBase, 'id'>) => void;
  deleteKnowledgeBase: (id: number) => void;
  
  // Chat
  addMessage: (agentId: number, message: { role: 'user' | 'assistant', content: string }) => void;
  clearChat: (agentId: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Estado inicial
  activeAgentId: null,
  agents: [
    {
      id: 1,
      name: "Assistente Geral",
      model_id: "anthropic/claude-3-opus",
      prompt_id: 1,
      knowledge_base_id: 1
    }
  ],
  prompts: [
    {
      id: 1,
      name: "Assistente Amigável",
      content: "Você é um assistente IA amigável e prestativo. Responda de forma clara e educada."
    }
  ],
  knowledgeBases: [
    {
      id: 1,
      name: "Documentação Técnica",
      file_path: "/data/tech_docs.md"
    }
  ],
  chatHistory: {},
  
  // Actions
  setActiveAgent: (agentId) => set({ activeAgentId: agentId }),
  
  // Agents
  addAgent: (agent) => set((state) => ({
    agents: [...state.agents, { ...agent, id: Date.now() }]
  })),
  
  updateAgent: (id, updatedAgent) => set((state) => ({
    agents: state.agents.map(agent => 
      agent.id === id ? { ...agent, ...updatedAgent } : agent
    )
  })),
  
  deleteAgent: (id) => set((state) => ({
    agents: state.agents.filter(agent => agent.id !== id),
    activeAgentId: state.activeAgentId === id ? null : state.activeAgentId
  })),
  
  // Prompts
  addPrompt: (prompt) => set((state) => ({
    prompts: [...state.prompts, { ...prompt, id: Date.now() }]
  })),
  
  updatePrompt: (id, updatedPrompt) => set((state) => ({
    prompts: state.prompts.map(prompt => 
      prompt.id === id ? { ...prompt, ...updatedPrompt } : prompt
    )
  })),
  
  deletePrompt: (id) => set((state) => ({
    prompts: state.prompts.filter(prompt => prompt.id !== id)
  })),
  
  // Knowledge Bases
  addKnowledgeBase: (kb) => set((state) => ({
    knowledgeBases: [...state.knowledgeBases, { ...kb, id: Date.now() }]
  })),
  
  deleteKnowledgeBase: (id) => set((state) => ({
    knowledgeBases: state.knowledgeBases.filter(kb => kb.id !== id)
  })),
  
  // Chat
  addMessage: (agentId, message) => set((state) => ({
    chatHistory: {
      ...state.chatHistory,
      [agentId]: [
        ...(state.chatHistory[agentId] || []),
        { ...message, timestamp: new Date() }
      ]
    }
  })),
  
  clearChat: (agentId) => set((state) => ({
    chatHistory: {
      ...state.chatHistory,
      [agentId]: []
    }
  }))
}));
