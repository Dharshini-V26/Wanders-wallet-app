// src/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, firestore } from '../firebaseConfig';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore.collection('users').doc(auth.currentUser.uid)
      .onSnapshot(doc => {
        setUserData(doc.data());
      }, error => {
        console.error(error);
      });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigation.navigate('Login');
  };

  if (!userData) {
    return <ActivityIndicator size="large" style={{ flex:1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userData.name}!</Text>
      <Text>Email: {userData.email}</Text>
      {/* Add more profile details as needed */}
      <Button title="Request Loan" onPress={() => navigation.navigate('LoanRequest')} />
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
});

export default ProfileScreen;