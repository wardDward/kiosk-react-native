import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

const ChoosenMeals = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{padding: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{height: 100, width: 100}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
              Burger
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 50,
                width: 50,
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>1</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={{height: 100, width: 100}}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
                Burger
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 50,
                width: 50,
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>1</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={{height: 100, width: 100}}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
                Burger
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 50,
                width: 50,
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>3</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={{height: 100, width: 100}}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
                Sprite
              </Text>
            </View>
          </View>
          <ScrollView style={{flex: 1, flexWrap: 'wrap'}}>
            <Text style={{fontWeight: 500, color: 'black', marginVertical: 5}}>
              Choose your drink
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  alignItems: 'center',
                  padding: 4,
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 7,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri: 'https://www.coca-cola.com/content/dam/onexp/ph/en/brands/sprite/sprite/ph_sprite_mobilebanner_654x1164_v1.jpg/width1024.jpg',
                  }}
                  style={{height: 100, width: 100}}
                />
                <Text style={{fontWeight: 500, color: 'black'}}>Sprite ML</Text>
              </TouchableOpacity>
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
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Add Order
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChoosenMeals;
