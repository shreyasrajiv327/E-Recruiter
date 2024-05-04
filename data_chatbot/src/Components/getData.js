import React, { useState } from 'react';
import axios from 'axios';
import './getData.css';

function App() {
  const [email, setEmail] = useState('');
  const [extractedInfo, setExtractedInfo] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:5004/api/getFile?email=${email}`);
      
      // Set the extracted info state
      setExtractedInfo(response.data.extracted_info);
    } catch (error) {
      console.error('Error retrieving file:', error);
    }
  };

  return (
    <div>
      <h1>Get File by Email</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Applicant Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <button type="submit">Get File</button>
      </form>
      {extractedInfo && (
        <div>
          <h2>Extracted Information:</h2>
          <ul>
            <li>Name: {extractedInfo.Name}</li>
            <li>Email: {extractedInfo.Email}</li>
            <li>Contact Info: {extractedInfo['Contact Info']}</li>
            <li>Education: {extractedInfo.Education}</li>
            <li>Skills: {extractedInfo.Skills}</li>
            <li>Experience: {extractedInfo.Experience}</li>
            <li>Designation: {extractedInfo.Designation}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
