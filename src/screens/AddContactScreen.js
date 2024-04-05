import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const AddContactScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');

  const postContact = async contactData => {
    try {
      const response = await axios.post(
        'https://contact.herokuapp.com/contact',
        contactData,
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Contact added successfully');
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          `Failed to create contact: ${
            response.data.message || 'An error occurred'
          }`,
        );
      }
    } catch (error) {
      let errorMessage = 'Failed to add contact';
      if (error.response) {
        errorMessage =
          error.response.data.message ||
          `Error ${error.response.status}: Failed to add contact`;
      } else if (error.request) {
        errorMessage = 'No response from server';
      } else {
        errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    }
  };

  const handleAddContact = async () => {
    if (!firstName || !lastName || !age || !photo) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const contactData = {
      firstName,
      lastName,
      age: parseInt(age, 10),
      photo,
    };

    await postContact(contactData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Enter age"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Photo URL</Text>
      <TextInput
        style={styles.input}
        value={photo}
        onChangeText={setPhoto}
        placeholder="Enter photo URL"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddContact}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddContactScreen;
