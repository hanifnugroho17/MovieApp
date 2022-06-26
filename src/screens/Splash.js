import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  });
  return (
    <View style={styles.Container}>
      <View style={styles.Image}>
        <Image
          style={styles.Logo}
          source={require('../assets/Logo.png')}></Image>
      </View>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Text style={styles.AppName}>Movie App</Text>
      <Text style={styles.MyName}> By Jati Corp </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 0.8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  AppName: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#000',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  Image: {
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    paddingVertical: 50,
    borderRadius: 50,
    alignItems: 'center',
  },
  Logo: {
    width: 150,
    height: 150,
  },
  MyName: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 50,
    color: '#666666',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
});

export default Splash;
