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
    color?: string;
  };
  rightButton?: {
    text: string;
    onPress: () => void;
    textStyle?: any;
  };
}

const BackHeader = ({ title, rightIcon, rightButton }: BackHeaderProps) => {
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
      <View style={styles.rightContainer}>
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
              <Icon 
                name={rightIcon.name} 
                size={24} 
                color={rightIcon.color || '#333'} 
              />
              {rightIcon.badgeCount ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {rightIcon.badgeCount > 99 ? '99+' : rightIcon.badgeCount}
                  </Text>
                </View>
              ) : null}
            </Animated.View>
          </TouchableOpacity>
        ) : rightButton ? (
          <TouchableOpacity
            style={styles.rightTextButton}
            onPress={rightButton.onPress}
          >
            <Text style={[styles.rightButtonText, rightButton.textStyle]}>
              {rightButton.text}
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  rightContainer: {
    width: 40,
    height: 40,
  },
  rightButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  rightTextButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  rightButtonText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '500',
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