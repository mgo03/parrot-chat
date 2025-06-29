'use client';
import React, {useState} from 'react';
import {useAtom} from 'jotai';
import SendIcon from '@mui/icons-material/Send';
import {Box, Button, Input} from '@mui/material';
import {sendMessageAtom} from '@/app/common/store/chat/chat';
import {type ChatData} from '@/types/chat';

type ChatFormProps = {};

const ChatForm = (props: ChatFormProps) => {
  const [message, setMessage] = useState<string>('');
  const [, setSender] = useAtom(sendMessageAtom);

  const sendMessage = async () => {
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
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        width: '100%',
        padding: 2,
        background: '#fff',
      }}
    >
      <Box style={{display: 'flex', gap: 10}}>
        <Input
          disableUnderline
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
              await sendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await sendMessage();
          }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatForm;
