'use client';

import ChatForm from '@/components/chat/ChatForm';
import ChatMessage from '@/components/chat/ChatMessage';

// ホームページ（"/"）の中身
const Home: () => React.JSX.Element = () => {
  return (
    <>
      <ChatMessage />
      <ChatForm />
    </>
  );
};

export default Home;
