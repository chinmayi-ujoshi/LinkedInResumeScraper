import React, { useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

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

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica', // Use a clean, professional font
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    contactDetails: {
      fontSize: 12,
      color: '#555',
      marginBottom: 5,
    },
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      objectFit: 'cover',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#007bff',
      marginBottom: 10,
      borderBottom: '1px solid #ddd',  // Add underline to section titles
      paddingBottom: 5,
    },
    jobTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    companyName: {
      fontSize: 12,
      fontStyle: 'italic',
      color: '#333',
    },
    dateRange: {
      fontSize: 12,
      textAlign: 'right',
      color: '#777',
    },
    bulletPoints: {
      marginLeft: 15,
      marginBottom: 10,
      fontSize: 12,
      color: '#555',
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 10,
      color: '#adb5bd',
    },
  });
  
  const ResumeDocument = ({ profile }) => (
    <Document>
      <Page style={styles.page}>
        {/* Header Section with Profile Picture */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{profile.full_name}</Text>
            <Text style={styles.contactDetails}>Email: {profile.email || 'Not available'}</Text>
          </View>
          {profile.profile_picture_url && (
            <Image
              style={styles.profilePicture}
              src={profile.profile_picture_url || 'https://via.placeholder.com/100'}
            />
          )}
        </View>
  
        {/* Work Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {profile.experiences?.map((job, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.companyName}>{job.company}</Text>
                <Text style={styles.dateRange}>{job.start_date} - {job.end_date || 'Present'}</Text>
              </View>
              <Text style={styles.bulletPoints}>{job.description}</Text>
            </View>
          ))}
        </View>
  
        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {profile.education?.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.jobTitle}>{edu.school}</Text>
              <Text style={styles.companyName}>{edu.degree} - {edu.field_of_study}</Text>
              <Text style={styles.dateRange}>{edu.start_date} - {edu.end_date}</Text>
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
