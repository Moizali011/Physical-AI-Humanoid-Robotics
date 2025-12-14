import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatbotSidebar from '../components/Chatbot/ChatbotSidebar';

// Initialize the chatbot sidebar once the DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const portalDiv = document.getElementById('chatbot-sidebar-portal');
    if (portalDiv) {
      const root = createRoot(portalDiv);
      root.render(<ChatbotSidebar />);
    }
  });
}