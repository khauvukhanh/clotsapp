import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const menuOptions = [
  {id: '1', title: 'Address'},
  {id: '2', title: 'Wishlist'},
  {id: '4', title: 'Help'},
  {id: '5', title: 'Support'},
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {logout} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/icons/avatar.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <View style={styles.profileHeader}>
            <View>
              <Text style={styles.profileName}>Gilbert Jones</Text>
              <Text style={styles.profileEmail}>Gilbertjones001@gmail.com</Text>
              <Text style={styles.profilePhone}>121-224-7890</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Menu List */}
      <FlatList
        data={menuOptions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>{item.title}</Text>
            <Icon name="chevron-right" size={24} color="#666666" />
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.signOutButton} onPress={logout}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  profileImage: {width: 80, height: 80, borderRadius: 40, marginBottom: 32},
  profileInfo: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 16,
    borderRadius: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {fontSize: 18, fontWeight: 'bold'},
  profileEmail: {fontSize: 14, color: 'gray', marginTop: 4},
  profilePhone: {fontSize: 14, color: 'gray', marginBottom: 6},
  editText: {color: '#8E6CEF', fontSize: 14, fontWeight: '600'},
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
  },
  menuText: {fontSize: 16},
  signOutButton: {
    alignItems: 'center',
    marginTop: 32,
    padding: 16,
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
    borderRadius: 10,
  },
  signOutText: {color: 'red', fontSize: 16, fontWeight: 'bold'},
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
});

export default ProfileScreen;
