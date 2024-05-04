import React, { useState } from 'react';
import './chatbot.css'; // Import CSS file for styling
import axios from 'axios';

function Chatbot() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConfirm = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5004/api/userData', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.status, response.data.token);
    } catch (error) {
      console.error('Error submitting user data:', error);
    }

    setStep(step + 1);
  };

  const handleRetry = () => {
    setName('');
    setEmail('');
    setFile(null);
    setStep(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleConfirm();
  };

  return (
    <div className="chatbot-container">
      <h1>Chatbot</h1>
      <div className="chatbot-messages">
        {step === 0 && (
          <div className="chatbot-message">
            <p>Hi there! What's your name?</p>
            <form onSubmit={handleSubmit}>
              <input type="text" value={name} onChange={handleNameChange} required autoFocus />
              <button type="submit">Next</button>
            </form>
          </div>
        )}
        {step === 1 && (
          <div className="chatbot-message">
            <p>Thanks, {name}! What's your email?</p>
            <form onSubmit={handleSubmit}>
              <input type="email" value={email} onChange={handleEmailChange} required />
              <button type="submit">Next</button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div className="chatbot-message">
            <p>Great, {name}! Please upload your PDF file.</p>
            <form onSubmit={handleSubmit}>
              <input type="file" accept=".pdf" onChange={handleFileChange} required />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {step === 3 && (
          <div className="confirmation-message">
            <p>Here's the information you provided:</p>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>File: {file && file.name}</p>
            <p>Is this correct?</p>
            <button onClick={handleConfirm}>Yes, proceed</button>
            <button onClick={handleRetry}>No, retry</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
