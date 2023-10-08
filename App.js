import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data && data.length > 0) {
        setContacts(data); 
        console.log(data);
      } else {
        console.log('No contacts found.');
      }
    }
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={contacts}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 && (<Text>{item.phoneNumbers[0].number}</Text>)}
          </View>
        )}
      />
      <View style={styles.button}>
        <Button color={'white'} title='Get Contacts' onPress={getContacts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 100,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
