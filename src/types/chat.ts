export type ChatData = {
  id: number;
  role: 'user' | 'bot';
  message: string;
};

export type ChatInput = {
  role?: 'user' | 'bot';
  message: string;
};
