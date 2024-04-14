import React from 'react';
// import { View as RNView } from 'react-native';
import LoginPage from './components/Loginpage.js'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import TutorLoginPage from './components/Tutorlogin.js';
// import StudentLoginPage from './components/Studlogin.js';
// import StudentSetHomeLocation from './components/Student/setlocation.js';
// import StudentHomeScreen from './components/Student/stud_home.js';
// import TutorHomeScreen from './components/Tutor/tutor_home.js';
// import StudentListScreen from './components/Tutor/studentlist.js';
// import SetSyllabusScreen from './components/Tutor/setsyllabus.js';
// import TutorAddTest from './components/Tutor/addtest.js';
// import StudMenuScreen from './components/Tutor/studmenu.js';
// import SignIn from './components/Tutor/signin.js';
// import MonitorTests from './components/Student/tests.js';
// import TrackSyllabus from './components/Student/syllabus.js';
// import AttendanceList from './components/Student/attendance.js';
// import TopBar from './components/topbar.js';
// import BottomBar from './components/Tutor/bottombar.js';
// import ForgotPasswordScreen from './components/Student/passwordreset.js';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
      <Stack.Screen name="LoginPage" component={LoginPage} />
        {/* <Stack.Screen name="StudentLoginPage" component={StudentLoginPage} />
       
        <Stack.Screen name="StudentSetHomeLocation" component={StudentSetHomeLocation} />
        <Stack.Screen name="StudentHomeScreen" component={StudentHomeScreen} />
        <Stack.Screen name="TutorLoginPage" component={TutorLoginPage} />
        <Stack.Screen name="TutorHomeScreen" component={TutorHomeScreen} />
        <Stack.Screen name="StudentListScreen" component={StudentListScreen} />
        <Stack.Screen name="SetSyllabusScreen" component={SetSyllabusScreen} />
        <Stack.Screen name="TutorAddTest" component={TutorAddTest} />
        <Stack.Screen name="StudMenuScreen" component={StudMenuScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="MonitorTests" component={MonitorTests} />
        <Stack.Screen name="TrackSyllabus" component={TrackSyllabus} />
        <Stack.Screen name="AttendanceList" component={AttendanceList} />
        <Stack.Screen name="TopBar" component={TopBar} />
        <Stack.Screen name="BottomBar" component={BottomBar} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
