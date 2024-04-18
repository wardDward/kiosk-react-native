import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Modal,
} from 'react-native';
import {
  getBurgers,
  getFries,
  getDrinks,
  getSandwiches,
  getPizzas,
} from '../../store/features/productSlice';
import {useDispatch, useSelector} from 'react-redux';
import {calculatePrice, diningStyle} from '../../store/features/orderSlice';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Burgers from '../../components/cashier/Burgers';
import Drinks from '../../components/cashier/Drinks';
import Fries from '../../components/cashier/Fries';
import Pizzas from '../../components/cashier/Pizzas';
import Sandwiches from '../../components/cashier/Sandwiches';
import Entypo from 'react-native-vector-icons/Entypo';

const WalkIn = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const {burgers, fries, drinks, pizzas, sandwiches} = useSelector(state => state.product);
  const {total_price, type} = useSelector(state => state.order);

  const getCalculate = () => {
    dispatch(calculatePrice());
  };
  useEffect(() => {
    getCalculate();
  });

  const getAllBurgers = async () => {
    try {
      const response = await axios.get(
        'http://192.168.100.7:5000/api/products/burgers',
      );
      dispatch(getBurgers(response.data)); // Dispatching the action
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getAllFries = async () => {
    try {
      const response = await axios.get(
        'http://192.168.100.7:5000/api/products/fries',
      );
      dispatch(getFries(response.data)); // Dispatching the action
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getAllDrinks = async () => {
    try {
      const response = await axios.get(
        'http://192.168.100.7:5000/api/products/drinks',
      );
      dispatch(getDrinks(response.data)); // Dispatching the action
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getAllPizzas = async () => {
    try {
      const response = await axios.get(
        'http://192.168.100.7:5000/api/products/pizzas',
      );
      dispatch(getPizzas(response.data)); // Dispatching the action
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getAllSandwiches = async () => {
    try {
      const response = await axios.get(
        'http://192.168.100.7:5000/api/products/sandwiches',
      );
      dispatch(getSandwiches(response.data)); // Dispatching the action
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const burgerButton = () => {
    setSelectedTab('Burgers');
    getAllBurgers();
  };

  const friesButton = () => {
    setSelectedTab('Fries');
    getAllFries();
  };

  const drinksButton = () => {
    setSelectedTab('Drinks');
    getAllDrinks();
  };

  const pizzasButton = () => {
    setSelectedTab('Pizzas');
    getAllPizzas();
  };
  const sandwichesButton = () => {
    setSelectedTab('Sandwiches');
    getAllSandwiches();
  };

  const [showAlert, setShowAlert] = useState(false);
  const [selectedTab, setSelectedTab] = useState('');
  const renderContent = () => {
    switch (selectedTab) {
      case 'Burgers':
        return <Burgers navigation={navigation} burgers={burgers} />;
      case 'Fries':
        return <Fries navigation={navigation} fries={fries} />;
      case 'Drinks':
        return <Drinks navigation={navigation} drinks={drinks} />;
      case 'Pizzas':
        return <Pizzas navigation={navigation} pizzas={pizzas} />;
      case 'Sandwiches':
        return <Sandwiches navigation={navigation} sandwiches={sandwiches} />;
      default:
        return null;
    }
  };
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const chooseType = style => {
    dispatch(diningStyle(style)); // Dispatch the diningStyle action
  };

  const dineIn = () => {
    chooseType('Dine-in');
    setShowAlert(false);
  };

  const takeOut = () => {
    chooseType('take-out');
    setShowAlert(false);
  };

  const CustomAlert = () => {
    const {height, width} = useWindowDimensions();
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAlert}
        onRequestClose={handleCloseAlert}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              height: height * 0.2,
              paddingHorizontal: 10,
              width: width * 0.9,
              backgroundColor: 'white',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 5,
            }}>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 18}}>
              Dining Style
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 6,
              }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: 'green',
                  borderRadius: 5,
                }}
                onPress={() => dineIn()}>
                <Text
                  style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                  Dine In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: 'red',
                  borderRadius: 5,
                }}
                onPress={() => takeOut()}>
                <Text
                  style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                  Take Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <>
      <SafeAreaView
        style={{flex: 1, flexDirection: 'row', backgroundColor: 'black'}}>
        <ScrollView
          style={{
            width: width * 0.2,
            paddingTop: 20,
            borderRightWidth: 1,
            borderColor: 'white',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/logo.png')}
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
              onPress={() => burgerButton()}
              style={{
                width: width * 0.28,
                height: height / 6,
                marginVertical: 3,
                borderWidth: 1,
                borderColor: 'gray',
                backgroundColor: 'white',
                borderRadius: 15,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  style={{height: 80, width: 100}}
                  source={require('../../assets/menuBurger.png')}
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
              onPress={() => friesButton()}
              style={{
                width: width * 0.28,
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
                  style={{height: 80, width: 90}}
                  source={require('../../assets/menuFries.png')}
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
              onPress={() => sandwichesButton()}
              style={{
                width: width * 0.28,
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
                  source={require('../../assets/sandwich2.png')}
                />
                <Text
                  style={{
                    marginTop: 4,
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: 600,
                  }}>
                  Sandwich
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pizzasButton()}
              style={{
                width: width * 0.28,
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
                  source={require('../../assets/pizza1.png')}
                />
                <Text
                  style={{
                    marginTop: 4,
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: 600,
                  }}>
                  Pizzas
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => drinksButton()}
              style={{
                width: width * 0.28,
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
                  source={require('../../assets/can-cola.png')}
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
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderTopColor: 'lightgray',
          backgroundColor: 'white',
          borderTopWidth: 1,
        }}>
        {type !== '' ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10,
                color: 'black',
              }}>
              Customer Order -
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10,
                color: 'black',
                marginLeft: 4,
              }}>
              {type}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={{paddingTop: 5, paddingBottom: 15}}
            onPress={() => handleShowAlert()}>
            <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold'}}>
              Choose Dining Style (Tap Here)
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '500'}}>
            Total PHP: {total_price}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CashierViewOrder')}
            style={{
              backgroundColor: '#0FFF50',
              padding: 10,
              borderRadius: 50,
              paddingHorizontal: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="shopping-cart" size={20} color="black" />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'black',
                  marginLeft: 5,
                }}>
                View Your Order
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <CustomAlert />
    </>
  );
};

export default WalkIn;
