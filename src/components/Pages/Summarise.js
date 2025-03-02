import React, { useState, useEffect } from "react";
import "./Summarise.css";

export const Summarise = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [summaryVisible, setSummaryVisible] = useState(false);

  useEffect(() => {
    // Character count update
    setCharCount(inputText.length);
    
    // Detect if user is typing
    if (inputText.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [inputText]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSummarizeClick = async () => {
    if (inputText.trim().length === 0) return;
    
    try {
      setIsLoading(true);
      setSummaryVisible(false);
      
      const response = await fetch('http://localhost:8000/FriendAI/v1/summarise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText, word_limit: 100 }),
      });

      const data = await response.json();
      setSummary(data.data);
      
      // Add a small delay before showing the summary for animation effect
      setTimeout(() => {
        setSummaryVisible(true);
      }, 300);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setSummary('An error occurred while summarizing the text. Please try again.');
      setSummaryVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Text Summarizer</h1>
        <textarea
          className={`input-text ${isTyping ? 'typing' : ''}`}
          rows="25"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your text here..."
        />
        <div className="summarize-btn-container">
          <button 
            className={`summarize-btn ${isLoading ? 'loading' : ''}`} 
            onClick={handleSummarizeClick}
            disabled={isLoading || inputText.trim().length === 0}
          >
            {isLoading ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>
        <div className="char-count">
          {charCount > 0 && `${charCount} characters`}
        </div>
      </div>
      <div className="right-section">
        <h1>Summary</h1>
        <div className={`summary-box ${summaryVisible ? 'visible' : ''}`}>
          {summary}
        </div>
      </div>
    </div>
  );
};