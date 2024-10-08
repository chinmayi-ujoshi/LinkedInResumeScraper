import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import styles from './styles';

const ResumeDocument = ({ profile }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          <Text style={styles.resumeTitle}>{profile.full_name} Resume</Text>
        </View>

        {/* Main Content */}
        <View style={{ paddingTop: 30 }} > 
          {/* Header Content */}
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.name}>{profile.full_name}</Text>
              <Text style={styles.contactDetails}>{profile.occupation}</Text>
              <Text style={styles.contactDetails}>{profile.city}, {profile.state}, {profile.country_full_name}</Text>
            </View>
            {profile.profile_pic_base64 && (
              <Image
                style={styles.profilePicture}
                src={profile.profile_pic_base64}
              />
            )}
          </View>

          {/* Summary */}
          {profile.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text>{profile.summary}</Text> 
            </View>
          )}

          {/* Work Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {profile.experiences?.map((job, index) => (
              <View key={index} >
                <Text style={styles.jobTitle}>{job.title || ''}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.companyName}>{job.company || ''}</Text>
                  <Text style={styles.dateRange}>
                    {job.starts_at ? `${job.starts_at.month}/${job.starts_at.year}` : ''} - 
                    {job.ends_at ? `${job.ends_at.month}/${job.ends_at.year}` : 'Present'}
                  </Text>
                </View>
                <Text style={styles.bulletPoints}>{job.description || ''}</Text>
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {profile.education?.map((edu, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text style={styles.jobTitle}>{edu.school || ''}</Text>
                <Text style={styles.companyName}>{edu.degree_name ? `${edu.degree_name} - ${edu.field_of_study || ''}` : ''}</Text>
                <Text style={styles.dateRange}>
                  {edu.starts_at ? `${edu.starts_at.month}/${edu.starts_at.year}` : ''} - 
                  {edu.ends_at ? `${edu.ends_at.month}/${edu.ends_at.year}` : ''}
                </Text>
                <Text style={styles.bulletPoints}>{edu.description || ''}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>{currentDate}</Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  );
};

export default ResumeDocument;
