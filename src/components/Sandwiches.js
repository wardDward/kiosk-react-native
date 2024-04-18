import {
    View,
    Text,
    useWindowDimensions,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react';
  
  import sandwich1 from '../assets/sandwich/sandwich1.png';
  import sandwich2 from '../assets/sandwich/sandwich2.png';
  
  
  const imageMap = {
    '../assets/sandwich/sandwich1.png': sandwich1,
    '../assets/sandwich/sandwich2.png': sandwich2,
  };
  
  const Meals = ({navigation, sandwich}) => {
    const {height, width} = useWindowDimensions();
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChoosenMeal', sandwich)}
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
            source={imageMap[sandwich.image_path]}
            style={{height: 120, width: 110}}
          />
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
            {sandwich.item_name}
          </Text>
        </TouchableOpacity>
      </>
    );
  };
  
  const Sandwiches = ({navigation, sandwiches}) => {
    return (
      <View
        style={{
          paddingVertical: 20,
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
        }}>
        {sandwiches.map(sandwich => (
          <Meals key={sandwich.id} navigation={navigation} sandwich={sandwich} />
        ))}
      </View>
    );
  };
  
  export default Sandwiches;
  