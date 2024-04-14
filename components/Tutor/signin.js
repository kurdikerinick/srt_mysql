import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as Location from 'expo-location';
import TopBar from '../topbar';
import { useRoute } from '@react-navigation/native';

const SignIn = ({ navigation }) => {
  const route = useRoute();
  const [studentId, setStudentId] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { TutorID } = route.params;
  const [signInTimestamp, setSignInTimestamp] = useState(null);
  const [signOutTimestamp, setSignOutTimestamp] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setModalText(
          'Location Permission Denied. Please grant location permission to check your location.'
        );
        setModalVisible(true);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { coords } = location;

      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      setModalText('Error fetching location. Please try again.');
      setModalVisible(true);
    }
  };

  const handleSignIn = async () => {
    if (studentId.trim() === '') {
      setModalText('Invalid Input. Please enter a valid student ID.');
      setModalVisible(true);
    } else {
      const apiUrl = 'http://127.0.0.1:5000/api/location_matches/match';
      const newSignInTimestamp = new Date().toISOString();
      setSignInTimestamp(newSignInTimestamp);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          TutorID,
          latitude,
          longitude,
          sign_in_timestamp: newSignInTimestamp,
        }),
      });

      if (response.ok) {
        setModalText(
          `Sign In Successful with Student ID: ${studentId} and Tutor ID: ${TutorID}`
        );
        setModalVisible(true);
      } else {
        setModalText('Sign In Error. An error occurred while signing in.');
        setModalVisible(true);
      }
    }
  };

  const handleSignOut = async () => {
    if (!signInTimestamp) {
      setModalText('Error. You must sign in first before signing out.');
      setModalVisible(true);
      return;
    }

    // ... (your existing code for sign out)

    if (response.ok) {
      setModalText(
        `Sign Out Successful with Student ID: ${studentId}`
      );
      setModalVisible(true);
    } else {
      setModalText('Sign Out Error. An error occurred while signing out.');
      setModalVisible(true);
    }
  };

  const handleAbsent = async () => {
    // ... (your existing code for marking absent)

    if (response.ok) {
      setModalText(`Student Marked Absent with Student ID: ${studentId}`);
      setModalVisible(true);
    } else {
      setModalText(
        'Absent Marking Error. An error occurred while marking student absent.'
      );
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TopBar title="Set Location" />
      <View style={styles.container1}>
        <Text style={styles.title}>Student Sign In</Text>
        <Text style={styles.locationText}>
          Latitude: {latitude}, Longitude: {longitude}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Student ID"
          onChangeText={(text) => setStudentId(text)}
          value={studentId}
          keyboardType="numeric"
        />
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Sign Out" onPress={handleSignOut} />
        <Button title="Absent" onPress={handleAbsent} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalText}</Text>
              <Pressable onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Button: {
    color: '#0058a3',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default SignIn;
