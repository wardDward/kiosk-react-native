import {View, Text, SafeAreaView, ScrollView, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  calculatePrice,
  clearOrder,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from '../store/features/orderSlice';
import axios from 'axios';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';
import burger1 from '../assets/burgers/burger1.png';
import burger2 from '../assets/burgers/burger2.png';
import burger3 from '../assets/burgers/burger3.png';
import burger4 from '../assets/burgers/burger4.png';
import burger5 from '../assets/burgers/burger5.png';
import burger6 from '../assets/burgers/burger6.png';
import friesImage1 from '../assets/fries/fries1.png';
import friesImage2 from '../assets/fries/fries2.png';
import friesImage3 from '../assets/fries/fries3.png';
import drinksImage1 from '../assets/drinks/drinks1.png';
import drinksImage2 from '../assets/drinks/drinks2.png';
import drinksImage3 from '../assets/drinks/drinks3.png';

const ViewOrder = ({navigation}) => {
  const [orderId, setOrderId] = useState(null);
  const [queueNumber, setQueueNumber] = useState(null);
  const {orders, type, total_price} = useSelector(state => state.order);
  const dispatch = useDispatch();
  const getCalculate = () => {
    dispatch(calculatePrice());
  };
  useEffect(() => {
    getCalculate();
  });
  const addQuantity = item => {
    dispatch(incrementQuantity(item));
    console.log(orders);
  };

  const decQuantity = item => {
    dispatch(decrementQuantity(item));
    console.log(orders);
  };

  const removeItems = item => {
    dispatch(removeItem(item));
    console.log(orders);
  };

  const checkOut = async () => {
    // Check if the orders array is empty
    if (orders.length === 0) {
      Alert.alert('', 'You Dont have any order yet', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.100.7:5000/api/orders',
        {
          orders: orders,
          type: type,
          total_price: total_price,
        },
      );
      const {orderId, queueNumber} = response.data;
      setOrderId(orderId);
      setQueueNumber(queueNumber);
      printReceipt(orderId, queueNumber);
      dispatch(clearOrder());
      navigation.navigate('QueueScreen', {
        queueNumber: queueNumber,
      });
      Alert.alert('', 'Order Check Out Successful, Thank You :)', [
        {text: 'OK', onPress: () => navigation.navigate('DiningLocation')},
      ]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const printReceipt = async (orderId, queueNumber) => {
    try {
      const printRow = async (columns, aligns, values, options = {}) => {
        await BluetoothEscposPrinter.printColumn(
          columns,
          aligns,
          values,
          options,
        );
        await BluetoothEscposPrinter.printText('\n', {}); // Change line break to \n
      };

      // Print other header content as needed

      // Print items
      await printRow(
        [48],
        [BluetoothEscposPrinter.ALIGN.CENTER],
        ['Bratz Burger'],
        {
          widthtimes: 1,
        },
      );

      const formattedLine = `Order Id:${String(orderId).padEnd(
        10,
      )}Queue No#${queueNumber}`;
      await printRow(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        [formattedLine],
        {},
      );
      await printRow(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['====================='],
        {},
      );
      await printRow(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Ordered Items:'],
        {},
      );

      for (const order of orders) {
        const {meal, drink, quantity} = order;

        let formattedItem;
        let itemTotalPrice;

        if (meal && meal.item_name) {
          // Calculate total price for the meal
          const mealTotalPrice = meal.price * quantity;
          formattedItem = `${meal.item_name} (${quantity}x)`;
          itemTotalPrice = mealTotalPrice;
          if (drink && drink.item_name) {
            formattedItem += `\nwith ${drink.item_name}`; // Change line break to \n
          } else {
            formattedItem += `\n(No drink)`;
          }
        } else {
          formattedItem = `${drink.item_name} (${quantity}x)`;
          itemTotalPrice = drink.price * quantity;
        }

        const formattedPrice = `PHP ${itemTotalPrice.toString()}`; // Pad the price to ensure proper alignment
        const formattedLine = `${formattedItem.padEnd(20)} ${formattedPrice}`;

        await printRow(
          [48],
          [BluetoothEscposPrinter.ALIGN.LEFT],
          [formattedLine],
          {},
        );
      }

      await printRow(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['======================'],
        {},
      );

      // Print footer content and QR code as needed

      await BluetoothEscposPrinter.printText('\n\n\n', {}); // Change line break to \n
    } catch (e) {
      alert(e.message || 'ERROR');
    }
  };

  const cancelOrder = () => {
    Alert.alert('', 'Are you sure you wanted to cancel your order?', [
      {
        text: 'OK',
        onPress: () => {
          dispatch(clearOrder());
          navigation.goBack();
        },
      },
    ]);
  };

  const imageMap = {
    '../assets/fries/fries1.png': friesImage1,
    '../assets/fries/fries2.png': friesImage2,
    '../assets/fries/fries3.png': friesImage3,
    '../assets/burgers/burgers1.png': burger1,
    '../assets/burgers/burgers2.png': burger2,
    '../assets/burgers/burger3.png': burger3,
    '../assets/burgers/burger4.png': burger4,
    '../assets/burgers/burger5.png': burger5,
    '../assets/burgers/burger6.png': burger6,
    '../assets/drinks/drinks1.png': drinksImage1,
    '../assets/drinks/drinks2.png': drinksImage2,
    '../assets/drinks/drinks3.png': drinksImage3,
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#000', padding: 10}}>
        <View
          style={{
            width: '65%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="left" size={20} color="#fff" />
            <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
              Back
            </Text>
          </TouchableOpacity>
          <Image
            source={require('../assets/logo.png')}
            style={{height: 100, width: 100}}
          />
        </View>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Your Order
        </Text>
        <ScrollView style={{marginTop: 10}}>
          {orders.map(item => (
            <View
              key={item.meal.id || item.drink.id || item.id}
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Image
                  source={
                    imageMap[item.meal.image_path] ||
                    imageMap[item.drink.image_path]
                  }
                  style={{height: 100, width: 100}}
                />
                <View>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
                    {item.meal.item_name}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{color: 'white', marginRight: 5, fontSize: 12}}>
                      Quantity:
                    </Text>
                    <Text style={{color: 'white', fontSize: 12}}>
                      {item.quantity}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{color: 'white', marginRight: 5, fontSize: 12}}>
                      Drinks:
                    </Text>
                    <Text style={{color: 'white', fontSize: 12}}>
                      {item.drink?.item_name || 'No drink'}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{color: 'white', marginRight: 5, fontSize: 12}}>
                      Price:
                    </Text>
                    <Text style={{color: 'white', fontSize: 12}}>
                      <Text style={{color: 'white', fontSize: 12}}>
                        {((item.meal && item.meal.price ? item.meal.price : 0) +
                          (item.drink && !isNaN(item.drink.price)
                            ? item.drink.price
                            : 0)) *
                          item.quantity}
                        php
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => addQuantity(item)}>
                  <Entypo name="plus" size={30} color="green" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginHorizontal: 15}}
                  onPress={() => decQuantity(item)}>
                  <Entypo name="minus" size={30} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeItems(item)}>
                  <Entypo name="trash" size={25} color="yellow" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {orders.length === 0 ? (
            <Text
              style={{
                marginVertical: 50,
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: '500',
              }}>
              No Order Yet
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => cancelOrder()}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 13,
                backgroundColor: 'red',
                width: 120,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Cancel Order
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}> Total PHP: {total_price}</Text>
        <TouchableOpacity
          onPress={() => checkOut()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 50,
          }}>
          <Entypo name="shopping-cart" size={18} color="white" />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 17,
              fontWeight: 500,
              color: 'white',
            }}>
            Check Out
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ViewOrder;
