import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from react-navigation/native

// Import images using require
const background = require('../assets/images/trphoto2.png');
const usernameIcon = require('../assets/images/user.png');
const passwordIcon = require('../assets/images/password.png');

const TutorLoginPage = () => {
  const navigation = useNavigation(); // Get the navigation object

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Send a POST request to your backend server to handle the login
    fetch('http://127.0.0.1:5000/api/tutor/tlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login successful') {
          // Log the email of the logged-in user
          console.log('Logged in as:', data.TutorID);
  
          // Redirect to the authenticated user's dashboard or perform other actions
          console.log('Login successful');
          navigation.navigate('TutorHomeScreen',{
            TutorID: data.TutorID,
          }); // Navigate to TutorHomeScreen
        } else {
          // Handle invalid credentials
          console.log('Invalid credentials');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  return (
    <View style={styles.container}>
      <Image source={background} style={styles.trphoto2} />
      <Text style={styles.title}>Tutor Login</Text>
      <View style={styles.inputContainer}>
        <Image source={usernameIcon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
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
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
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
});

export default TutorLoginPage;
