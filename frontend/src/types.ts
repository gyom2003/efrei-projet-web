export type Message = {
  id: string;
  content: string;
  timestamp: number;
  author: {
    id: string;
    username: string;
  };
};


export type User = {
  id: string;
  username: string;
};

export type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
};
