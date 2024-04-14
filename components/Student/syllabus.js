import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';

export default function TrackSyllabus({ route }) {
  const [testDetails, setTestDetails] = useState([]);
  const { StudentID } = route.params;
  console.log(StudentID);

  const fetchData = () => {
    fetch(`http://127.0.0.1:5000/syllabus/display?studentId=${StudentID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('API Response:', responseData);
        setTestDetails(responseData);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
      });
  };

  useEffect(() => {
    if (StudentID) {
      fetchData(StudentID);
    }
  }, [StudentID]);

  return (
    <ScrollView contentContainerStyle = {styles.container}>
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>Subject Topics</Text>
      <Text style={styles.headerText}>Student ID</Text>
      <Text style={styles.headerText}>Tutor ID</Text>
      <Text style={styles.headerText}>Subject Name</Text>
    </View>  
      {testDetails.map((test, index) => (
        <View key={index} style={styles.studentRow}>
          <Text style={styles.studentData}> {test.subject_topics}</Text>
          <Text style={styles.studentData}> {test.student_id}</Text>
          <Text style={styles.studentData}> {test.tutor_id}</Text>
          <Text style={styles.studentData}> {test.subject_name}</Text>
        </View>
      ))}
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  studentData: {
    flex: 1,
    fontSize: 16,
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'spacebetween',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
