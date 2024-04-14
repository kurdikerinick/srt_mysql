import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';

export default function MonitorTests({ route }) {
  const [testDetails, setTestDetails] = useState([]);
  const {StudentID} = route.params;
console.log(StudentID);
  const fetchData = () => {
    fetch(`http://127.0.0.1:5000/api/tests/display?studentId=${StudentID}`)
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
    const { StudentID } = route.params;
    if (StudentID) {
      fetchData(StudentID);
    }
  }, [StudentID]);

  return (
    <ScrollView contentContainerStyle = {styles.container}>
    <View style={styles.headerRow}>
      <Text style={[styles.headerText, styles.widerField]}>Name</Text>
      <Text style={[styles.headerText, styles.widerField]}>Date</Text>
      <Text style={[styles.headerText, styles.widerField]}>Marks</Text>
      <Text style={[styles.headerText, styles.widerField]}>Max</Text>
      <Text style={[styles.headerText, styles.widerField]}>Subject</Text>
     </View>
      {testDetails.map((test, index) => (
        <View key={index} style={styles.studentRow}>
        <Text style={[styles.studentData, styles.widerField]}> {test.test_topic}</Text>
        <Text style={[styles.studentData, styles.widerField]}> {formatDate(test.test_date)}</Text>
        <Text style={[styles.studentData, styles.widerField]}> {test.marks}</Text>
        <Text style={[styles.studentData, styles.widerField]}> {test.maximum_marks}</Text>
        <Text style={[styles.studentData,styles.widerField]}> {test.subject_name}</Text>
           </View>
      ))}
      
    </ScrollView>
  );
}
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Extracting only the date part
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  widerField: {
    flex: 3, // Adjust the flex property for wider fields
  },
});
