import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import styles from './styles';


const ResumeDocument = ({ profile }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.resumeTitle}>{profile.full_name} Resume</Text>
        </View>

        {/* Main Content */}
        <View style={{ paddingTop: 20 }}>
          {/*Header*/}
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.bulletPoints}>{profile.summary}</Text>
          </View>

          {/* Work Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {profile.experiences?.map((job, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <View >
                  <Text style={styles.companyName}>{job.company}</Text>
                  <Text style={styles.dateRange}>
                    {`${job.starts_at.month}/${job.starts_at.year}`} - {job.ends_at ? `${job.ends_at.month}/${job.ends_at.year}` : 'Present'}
                  </Text>
                </View>
                <Text style={styles.bulletPoints}>{job.description}</Text>
              </View>
            ))}
          </View>

          {/* Education */}
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
