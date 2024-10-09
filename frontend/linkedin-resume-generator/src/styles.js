import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    width: 60, // Smaller width for the image
    height: 60, // Smaller height for the image
    borderRadius: 30, // Half of width/height for a circular appearance
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
  description: {
    fontSize: 10,
    marginTop: 5,
    marginLeft: 15,
  },
  listItem: {
    fontSize: 10,
    marginLeft: 15,
    marginBottom: 3,
  },
  skills: {
    fontSize: 10,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
    color: '#888',
  },
});

export default styles;
