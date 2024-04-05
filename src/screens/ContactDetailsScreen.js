import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const ContactDetailsScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://contact.herokuapp.com/contact/${id}`,
      );
      setContact(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const deleteContact = async () => {
    try {
      const response = await axios.delete(
        `https://contact.herokuapp.com/contact/${id}`,
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Contact deleted successfully', [
          {text: 'OK', onPress: () => navigation.navigate('Home')},
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete contact');
    }
  };

  const defaultImage = 'https://via.placeholder.com/150';

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {contact ? (
        <>
          <Image
            source={{uri: contact.photo || defaultImage}}
            style={styles.image}
          />
          <Text style={styles.name}>
            {contact.firstName} {contact.lastName}
          </Text>
          <Text style={styles.detail}>Age: {contact.age}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditContact', {contact})}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteContact}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  editButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    flexGrow: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    flexGrow: 1,
    marginLeft: 5,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ContactDetailsScreen;
