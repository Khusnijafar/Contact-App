import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ContactDetailsScreen from './src/screens/ContactDetailsScreen';
import AddContactScreen from './src/screens/AddContactScreen';
import EditContactScreen from './src/screens/EditContactScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Contacts List'}}
        />
        <Stack.Screen
          name="ContactDetails"
          component={ContactDetailsScreen}
          options={({route}) => ({
            title: route.params.contact
              ? `${route.params.contact.firstName} ${route.params.contact.lastName}`
              : 'Contact Details',
          })}
        />
        <Stack.Screen
          name="AddContact"
          component={AddContactScreen}
          options={{title: 'Add New Contact'}}
        />
        <Stack.Screen
          name="EditContact"
          component={EditContactScreen}
          options={{title: 'Edit Contact'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
