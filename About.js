import React from 'react';
import { StyleSheet, Text, Linking, View, TouchableOpacity, Image } from 'react-native';


export default class SplashScreen extends React.Component {



  render() {
    return (
      <View style={styles.MainContainer}>

        <View>
        <TouchableOpacity onPress={()=>{Linking.openURL('https://instagram.com/amir_abbasy_k?igshid=11ybs2pd61v71')}} style={{alignItems: "center"}}>
        <Image source={require('./asset/amir.png')} style={{width: 60, height: 60, borderRadius: 60}} />
        <Text style={{color: '#7b7b7b',opacity: 0.4}}>Developer</Text>
        <Text style={{fontSize: 20, color: '#7b7b7b'}}>amir_abbasy</Text>

        </TouchableOpacity>
        </View>
     <View style={{opacity: 0.4, alignItems: "center", justifyContent: "center", marginTop: 100}}>
     <Text style={{color: '#7b7b7b',}}>Data Collection</Text>
     </View>
        <View style={styles.chileds} >
   
          <View style={styles.child}>
            <Image style={styles.child_img} source={require('./asset/ammar.png')} />
            <TouchableOpacity><Text style={styles.child_text}  onPress={()=>{Linking.openURL('https://instagram.com/al_ammar_k?igshid=idjfdy2g6sf9')}}>al_ammar_k</Text></TouchableOpacity>
          </View>
          
           <View style={styles.child}>
            <Image style={styles.child_img} source={require('./asset/faras.png')} />
            <TouchableOpacity onPress={()=>{Linking.openURL('https://instagram.com/lukkochiii_______?igshid=1ov4aw1nej08v')}}><Text style={styles.child_text}>lukkochiii__</Text></TouchableOpacity>
          </View>
         
          <View style={styles.child}>
            <Image style={styles.child_img} source={require('./asset/arshad.png')} />
            <TouchableOpacity onPress={()=>{Linking.openURL('https://instagram.com/arxhxd_?igshid=11c03ya8iroeh')}}><Text style={styles.child_text}>arxhxd_</Text></TouchableOpacity>
          </View>

          <View style={styles.child}>
            <Image style={styles.child_img} source={require('./asset/azhar.png')} />
            <TouchableOpacity onPress={()=>{Linking.openURL('https://instagram.com/azhar_ajuzz?igshid=x8gp6msyz7ty')}}><Text style={styles.child_text}>azhar_ajuzz</Text></TouchableOpacity>
          </View>

          <View style={styles.child}>
            <Image style={styles.child_img} source={require('./asset/shibili.png')} />
            <TouchableOpacity onPress={()=>{Linking.openURL('https://www.instagram.com/__shibili__33/')}}><Text style={styles.child_text}>__shibili__33</Text></TouchableOpacity>
          </View>

          <View style={styles.child}>
            <Image style={styles.child_img} source={require('./asset/fuad.png')} />
            <TouchableOpacity onPress={()=>{Linking.openURL('https://www.instagram.com/fuad_lellu/')}}><Text style={styles.child_text}>fuad_lellu</Text></TouchableOpacity>
          </View>
    
       
        </View>


        <View style={styles.tag}>
        <Image source={require('./asset/TAG.png')} style={{width: 150, height: 80}} />
        <TouchableOpacity><Text style={{color: '#fff', marginTop: -10}}>www.tageerala.com</Text></TouchableOpacity>
        </View>
       
       

    
      </View>
    );
  }
}

  

const styles = StyleSheet.create({
  MainContainer:{
    flex: 1,
    resizeMode: "cover",
    backgroundColor: '#212121',
    color: '#4d4d4d',
    padding: 30,

  },
  chileds:{
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 5,
    opacity: 0.8
  },
  child:{
    margin: 10,
    borderRadius: 50,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  child_img:{
    width: 35, 
    height: 35, 
    borderRadius: 60
  },
  child_text:{
    color: '#fff',
    opacity: 0.5,
    fontSize: 12,
    marginTop: 5
  },
  tag:{
    flexDirection: 'column',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 20,
    opacity: 0.3,


  },
});


