import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet }
  from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

// import styles from './styles';

export default function TaskList({ data, handleDelete }) {
  return (
    <Animatable.View
      style={styles.container}
      useNativeDriver
      animation="bounceIn"
      duration={1500}
    >
      <TouchableOpacity onPress={() => handleDelete(data)}>
        <Ionicons
          name="md-checkmark-circle"
          size={30}
          color="#EEEEEE"
        />
      </TouchableOpacity>

      <View>
        <Text style={styles.task}>{ data.task }</Text>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1DB863',
      borderRadius: 5,
      padding: 7,
      elevation: 1.5,
      shadowColor: '#EEEEEE',
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 1,
        height: 3
      }
    },
  
    task: {
      color: '#EEEEEE',
      fontSize: 19,
      paddingLeft: 8,
      paddingRight: 20
    }
  });
