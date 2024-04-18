import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import drinksImage1 from '../../assets/drinks/drinks1.png';
import drinksImage2 from '../../assets/drinks/drinks2.png';
import drinksImage3 from '../../assets/drinks/drinks3.png';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../store/features/orderSlice';


const imageMap = {
  '../assets/drinks/drinks1.png': drinksImage1,
  '../assets/drinks/drinks2.png': drinksImage2,
  '../assets/drinks/drinks3.png': drinksImage3,
};

const Meals = ({drink, handleShowAlert, handleCloseAlert}) => {
  const {height, width} = useWindowDimensions();
  const [choosenMeal, setChoosenMeal] = useState({});
  const dispatch = useDispatch();

  const meths = drink => {
    dispatch(addToCart({meal: choosenMeal, drink: drink}));
    handleShowAlert();
  };
  const handleAddToCart = drink => {
    Alert.alert(
      `${drink.item_name}`,
      `Are you sure you want to order ${drink.item_name} ?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => meths(drink)},
      ],
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => handleAddToCart(drink)}
        style={{
          width: width * 0.32,
          height: height / 4,
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 7,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <Image 
          source={imageMap[drink.image_path]}
          style={{height: 130, width: 130}} />
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {drink.item_name}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const Drinks = ({navigation, drinks}) => {
  const [showAlert, setShowAlert] = useState(false);

  const CustomAlert = ({visible, onClose}) => {
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
              }}>{`Your order is added`}</Text>
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

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      <View
        style={{
          paddingVertical: 20,
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
        }}>
        {drinks.map(drink => (
          <Meals
            key={drink.id}
            drink={drink}
            handleShowAlert={handleShowAlert}
            handleCloseAlert={handleCloseAlert}
          />
        ))}
      </View>
      <CustomAlert visible={showAlert} onClose={handleCloseAlert} />
    </>
  );
};

export default Drinks;
