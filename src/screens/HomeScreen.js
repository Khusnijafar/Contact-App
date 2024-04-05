import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';

const defaultImage = 'https://via.placeholder.com/80';

const HomeScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    setIsRefreshing(true);
    try {
      const response = await axios.get('https://contact.herokuapp.com/contact');
      setContacts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setIsRefreshing(false);
  };

  const renderImage = photo => ({uri: photo || defaultImage});

  const handleSearch = text => {
    setSearchTerm(text);
  };

  const getSectionData = data => {
    const grouped = data.reduce((obj, item) => {
      const firstLetter = item.firstName[0].toUpperCase();
      const index = isNaN(parseInt(firstLetter)) ? firstLetter : '#';
      if (!obj[index]) {
        obj[index] = [];
      }
      obj[index].push(item);
      return obj;
    }, {});

    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      if (a === '#') return -1;
      if (b === '#') return 1;
      return a.localeCompare(b);
    });

    return sortedKeys.map(key => ({title: key, data: grouped[key]}));
  };

  const sectionedContacts = getSectionData(
    contacts.filter(contact =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    ),
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#4a90e2"
          testID="loading-indicator"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Contacts..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <SectionList
        sections={sectionedContacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image source={renderImage(item.photo)} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.detail}>Age: {item.age}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() =>
                  navigation.navigate('ContactDetails', {id: item.id})
                }>
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        onRefresh={fetchContacts}
        refreshing={isRefreshing}
      />
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => navigation.navigate('AddContact')}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  viewButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
});

export default HomeScreen;
