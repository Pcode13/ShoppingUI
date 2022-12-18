import { View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {COLOURS, Items} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Home = ({navigation}) => {
  const[products,setProducts]=useState([]);
  const[accessory, setAccessory]=useState([]);

  useEffect(()=>{
 const unSubcribe =navigation.addListener('focus', ()=>{
  getDataFromDB()
 });
  return unSubcribe;
  },[navigation])

  const getDataFromDB=()=>{
let producList=[]
let accessoryList=[]

    for(let index=0; index < Items.length;index++)
    {
      if(Items[index].category == 'product'){
        producList.push(Items[index]);
      }else if (Items[index]== 'accessory'){
        accessoryList.push(Items[index]);
      }
    }
setProducts(producList);
setAccessory(accessoryList);

  };

//create an Product resuable Card

const ProductCard = ({data})=>{
  return(
    <TouchableOpacity
    style={{width:'48%',marginVertical:15}}
    >
      <View
      style={{
        width:'100%',
        height:100,
        borderRadius:15,
        backgroundColor:COLOURS.backgroundLight,
        position:'relative',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:8
      }}
      >
        {data.isOff ? 
        (
          <View
          style={{
            position:'absolute',
            width:'20%',
            height:'24%',
            backgroundColor:COLOURS.green,
            top:0,
            left:0,
            borderBottomRightRadius:10,
            borderTopLeftRadius:10,
            alignItems:'center',
            justifyContent:'center'
          }}
          >
          <Text
          style={{
            fontSize:12,
            color:COLOURS.white,
            fontWeight:'bold',
            letterSpacing:1
          }}
          >{data.offPercentage}%</Text>
          </View>
        ):null
        }
        <Image 
          source={data.productImage}
          style={{
            width:'80%',
            height:'80%',
            resizeMode:'contain'
          }}


        />
      </View>

      <Text
      style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}
      >{data.productName}</Text>

{data.category == 'accessory' ? (
          data.isAvailable ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.green,
                }}>
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.red,
                }}>
                Unavailable
              </Text>
            </View>
          )
        ) : null}
        <Text>&#8377; {data.productPrice}</Text>
    </TouchableOpacity>
  )
}


  return (
    <View
    style={{
      width: '100%',
      height: '100%',
      marginTop:25,
      backgroundColor: COLOURS.white,
    }}>
    {/* <StatusBar backgroundColor='#61dafb' barStyle="dark-content" /> */}
    <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
           
          }}>
            <TouchableOpacity>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth:1,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth:1,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
         
          
          </View>
          <View style={{padding:16,marginBottom: 10}}>
            <Text style={{fontSize:28, letterSpacing: 1,
              marginBottom: 10,fontWeight:'500'}}> Hi-Fi Shop &amp; Service</Text>
            <Text style={{fontSize:15,color:COLOURS.blue,marginBottom: 10,letterSpacing: 1,
              lineHeight: 24,fontWeight:'400'}}>Audio shop on Rustaveli Ave 57.
            {'\n'}This shop offers both products and services</Text>
          </View>
          <View style={{padding:16,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize:20, letterSpacing: 1,fontWeight:'500'}}>Products</Text>
            <Text style={{fontSize:15,letterSpacing: 1,opacity:0.5,marginLeft:10}}>41</Text>
          </View>
          <Text style={{fontSize:15,color:COLOURS.blue, letterSpacing: 1}}>SeeAll</Text>
          </View>
          <View 
          style={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'space-around'
          }}>
          {products.map(data => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
          
    </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})