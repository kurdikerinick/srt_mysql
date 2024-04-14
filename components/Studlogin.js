import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Modal, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const background = require('../assets/images/trphoto2.png');
const usernameIcon = require('../assets/images/user.png');
const passwordIcon = require('../assets/images/password.png');

const StudentLoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const showModal = (text) => {
    setModalText(text);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const handleLogin = () => {
    fetch('http://127.0.0.1:5000/api/student/slogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        if (data.message === 'Login successful') {
          console.log('Login successful', data.StudentID);
          navigation.navigate('StudentHomeScreen', {
            StudentID: data.StudentID,
          });
          showModal('Login Successful. Welcome!');
        } else {
          console.log('Invalid credentials');
          showModal('Invalid Credentials. Please check your username and password.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={background} style={styles.trphoto2} />
      <Text style={styles.title}>Student Login</Text>
      <View style={styles.inputContainer}>
        <Image source={usernameIcon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#448aff"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={passwordIcon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#448aff"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword} onPress={handleForgotPasswordPress}>
        Forgot Password?
      </Text>
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
};

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendResetEmail = () => {
    fetch('http://127.0.0.1:5000/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Reset email response:', data);
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error sending reset email:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Forgot Password Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Send Reset Email" onPress={handleSendResetEmail} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trphoto2: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    color: '#448aff', // Blue color
    fontSize: 24,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#448aff', // Blue color
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#448aff', // Blue color
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  forgotPassword: {
    marginTop: 10,
    color: '#448aff', // Blue color
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
    fontSize: 18,
    marginBottom: 10,
  },
});
export default StudentLoginPage;
export { StudentLoginPage, ForgotPasswordScreen };

