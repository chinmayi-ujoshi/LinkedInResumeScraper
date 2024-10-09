
import { StyleSheet  } from "@react-pdf/renderer";



const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1,
  },
  header: {
    position: 'absolute',
    top: 10,
    right: 40,
    fontSize: 12,
    color: '#888'
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  resumeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactDetails: {
    fontSize: 10,
    color: '#333',
    marginBottom: 3,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    objectFit: 'cover',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    borderBottomStyle: 'solid',
    paddingBottom: 3,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
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
