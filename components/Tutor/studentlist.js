import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StudentListScreen({ route }) {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const { TutorID } = route.params;

  // Add this line to log the TutorID
const fetchData = () => {
  fetch(`http://127.0.0.1:5000/assignments?TutorID=${TutorID}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((responseData) => {
      // Log the response data
      console.log('API Response:', responseData);
      setData(responseData);
    })
    .catch((error) => {
      // Log the error
      console.error('Error fetching data:', error);
    });
};

// Later in your code, you can call fetchData when needed, for example, inside an event handler or useEffect:

useEffect(() => {
  if (TutorID) {
    fetchData();
  }
}, [TutorID]);

  
  const handleStudentClick = (studentId) => {
    navigation.navigate('StudMenuScreen', { studentId, TutorID });
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>stud_id</Text>
        <Text style={styles.headerText}>name</Text>
        <Text style={styles.headerText}>update</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.studentRow}>
          <Text style={styles.studentData}>{item.student_id}</Text>
          <Text style={styles.studentData}>{item.stud_name}</Text>
          <Button
            title="Click"
            onPress={() => handleStudentClick(item.student_id)}
            style={styles.button}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'spacebetween',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  studentData: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#448aff',
    borderRadius: 10,
    padding: 10,
    minWidth: 80,
  },
});
