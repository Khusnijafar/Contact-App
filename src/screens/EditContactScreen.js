import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

const EditContactScreen = ({route, navigation}) => {
  const {contact} = route.params;
  const [formData, setFormData] = useState({
    firstName: contact.firstName,
    lastName: contact.lastName,
    age: contact.age.toString(),
    photo: contact.photo,
  });

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateContact = async () => {
    try {
      const response = await axios.put(
        `https://contact.herokuapp.com/contact/${contact.id}`,
        formData,
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Contact updated successfully', [
          {text: 'OK', onPress: () => navigation.navigate('Home')},
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update contact');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={formData.firstName}
        onChangeText={text => handleInputChange('firstName', text)}
        placeholder="Enter first name"
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={formData.lastName}
        onChangeText={text => handleInputChange('lastName', text)}
        placeholder="Enter last name"
      />
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={formData.age}
        onChangeText={text => handleInputChange('age', text)}
        placeholder="Enter age"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={updateContact}>
        <Text style={styles.buttonText}>Update Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginBottom: 20,
    padding: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditContactScreen;
