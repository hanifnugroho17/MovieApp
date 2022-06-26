import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const Button1 = ({Name, onPress}) => {
  return (
    <TouchableOpacity style={styles.Button} onPress={onPress}>
      <Icon name={Name} size={15} color={'#000'}></Icon>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default Button1;
