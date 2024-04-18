import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';

const Kiosk = ({navigation}) => {
  const [fetchedOrder, setFetchedOrder] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get('http://192.168.100.7:5000/api/orders');
      setFetchedOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async query => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      try {
        const response = await axios.get(
          `http://192.168.100.7:5000/api/orders/${query}`,
        );
        setFetchedOrder(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      getOrders();
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'black', paddingHorizontal: 10}}>
      <Text
        style={{
          color: 'white',
          marginVertical: 10,
          fontSize: 18,
          fontWeight: '600',
        }}>
        Kiosk Order
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
        }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingLeft: 10,
            borderRadius: 10,
          }}
          placeholder="Search Order ID"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <Icon
          style={{position: 'absolute', right: 8}}
          name="magnifying-glass"
          size={20}
          color="black"
        />
      </View>
      <FlatList
        data={fetchedOrder}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('KioskOrder', item)}
            style={{
              padding: 20,
              backgroundColor: 'gray',
              marginVertical: 10,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
              Order Id: {item.id}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              marginTop: 20,
              fontSize: 20,
              fontWeight: '600',
            }}>
            No orders found
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Kiosk;
