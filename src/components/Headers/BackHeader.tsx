import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

interface BackHeaderProps {
  title: string;
  rightIcon?: {
    name: string;
    onPress: () => void;
    badgeCount?: number;
    animation?: Animated.Value;
  };
}

const BackHeader = ({ title, rightIcon }: BackHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {rightIcon ? (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={rightIcon.onPress}
        >
          <Animated.View style={[
            styles.iconContainer,
            rightIcon.animation && {
              transform: [{ scale: rightIcon.animation }]
            }
          ]}>
            <Icon name={rightIcon.name} size={24} color="#333" />
            {rightIcon.badgeCount ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {rightIcon.badgeCount > 99 ? '99+' : rightIcon.badgeCount}
                </Text>
              </View>
            ) : null}
          </Animated.View>
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rightButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#8E6CEF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BackHeader; 