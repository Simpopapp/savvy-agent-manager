
// Tipos principais do sistema
export interface Prompt {
  id: number;
  name: string;
  content: string;
}

export interface KnowledgeBase {
  id: number;
  name: string;
  file_path: string;
}

export interface Agent {
  id: number;
  name: string;
  model_id: string;
  prompt_id: number;
  knowledge_base_id?: number;
  prompt?: Prompt;
  knowledge_base?: KnowledgeBase;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  [agentId: number]: ChatMessage[];
}
