import React, { useState } from 'react';
// Import the CSS file in your project
import './Contact.css';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-flex">
          <div className="contact-sidebar">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            
            <h2 className="title">Say Hello! ✌️</h2>
            <div>
              <h3 className="subtitle">Reach Out</h3>
              <ul className="contact-list">
                <li className="contact-item">
                  <div className="contact-icon-container">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <a href="mailto:xaviersehwag7778@gmail.com" className="contact-link">xaviersehwag7778@gmail.com</a>
                </li>
                <li className="contact-item">
                  <div className="contact-icon-container">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </div>
                  <a href="https://www.linkedin.com/in/xavier-712b08194/" className="contact-link">LinkedIn</a>
                </li>
              </ul>
            </div>
            <div className="message-box">
              <p className="message-box-title">Good Vibes Only</p>
              <p>Looking forward to connecting with you! I usually respond within 24 hours.</p>
            </div>
          </div>
          <div className="contact-form-section">
            <h2 className="form-title">Drop a Message 💬</h2>
            {submitted ? (
              <div className="success-message">
                <p className="success-title">Thanks for reaching out!</p>
                <p>Your message is on its way to me. I'll get back to you soon!</p>
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-input"
                  placeholder="What should I call you?"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Where can I reach you?"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows="4"
                  className="form-textarea"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                className="submit-button"
              >
                Send It! ✨
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;