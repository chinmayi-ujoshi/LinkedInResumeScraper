import React, { useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Page, Text, View, Document, Image } from '@react-pdf/renderer';
import styles from './styles';

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
      setError('Error fetching LinkedIn profile. Please check the URL.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const ResumeDocument = ({ profile }) => (
    <Document>
      <Page style={styles.page}>
        {/*Header*/}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{profile.full_name}</Text>
            <Text style={styles.contactDetails}>Occupation: {profile.occupation}</Text>
            <Text style={styles.contactDetails}>Location: {profile.city}, {profile.state}, {profile.country_full_name}</Text>
          </View>
          <Image
            style={styles.profilePicture}
            src={profile.profile_pic_base64}
          />
        </View>
  
        {/*Summary*/}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.bulletPoints}>{profile.summary}</Text>
        </View>
  
        {/* Work */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {profile.experiences?.map((job, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.companyName}>{job.company}</Text>
                <Text style={styles.dateRange}>
                  {`${job.starts_at.month}/${job.starts_at.year}`} - {job.ends_at ? `${job.ends_at.month}/${job.ends_at.year}` : 'Present'}
                </Text>
              </View>
              <Text style={styles.bulletPoints}>{job.description }</Text>
            </View>
          ))}
        </View>
  
        {/* Education*/}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {profile.education?.map((edu, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={styles.jobTitle}>{edu.school}</Text>
              <Text style={styles.companyName}>{edu.degree_name} - {edu.field_of_study || 'Field of study not available'}</Text>
              <Text style={styles.dateRange}>
                {`${edu.starts_at.month}/${edu.starts_at.year}`} - {edu.ends_at ? `${edu.ends_at.month}/${edu.ends_at.year}` : 'Present'}
              </Text>
              <Text style={styles.bulletPoints}>{edu.description || ''}</Text>
            </View>
          ))}
        </View>
  
        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated with LinkedIn Resume Generator</Text>
        </View>
      </Page>
    </Document>
  );
  
  

  return (
    <div>
      <h1>LinkedIn to Resume PDF Generator</h1>
      <div style={{ margin: '20px' }}>
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
    style={{ padding: '10px', backgroundColor: loading ? 'gray' : '#007bff', color: '#fff' }}
  >
    {loading ? 'Loading...' : 'Generate Resume'}
  </button>
</div>


      {error && <p style={{ color: 'red' }}>{error}</p>}

      {profileData && (
        <PDFDownloadLink
          document={<ResumeDocument profile={profileData} />}
          fileName="resume.pdf"
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default App;
