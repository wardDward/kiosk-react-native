import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/logo.png')} style={{width: 800, height: 700}}/>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('DiningLocation')}>
        <Text
          style={{
            paddingVertical: 15,
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'red',
            fontSize: 18,
            fontWeight: 500,
          }}>
          {' '}
          Touch To Start
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({});
