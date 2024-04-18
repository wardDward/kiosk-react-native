import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useEffect} from 'react';

const QueueScreen = ({navigation, route}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnBoardScreen');
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 40,
          flexDirection: 'column',
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{height: 200, width: 200}}
        />
        <View>
          <Text style={{color: 'gold', fontSize: 20, fontWeight: '600'}}>
            Thank You! Please get your receipt
          </Text>
          <Text style={{color: 'gold', fontSize: 20, fontWeight: '600'}}>
            and wait for your number to be called
          </Text>
          <View>
            <Text
              style={{
                color: 'gold',
                fontSize: 25,
                fontWeight: '600',
                marginTop: 25,
                marginBottom: 30,
                textAlign: 'center',
              }}>
              Your Order number is
            </Text>
            <Text
              style={{
                color: 'gold',
                fontSize: 80,
                fontWeight: '600',
                textAlign: 'center',
              }}>
                {route.params.queueNumber}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QueueScreen;
