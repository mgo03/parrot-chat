'use client';
import React, {useState} from 'react';
import {useAtom} from 'jotai';
import {sendMessageAtom} from '@/app/common/store/chat/chat';
import {type ChatData} from '@/types/chat';

type ChatFormProps = {};

const ChatForm = (props: ChatFormProps) => {
  const [message, setMessage] = useState<string>('');
  const [, setSender] = useAtom(sendMessageAtom);

  const sendMesage = async () => {
    if (!message) return;

    try {
      const response = await fetch('api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'user',
          message,
        }),
      });
      const data: ChatData = (await response.json()) as ChatData;

      setSender(true); // これでユーザーが送信したというアクションをChatMessageに伝える
    } catch {
      console.log('error');
    }

    setMessage('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        padding: 20,
        background: '#fff',
      }}
    >
      <div style={{display: 'flex', gap: 10}}>
        <input
          type="text"
          placeholder="新しいチャットを送る..."
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 10,
            border: '1px solid #ccc',
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={async (e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault();
              await sendMesage();
            }
          }}
        />
        <button
          type="button"
          style={{
            padding: 10,
            background: '#006BD6',
            color: 'white',
            borderRadius: 10,
            border: 'none',
          }}
          onClick={async () => {
            await sendMesage();
          }}
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default ChatForm;
