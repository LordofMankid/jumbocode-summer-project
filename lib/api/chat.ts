import connectToDatabase from '@/lib/mongoose';
import Chat, { IChat } from '../models/Chat';

export interface ChatProps {
  content: string;
  role: string;
  date: Date;
}
export const postChat = async (
  content: string,
  role: string
): Promise<ChatProps> => {
  await connectToDatabase();
  const date = new Date();
  const chat = new Chat({
    content,
    role,
    date
  });
  await chat.save();
  return {
    content: content,
    role: role,
    date
  };
};

export const getAllChats = async (): Promise<ChatProps[]> => {
  await connectToDatabase();
  const users: IChat[] = await Chat.find({}).sort({ date: 1 });
  return users.map((chat) => ({
    content: chat.content,
    role: chat.role,
    date: chat.date
  }));
};
