/* eslint-disable @typescript-eslint/naming-convention */
import {type NextRequest, NextResponse} from 'next/server';
import {type ChatData} from '@/types/chat';

const chatMessages = [
  {
    id: 'bot_0',
    role: 'bot',
    message: 'こんにちは！',
  },
];

let nextId = 1;

export async function GET() {
  return NextResponse.json(chatMessages);
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as ChatData;

  const newMessage = {
    id: `user_${nextId++}`,
    role: data.role ?? 'user',
    message: data.message,
  };

  chatMessages.push(newMessage, {
    id: `bot_${nextId++}`,
    role: 'bot',
    message: data.message,
  });

  return NextResponse.json(newMessage);
}
