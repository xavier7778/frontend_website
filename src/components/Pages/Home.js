import React from "react";
import { Link } from 'react-router-dom'; 
import "./Home.css"
export const Home = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Our Website</h1>
        <p>Explore our innovative chatbot functionalities!</p>
      </header>
      <Link to="/summarise" className="functionality">
        <div className="chatbot-summary">
          <h2 className="h2-list-feature">Summarized Chatbot</h2>
          <p className="para-list-feature">Get quick summaries of various long texts in just one click with all the context and customized word limit in which you want to summarise the text</p>
          {/* Summarized Chatbot Component */}
        </div>
      </Link>
      <Link to="/rag" className="functionality">
        <div className="pdf-chatbot">
          <h2 className="h2-list-feature">Interactive PDF Chatbot</h2>
          <p className="para-list-feature">Interact with your PDF files using our chatbot.</p>
          {/* PDF Chatbot Component */}
        </div>
      </Link>
    </div>
  );
};