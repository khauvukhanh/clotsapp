import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/search.png')} style={styles.icon} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="gray"
        style={styles.input}
        returnKeyType="search"
        autoComplete="off"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});

export default SearchBar;
