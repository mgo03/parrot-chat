'use client';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {sendMessageAtom} from '@/app/common/store/chat/chat';
import {type ChatData} from '@/types/chat';

type ChatMessageProps = {};

const ChatMessage = (props: ChatMessageProps) => {
  const [inputMessage, setInputMessage] = useState<ChatData[]>([]);
  const [sender, setSender] = useAtom(sendMessageAtom);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'GET',
        });
        const data = (await response.json()) as ChatData[];
        setInputMessage(data);
      } catch (error) {
        console.log(error);
      }
    };

    void getMessage();
    setSender(false);
  }, [sender, setSender]);

  return (
    <div style={{padding: '30px 20px', height: '100%'}}>
      {inputMessage?.map((post) => {
        return (
          <div key={post.id}>
            {post.role === 'user' && (
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  justifyContent: 'flex-end',
                  marginTop: 20,
                }}
              >
                <div
                  style={{
                    padding: '10px 20px',
                    marginTop: 5,
                    background: '#006BD6',
                    borderRadius: 10,
                    lineHeight: 1.5,
                    height: 'fit-content',
                    color: 'white',
                  }}
                >
                  {post.message}
                </div>
              </div>
            )}
            {post.role === 'bot' && (
              <div style={{display: 'flex', gap: 10}}>
                <Image
                  src="https://doodleipsum.com/700/avatar-2?i=0639d368201785f32891763286f61ca0"
                  alt=""
                  width={50}
                  height={50}
                />
                <div
                  style={{
                    padding: '10px 20px',
                    marginTop: 5,
                    background: '#fff',
                    borderRadius: 10,
                    lineHeight: 1.5,
                    height: 'fit-content',
                  }}
                >
                  {post.message}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessage;
