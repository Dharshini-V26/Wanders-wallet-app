// src/screens/LoanRequestScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firestore, auth } from '../firebaseConfig';

const LoanRequestScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');

  const handleRequestLoan = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }

    // Example validation: Maximum loan amount is 1000
    if (numericAmount > 1000) {
      Alert.alert("Amount Exceeded", "You cannot request more than $1000.");
      return;
    }

    // Submit loan request to Firestore
    firestore.collection('loanRequests').add({
      userId: auth.currentUser.uid,
      amount: numericAmount,
      status: 'Pending',
      requestedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      Alert.alert("Success", "Loan request submitted successfully!");
      navigation.navigate('Profile');
    })
    .catch(error => {
      Alert.alert("Error", error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a Loan</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Submit Request" onPress={handleRequestLoan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 },
});

export default LoanRequestScreen;
