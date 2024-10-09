import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 40, 
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1,
  },
  header: {
    position: 'absolute', 
    top: 10,
    right: 40,
    fontSize: 8,
    color: '#888',
    textAlign: 'right',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  resumeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2, 
  },
  contactDetails: {
    fontSize: 10,
    color: '#333',
    marginBottom: 2,
  },
  profilePicture: {
    width: 80,
    height: 80,
  },
  section: {
    marginTop: 5, 
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5, 
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    borderBottomStyle: 'solid',
    paddingBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#555',
  },
  dateRange: {
    fontSize: 10,
    textAlign: 'right',
    color: '#666',
  },
  bulletPoints: {
    marginLeft: 15,
    fontSize: 10,
    color: '#444',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#888',
  },
  pageNumber: {
    fontSize: 10,
    color: '#888',
  },
});

export default styles;
