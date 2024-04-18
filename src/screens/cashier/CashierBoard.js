import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WalkIn from './WalkIn';
import Kiosk from './Kiosk';

const CashierBoard = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Walk-In');
  const renderContent = () => {
    switch (selectedTab) {
      case 'Walk-In':
        return <WalkIn navigation={navigation} />;
      case 'Kiosk':
        return <Kiosk navigation={navigation} />;
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => setSelectedTab('Walk-In')}
          style={{flex: 1, padding: 16, backgroundColor: '#292525'}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '500',
            }}>
            Walk In
          </Text>
        </TouchableOpacity>
        <View style={{borderWidth: 2, borderColor: 'white', height: '100%'}} />
        <TouchableOpacity
          onPress={() => setSelectedTab('Kiosk')}
          style={{flex: 1, padding: 16, backgroundColor: '#292525'}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '500',
            }}>
            Kiosk
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

export default CashierBoard;
