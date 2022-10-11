import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Fire } from '../../config';
import { getData } from '../../Utils';
// import auth from '@react-native-firebase/auth';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      getData('user').then((res) => {
        if (res) {
          console.log('account google: ', res);
          navigation.replace('Home');
        } else {
          getData('email').then((res) => {
            // console.log('splash: ', res.login);
            if (res) {
              navigation.replace('Home');
            } else {
              navigation.navigate('Login');
            }
          });
        }
        // navigation.replace('Login');
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.constainer}>
      <Text style={styles.subtitle}>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  constainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  subtitle: { fontSize: 80, color: 'black' },
});
