import React, { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    // Update chat history with the user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Add a "Thinking..." placeholder for the bot's response
    setTimeout( () =>{

        setChatHistory((history) => [...history,{ role: "model", text: "Thinking..." }]); 

        generateBotResponse([...chatHistory,{ role: "user", text: `Using details provided above address the query: ${userMessage}` }]);

        },600);

    


  };

  return (
    <div>
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Message..."
          className="message-input"
          required
        />
        <button className="material-symbols-rounded">arrow_upward</button>
      </form>
    </div>
  );
};

export default ChatForm;
