// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, firestore } from '../firebaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');

  const handleRegister = () => {
    if (email === '' || password === '' || name === '') {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Add user profile to Firestore
        return firestore.collection('users').doc(userCredential.user.uid).set({
          name,
          email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      })
      .then(() => {
        Alert.alert("Success", "Registration successful!");
        navigation.navigate('Profile');
      })
      .catch(error => {
        Alert.alert("Registration Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5 },
});

export default RegisterScreen;

