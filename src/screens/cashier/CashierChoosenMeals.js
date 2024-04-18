import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  Modal,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../store/features/orderSlice';
import axios from 'axios';
import {getDrinks} from '../../store/features/productSlice';
import burger1 from '../../assets/burgers/burger1.png';
import burger2 from '../../assets/burgers/burger2.png';
import burger3 from '../../assets/burgers/burger3.png';
import burger4 from '../../assets/burgers/burger4.png';
import burger5 from '../../assets/burgers/burger5.png';
import burger6 from '../../assets/burgers/burger6.png';
import burger7 from '../../assets/burgers/burger7.png';
import burger8 from '../../assets/burgers/burger8.png';
import burger9 from '../../assets/burgers/burger9.png';
import friesImage1 from '../../assets/fries/fries1.png';
import friesImage2 from '../../assets/fries/fries2.png';
import friesImage3 from '../../assets/fries/fries3.png';
import friesImage4 from '../../assets/fries/fries4.png';
import friesImage5 from '../../assets/fries/fries5.png';
import friesImage6 from '../../assets/fries/fries6.png';
import drinksImage1 from '../../assets/drinks/drinks1.png';
import drinksImage2 from '../../assets/drinks/drinks2.png';
import drinksImage3 from '../../assets/drinks/drinks3.png';

import pizza1 from '../../assets/pizza/pizza1.png';
import pizza2 from '../../assets/pizza/pizza2.png';
import pizza3 from '../../assets/pizza/pizza3.png';
import pizza4 from '../../assets/pizza/pizza4.png';

import sandwich1 from '../../assets/sandwich/sandwich1.png';
import sandwich2 from '../../assets/sandwich/sandwich2.png';

const ChoosenMeals = ({navigation, route}) => {
  const propsId = route.params.id;
  const propImg = route.params.image_path;
  console.log(route.params);

  const [selectedDrink, setSelectedDrink] = useState({});
  const [choosenMeal, setChoosenMeal] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const selectDrink = selected => {
    setSelectedDrink(selected);
    console.log(selectedDrink.image_path);
  };

  const {orders} = useSelector(state => state.order);
  const {drinks} = useSelector(state => state.product);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({meal: choosenMeal, drink: selectedDrink}));
    handleShowAlert();
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

  const getItemById = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.7:5000/api/products/${propsId}`,
      );
      setChoosenMeal(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getItemById();
    getAllDrinks();
  }, []);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigation.navigate('CashierBoard');
  };

  const CustomAlert = ({visible, onClose, message}) => {
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
              justifyContent: 'center',
              elevation: 5,
            }}>
            <Text
              style={{
                marginBottom: 20,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '500',
              }}>{`Your order ${choosenMeal.item_name} is added`}</Text>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: 0,
              }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: 'green',
                  borderRadius: 5,
                }}
                onPress={handleCloseAlert}>
                <Text
                  style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const imageMap = {
    '../assets/fries/fries1.png': friesImage1,
    '../assets/fries/fries2.png': friesImage2,
    '../assets/fries/fries3.png': friesImage3,
    '../assets/fries/fries4.png': friesImage4,
    '../assets/fries/fries5.png': friesImage5,
    '../assets/fries/fries6.png': friesImage6,
    '../assets/burgers/burgers1.png': burger1,
    '../assets/burgers/burgers2.png': burger2,
    '../assets/burgers/burger3.png': burger3,
    '../assets/burgers/burger4.png': burger4,
    '../assets/burgers/burger5.png': burger5,
    '../assets/burgers/burger6.png': burger6,
    '../assets/burgers/burger7.png': burger7,
    '../assets/burgers/burger8.png': burger8,
    '../assets/burgers/burger9.png': burger9,
    '../assets/drinks/drinks1.png': drinksImage1,
    '../assets/drinks/drinks2.png': drinksImage2,
    '../assets/drinks/drinks3.png': drinksImage3,
    '../assets/pizza/pizza1.png': pizza1,
    '../assets/pizza/pizza2.png': pizza2,
    '../assets/pizza/pizza3.png': pizza3,
    '../assets/pizza/pizza4.png': pizza4,
    '../assets/sandwich/sandwich1.png': sandwich1,
    '../assets/sandwich/sandwich2.png': sandwich2,
  };
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <ScrollView style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 50,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={imageMap[propImg]}
                style={{height: 100, width: 100}}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {choosenMeal.item_name}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'white', marginRight: 20}}>
                Item Price - {choosenMeal.price}
              </Text>
              <Text style={{color: 'white', marginRight: 20}}>
                Drinks Price - {selectedDrink.price}
              </Text>
              <Text style={{color: 'white', marginRight: 20}}>
                Total Price -{' '}
                {((choosenMeal && choosenMeal.price) || 0) +
                  ((selectedDrink && selectedDrink.price) || 0)}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 50,
                width: 50,
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                1
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Image
                source={imageMap[propImg]}
                style={{height: 100, width: 100}}
              />
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    color: 'white',
                  }}>
                  {choosenMeal.item_name}
                </Text>
                <Text style={{fontWeight: 500, color: 'red', fontSize: 14}}>
                  Price - {choosenMeal.price} php
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 50,
                width: 50,
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                2
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              {selectedDrink.image_path ? (
                <Image
                  source={imageMap[selectedDrink.image_path]}
                  style={{height: 100, width: 100}}
                />
              ) : (
                <Text style={{color: 'white'}}>No Drinks</Text>
              )}
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    color: 'white',
                  }}>
                  {selectedDrink.item_name}
                </Text>
                <Text style={{fontWeight: 500, color: 'red'}}>
                  {selectedDrink.price && (
                    <Text> {selectedDrink.price} - php</Text>
                  )}
                </Text>
              </View>
            </View>
          </View>

          <ScrollView style={{flex: 1, flexWrap: 'wrap', marginTop: 20}}>
            <Text style={{fontWeight: 500, color: 'white', marginVertical: 5}}>
              Choose your drink
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {drinks.map(drink => (
                <TouchableOpacity
                  key={drink.id}
                  onPress={() => selectDrink(drink)}
                  style={{
                    backgroundColor: 'red',
                    alignItems: 'center',
                    padding: 4,
                    backgroundColor: 'white',
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={imageMap[drink.image_path]}
                    style={{height: 100, width: 100}}
                  />
                  <Text style={{fontWeight: 500, color: 'black'}}>
                    {drink.item_name}
                  </Text>
                  <Text style={{fontWeight: 500, color: 'red'}}>
                    php - {drink.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 50,
          borderTopColor: 'lightgray',
          backgroundColor: 'white ',
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'red',
            flex: 1,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            flex: 1,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}>
          <Text
            style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
            onPress={() => handleAddToCart()}>
            Add Order
          </Text>
        </TouchableOpacity>
      </View>
      <CustomAlert
        visible={showAlert}
        onClose={handleCloseAlert}
        message={`${choosenMeal.item_name} is added`}
      />
    </>
  );
};

export default ChoosenMeals;
