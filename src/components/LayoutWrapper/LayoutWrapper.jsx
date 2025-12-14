import React from 'react';
import Layout from '@theme/Layout';
import ChatbotSidebar from '../Chatbot/ChatbotSidebar';

const LayoutWrapper = (props) => {
  return (
    <>
      <Layout {...props}>
        {props.children}
      </Layout>
      <ChatbotSidebar />
    </>
  );
};

export default LayoutWrapper;