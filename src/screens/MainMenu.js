import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import MainMenuItem from './MainMenuItem';
import Burgers from '../components/Burgers';
import Drinks from '../components/Drinks';
import Fries from '../components/Fries';

const MainMenu = ({navigation}) => {
  const {height} = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState('tab1');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Burgers':
        return <Burgers navigation={navigation} />;
      case 'Fries':
        return <Fries navigation={navigation} />;
      case 'Drinks':
        return <Drinks navigation={navigation} />;
      default:
        return null;
    }
  };
  return (
    <>
      <SafeAreaView
        style={{flex: 1, flexDirection: 'row', backgroundColor: 'black'}}>
        <ScrollView
          style={{
            width: '20%',
            paddingTop: 20,
            borderRightWidth: 1,
            borderColor: 'white',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/logo.png')}
              style={{height: 100, width: 100}}
            />
            <Text
              style={{
                color: '#fff',
                marginVertical: 10,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Menus
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedTab('Burgers')}
              style={{
                width: '70%',
                marginVertical: 3,
                borderWidth: 1,
                borderColor: 'gray',
                backgroundColor: 'white',
                height: height / 6,
                borderRadius: 15,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  style={{height: 100, width: 100}}
                  source={require('../assets/menuBurger.png')}
                />
                <Text
                  style={{
                    marginTop: 4,
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: 600,
                  }}>
                  Burgers
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedTab('Fries')}
              style={{
                width: '70%',
                marginVertical: 3,
                borderWidth: 1,
                borderColor: 'gray',
                backgroundColor: 'white',
                height: height / 6,
                borderRadius: 15,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  style={{height: 80, width: 120}}
                  source={require('../assets/menuFries.png')}
                />
                <Text
                  style={{
                    marginTop: 4,
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: 600,
                  }}>
                  Fries
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedTab('Drinks')}
              style={{
                width: '70%',
                marginVertical: 3,
                borderWidth: 1,
                borderColor: 'gray',
                backgroundColor: 'white',
                height: height / 6,
                borderRadius: 15,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  style={{height: 90, width: 90}}
                  source={require('../assets/can-cola.png')}
                />
                <Text
                  style={{
                    marginTop: 4,
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: 600,
                  }}>
                  Drinks
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView
          style={{width: '60%', marginVertical: 10, backgroundColor: 'black'}}>
          {/* <MainMenuItem navigation={navigation}/> */}
          {renderContent()}
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderTopColor: 'lightgray',
          backgroundColor: 'white ',
          borderTopWidth: 1,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Your Order - Dine In
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black'}}> Total PHP: 150</Text>
          <TouchableOpacity>
            <Text style={{fontSize: 17, fontWeight: 500, color: 'black'}}>
              View Your Order {' >>>'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MainMenu;
