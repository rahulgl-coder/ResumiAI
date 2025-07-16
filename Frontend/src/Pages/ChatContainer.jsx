import React, { useState } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user's message
    const newMessages = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      // Start streaming response from AI
      const stream = await window.puter.ai.chat(userInput, { stream: true });

      let aiMessage = '';
      for await (const part of stream) {
        aiMessage += part?.text || '';
        // Update as stream progresses
        setMessages(prev =>
          [...newMessages, { role: 'ai', text: aiMessage }]
        );
      }

    } catch (error) {
      setMessages(prev =>
        [...newMessages, { role: 'ai', text: 'Error: ' + error.message }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
          </div>
        ))}
        {isLoading && <div style={styles.aiMsg}><strong>AI:</strong> Typing...</div>}
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask something..."
        />
        <button style={styles.button} onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: { maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'Arial' },
  messages: { maxHeight: '60vh', overflowY: 'auto', marginBottom: 10 },
  userMsg: { background: '#d1e7dd', padding: 10, borderRadius: 10, marginBottom: 5 },
  aiMsg: { background: '#f8d7da', padding: 10, borderRadius: 10, marginBottom: 5 },
  inputArea: { display: 'flex', gap: 10 },
  input: { flex: 1, padding: 10, borderRadius: 5, border: '1px solid #ccc' },
  button: { padding: '10px 20px', borderRadius: 5, background: '#007bff', color: '#fff', border: 'none' }
};

export default ChatComponent;
