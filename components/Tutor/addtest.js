import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, Pressable, Picker } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TutorAddTest() {
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [date, setDate] = useState('');
    const [marks, setMarks] = useState('');
    const [maxMarks, setMaxMarks] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { TutorID, studentId } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');

    const showModal = (text) => {
        setModalText(text);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleAddTest = () => {
        if (!topic || !date || !marks || !maxMarks) {
            showModal('Validation Error', 'All fields are required.');
            return;
        }

        fetch('http://127.0.0.1:5000/api/tests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic,
                date,
                marks,
                maxMarks,
                subject_name: subject,
                studentId,
                TutorID,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // You can handle the response data if needed
            })
            .then(() => {
                // Handle success here, e.g., show a success message or navigate
                showModal('Test added Successfully', 'Test added successfully');
            })
            .catch((error) => {
                console.error('Error adding test:', error);
                showModal('Error adding test', 'Failed to add the test. Please try again.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Test</Text>
           
            <Picker
        selectedValue={subject}
        style={styles.picker}
        onValueChange={(itemValue) => setSubject(itemValue)}
      >
        <Picker.Item label="Math" value="Math" />
        <Picker.Item label="Science" value="Science" />
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Hindi" value="Hindi" />
        <Picker.Item label="Kannada" value="Kannada" />
        <Picker.Item label="Social Science" value="Social Science" />
      </Picker>

            <TextInput
                style={styles.input}
                placeholder="Test Topic"
                onChangeText={(text) => setTopic(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date (e.g., YYYY/MM/DD)"
                onChangeText={(text) => setDate(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Marks Scored"
                onChangeText={(text) => setMarks(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Max Marks"
                onChangeText={(text) => setMaxMarks(text)}
            />
            <Button
                title="Submit Test"
                onPress={handleAddTest}
                style={styles.button}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalText}</Text>
                        <Pressable onPress={hideModal}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
      },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    button: {
        width: '80%',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalButtonText: {
        color: '#0056b3',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
