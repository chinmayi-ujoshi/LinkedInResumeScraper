import React, { useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Font } from '@react-pdf/renderer';
import ResumeDocument from './components/ResumeDocument'; 

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf',fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fBBc-.ttf', fontWeight: 'bold' }, // Regular font
  ],
});

const App = () => {
  const [url, setUrl] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLinkedInProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/linkedin', { params: { url } });
      setProfileData(response.data);
    } catch (err) {
      setError('Error fetching LinkedIn profile.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>LinkedIn to Resume PDF Generator</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter LinkedIn profile URL"
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button
          onClick={fetchLinkedInProfile}
          disabled={loading}
          style={{ padding: '10px', backgroundColor: loading ? 'gray' : '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Loading...' : 'Generate Resume'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {profileData && (
        <div style={{ marginTop: '20px' }}>
          <PDFDownloadLink
            document={<ResumeDocument profile={profileData} />}
            fileName={`${profileData.full_name}_Resume.pdf`}
            style={{ textDecoration: 'none', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', borderRadius: '5px' }}
          >
            {({ loading }) => (loading ? 'Preparing document...' : 'Download PDF')}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default App;
