import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';
import TopBar from '../topbar';

const StudentSetHomeLocation = () => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const route = useRoute();
  const { StudentID } = route.params;

  useEffect(() => {
    if (location) {
      setShowModal(true);
      setSuccessMessage('Location saved successfully!');
    }
  }, [location]);

  const closeSuccessModal = () => {
    setShowModal(false);
  };

  const getLocation = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Location permission not granted');
        setIsLoading(false);
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationData.coords;

      const apiUrl = 'http://127.0.0.1:5000/api/location_matches';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude,
          longitude,
          StudentID,
        }),
      });

      if (response.ok) {
        console.log('Location saved successfully');
        setLocation({ latitude, longitude });
      } else {
        console.error('Error saving location:', response.statusText);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopBar title="Set Location" />

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#448aff" />
        ) : (
          <>
            <Text style={styles.mainText}>Student Set Home Location</Text>
            {location && (
              <Text style={styles.mainText}>
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </Text>
            )}
            {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
            <TouchableOpacity
              style={styles.mainButton}
              onPress={getLocation}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>Set Home Location</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeSuccessModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{successMessage}</Text>
            <TouchableOpacity onPress={closeSuccessModal}>
              <Text style={{ color: '#0056b3', textAlign: 'center' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainButton: {
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successMessage: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainText: {
    fontSize: 20,
    marginBottom: 10,
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default StudentSetHomeLocation;
