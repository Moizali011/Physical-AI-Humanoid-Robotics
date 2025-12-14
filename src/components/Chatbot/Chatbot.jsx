import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Chatbot.module.css';

const Chatbot = ({ embedded = true }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your Physical AI & Humanoid Robotics assistant. How can I help you with the textbook today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated RAG response function
  const getRagResponse = async (userMessage) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000)); // Random delay between 1-2 seconds

    // Enhanced response logic with more context-aware answers
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return "Hello! 👋 I'm your AI assistant for Physical AI & Humanoid Robotics. I can help explain concepts, provide examples, or guide you through the course material. What would you like to learn today?";
    } else if (lowerMsg.includes('module') || lowerMsg.includes('course') || lowerMsg.includes('textbook')) {
      return "This comprehensive course covers 4 modules:\n\n1. **Fundamentals** - Core concepts of Physical AI\n2. **Digital Twins** - Gazebo, Unity simulation environments\n3. **Control Systems** - ROS 2, NVIDIA Isaac frameworks\n4. **Advanced Applications** - Real-world implementations\n\nWhich module interests you most?";
    } else if (lowerMsg.includes('robot') || lowerMsg.includes('ros') || lowerMsg.includes('framework')) {
      return "Physical AI integrates digital intelligence with physical systems. Key frameworks include:\n\n- **ROS 2** - Robot Operating System for communication\n- **Gazebo** - Physics-based simulation environment\n- **NVIDIA Isaac** - GPU-accelerated robotics platform\n- **Unity** - 3D simulation and visualization\n\nThese tools connect AI algorithms with real robot hardware.";
    } else if (lowerMsg.includes('ai') || lowerMsg.includes('artificial intelligence') || lowerMsg.includes('intelligence')) {
      return "Physical AI refers to AI systems that interact with the physical world through robots. Unlike traditional AI that processes data in silos, Physical AI connects digital intelligence with physical actions, enabling robots to perceive, reason, and act in real environments.";
    } else if (lowerMsg.includes('humanoid') || lowerMsg.includes('humanoid robot') || lowerMsg.includes('bipedal')) {
      return "Humanoid robots are designed with human-like characteristics, often featuring bipedal locomotion, arms with hands, and a head. They're important for:\n\n- Human-robot interaction\n- Operating in human-designed environments\n- Research in embodied cognition\n- Assistive technologies\n\nControl involves complex algorithms for balance, gait, and manipulation.";
    } else if (lowerMsg.includes('simulation') || lowerMsg.includes('gazebo') || lowerMsg.includes('unity')) {
      return "Simulation is crucial for robotics development:\n\n- **Gazebo**: Physics-accurate simulation with realistic sensors\n- **Unity**: High-fidelity 3D environments and visualization\n- **Digital Twins**: Virtual replicas of physical robots\n\nSimulations allow safe, cost-effective testing before real-world deployment.";
    } else if (lowerMsg.includes('thank')) {
      return "You're welcome! 😊 Is there anything else about Physical AI & Humanoid Robotics I can help explain?";
    } else if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye') || lowerMsg.includes('exit')) {
      return "Goodbye! Feel free to return if you have more questions about Physical AI & Humanoid Robotics. Happy learning! 🤖";
    } else if (lowerMsg.includes('help')) {
      return "I can help with:\n\n- Explaining Physical AI concepts\n- Detailing course modules\n- Discussing robotics frameworks (ROS 2, Gazebo, Isaac)\n- Clarifying humanoid robot technologies\n- Providing examples and applications\n\nJust ask me anything related to the course!";
    } else {
      // Default response with context about the course
      const responses = [
        "That's a great question about Physical AI & Humanoid Robotics! Based on the textbook content, Physical AI represents the integration of digital intelligence with physical systems, enabling robots to interact meaningfully with the real world.",
        "Interesting! Physical AI & Humanoid Robotics is a fascinating field that combines artificial intelligence with mechanical systems. The course covers everything from simulation environments to real-world robot deployment.",
        "Great question! In the context of Physical AI, we're talking about systems that bridge the gap between digital computation and physical action. This involves perception, decision-making, and actuation in real environments.",
        "That's an insightful question! The field of Physical AI & Humanoid Robotics involves multiple disciplines: machine learning, control systems, computer vision, and mechanical engineering. Each module in the course builds on these foundations.",
        "Excellent question! Physical AI & Humanoid Robotics involves complex systems that can perceive their environment, make intelligent decisions, and perform physical tasks. The course provides comprehensive coverage of both theoretical concepts and practical implementations."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get response from RAG system
      const responseText = await getRagResponse(inputValue);
      const botResponse = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error processing your request. Please try again.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const containerClass = embedded
    ? clsx(styles.chatContainer, styles.embedded)
    : styles.chatContainer;

  return (
    <div className={containerClass}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderContent}>
          <div className={styles.botIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4 className={styles.chatTitle}>Physical AI Assistant</h4>
            <p className={styles.chatSubtitle}>Ask me about the textbook content</p>
          </div>
        </div>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              styles.message,
              styles[message.sender],
              message.sender === 'user' ? styles.userMessage : styles.botMessage
            )}
          >
            <div className={styles.messageContent}>
              {message.text}
            </div>
            {message.sender === 'bot' && (
              <div className={styles.botIconSmall}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className={clsx(styles.message, styles.botMessage)}>
            <div className={styles.typingIndicator}>
              <div className={styles.typingDot}></div>
              <div className={styles.typingDot}></div>
              <div className={styles.typingDot}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className={styles.chatInputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about Physical AI, ROS 2, simulation, or humanoid robotics..."
          className={styles.chatInput}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.chatButton}
          disabled={isLoading || !inputValue.trim()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;