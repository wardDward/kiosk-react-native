import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';
import {useDispatch, useSelector} from 'react-redux';
const KioskOrder = ({navigation, route}) => {
  const item = route.params;
  const [payment, setPayment] = useState('');
  const {total_price} = useSelector(state => state.order);
  console.log(item);
  let orderItems = [];

  try {
    orderItems = JSON.parse(item.order_items);
  } catch (error) {
    console.error('Error parsing order items:', error);
  }

  const checkOut = async () => {
    try {
      // Making a PUT request to the specified endpoint
      await axios.put('http://192.168.100.7:5000/api/orders/update', {
        orderId: item.id,
        paymentStyle: payment,
        total_price: total_price,
      });
      printReceipt(item.id, item.queueNumber);
      Alert.alert('', 'Order Check Out Successful', [
        {text: 'OK', onPress: () => navigation.navigate('CashierBoard')},
      ]);
    } catch (error) {
      // Handling errors if the request fails
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

      for (const order of orderItems) {
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'black',
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/logo.png')}
          style={{height: 100, width: 100}}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',

          padding: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 20,
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Customer Order
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'red'}}>
          Order Id: {item.id}
        </Text>
        <View style={{marginTop: 20}}>
          {orderItems.map((orderItem, index) => (
            <View key={index} style={{marginLeft: 10}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'black',
                  fontSize: 20,
                  marginBottom: 10,
                }}>
                Meal:{' '}
                {orderItem.meal && orderItem.meal.item_name
                  ? orderItem.meal.item_name
                  : 'No Meal Order'}
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'black',
                  fontSize: 20,
                  marginBottom: 10,
                }}>
                Drink:{' '}
                {orderItem.drink && orderItem.drink.item_name
                  ? orderItem.drink.item_name
                  : 'No Drink Order'}
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'black',
                  fontSize: 20,
                  marginBottom: 10,
                }}>
                Quantity: {orderItem.quantity}
              </Text>
            </View>
          ))}
        </View>
        <View style={{marginTop: 10, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: 'black',
                marginBottom: 6,
                fontSize: 16,
                fontWeight: '600',
              }}>
              Payment Method
            </Text>
            <Text
              style={{
                color: 'red',
                marginBottom: 6,
                fontSize: 16,
                fontWeight: '600',
              }}>
              {payment}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setPayment('Cash')}
            style={{
              backgroundColor: 'green',
              padding: 13,
              marginBottom: 6,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
              }}>
              Cash
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPayment('Gcash')}
            style={{
              backgroundColor: 'blue',
              padding: 13,
              marginBottom: 6,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
              }}>
              Gcash
            </Text>
          </TouchableOpacity>
        </View>
        {/* 
        {payment !== '' ? (
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
                marginTop: 20,
              }}>
              Amount
            </Text>
            <TextInput
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 12,
                textAlign: 'center',
                fontSize: 20,
              }}
              onChange={e => setAmount(e.target.value)}
              value={amount}
              placeholder="Enter amount"
            />
          </View>
        ) : (
          <Text style={{textAlign: 'center', marginTop: 40}}>
            Customer Way Of Payment
          </Text>
        )} */}

        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 7,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{backgroundColor: 'red', borderRadius: 12}}>
            <Text
              style={{
                color: 'white',
                padding: 20,
                width: 150,
                textAlign: 'center',
              }}>
              Go Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => checkOut()}
            style={{backgroundColor: 'green', borderRadius: 12}}>
            <Text
              style={{
                color: 'white',
                padding: 20,
                width: 150,
                textAlign: 'center',
              }}>
              Print Receipt
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default KioskOrder;
