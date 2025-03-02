import React, { useState, useRef, useEffect } from "react";
import "./Rag.css";

export const Rag = () => {
  const [file, setFile] = useState(null);
  const [uniqueRef, setUniqueRef] = useState("");
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const conversationEndRef = useRef(null);

  // Scroll to bottom of conversation
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }
    
    setIsUploading(true);
    setError("");
    
    // Generate a simple unique reference (in a real app, this should come from the server)
    const uniqueRef = "pdf_" + Date.now();
    const formData = new FormData();
    formData.append("pdf_file", file);
    formData.append("unique_ref", uniqueRef);

    try {
      const response = await fetch("https://backend-server-d5kj.onrender.com/FriendAI/v1/pdf_vectorise", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const result = await response.json();
      setUniqueRef(uniqueRef);
      setConversation([{ 
        text: `PDF "${fileName}" has been successfully uploaded. You can now ask questions about its content.`, 
        from: "system" 
      }]);
    } catch (error) {
      console.error("Error uploading document:", error);
      setError("There was an issue uploading the file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (!uniqueRef) {
      setError("Please upload a PDF file first.");
      return;
    }
    
    // Add user message immediately
    setConversation(prev => [
      { text: query, from: "user" },
      ...prev
    ]);
    
    setIsLoading(true);
    const currentQuery = query;
    setQuery("");

    try {
      // Fixed the fetch URL to use the correct endpoint
      const response = await fetch(`https://backend-server-d5kj.onrender.com/FriendAI/v1/rag_pdf_query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          query: currentQuery,
          vectorised_pdf_ref: uniqueRef,
          delete_client: false 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot response
      setConversation(prev => {
        // Find the user message we just added
        const updatedConversation = [...prev];
        // Add bot message after the user message (at the beginning)
        updatedConversation.unshift({ text: data.answer || data.data, from: "bot" });
        return updatedConversation;
      });
      
      setError("");
    } catch (error) {
      console.error("Error fetching response:", error);
      setError("There was an issue fetching the response. Please try again.");
      // Add error message to conversation
      setConversation(prev => [
        { text: "Sorry, I couldn't process your request. Please try again.", from: "bot" },
        ...prev
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = async (e) => {
    setFile(null);
    setFileName("");
    setUniqueRef("");
    setConversation([]);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    const response = await fetch(`https://backend-server-d5kj.onrender.com/FriendAI/v1/rag_pdf_query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        query: '',
        vectorised_pdf_ref: uniqueRef,
        delete_client: true 
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  return (
    <div className="rag-container">
      <div className="rag-header">
        <h1>RAG Chatbot</h1>
        <p className="rag-subtitle">Upload a PDF and ask questions about its content</p>
      </div>
      
      <div className="upload-section">
        <div className="file-input-container">
          <input 
            type="file" 
            id="pdf-upload"
            ref={fileInputRef}
            accept="application/pdf" 
            onChange={handleFileChange}
            className="file-input" 
          />
          <label htmlFor="pdf-upload" className="file-label">
            {fileName ? fileName : "Choose PDF file"}
          </label>
        </div>
        
        <button 
          className={`upload-btn ${isUploading ? 'loading' : ''}`} 
          onClick={handleSubmit} 
          disabled={isUploading || !file}
        >
          {isUploading ? "Uploading..." : "Upload PDF"}
        </button>
        
        {uniqueRef && (
          <button className="reset-btn" onClick={resetChat}>
            Reset
          </button>
        )}
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      {uniqueRef && (
        <div className="chat-section">
          <form onSubmit={handleQuerySubmit} className="query-form">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question about the document..."
              className="query-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className={`query-btn ${isLoading ? 'loading' : ''}`} 
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? "" : "Send"}
            </button>
          </form>
          
          <div className="conversation-container">
            {conversation.length > 0 ? (
              conversation.map((msg, index) => (
                <div key={index} className={`message ${msg.from}`}>
                  <div className="message-content">
                    {msg.text}
                  </div>
                  {msg.from === "user" }
                  {msg.from === "bot" }
                </div>
              ))
            ) : (
              <div className="empty-conversation">
                <p>Your conversation will appear here</p>
              </div>
            )}
            <div ref={conversationEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};