'use client';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {Box, Typography} from '@mui/material';
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
    <Box
      sx={{
        backgroundColor: '#F1F3F7',
        padding: '20px 30px 0px 30px',
        flexGrow: 1,
      }}
    >
      {inputMessage?.map((post) => {
        return (
          <Box key={post.id}>
            {post.role === 'user' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: 2,
                }}
              >
                <Box
                  sx={{
                    padding: '10px 20px',
                    background: '#006BD6',
                    borderRadius: 5,
                    maxWidth: '80%',
                    color: 'white',
                  }}
                >
                  <Typography variant="body1">{post.message}</Typography>
                </Box>
              </Box>
            )}
            {post.role === 'bot' && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <Image src="/animal_parrot.png" alt="" width={50} height={50} />
                <Box
                  sx={{
                    padding: '10px 20px',
                    background: '#dfe2e9',
                    borderRadius: 5,
                    maxWidth: '80%',
                  }}
                >
                  {post.message}
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatMessage;
