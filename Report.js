/**
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TextArea,
  TouchableOpacity,
  Picker,
  ActivityIndicator
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import FirebaseClient from './Config'
import { TestIds, BannerAd, BannerAdSize, } from '@react-native-firebase/admob';
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      singleFile: '',
      id: 'no',
      voice_title: '',
      isLoading: false,

      userTypes: [
        { userType: 'മറ്റുള്ളവ' },
        { userType: 'സന്തോഷം' },
        { userType: 'സങ്കടം' },
        { userType: 'നല്ല പാട്ടുകൾ' },
        { userType: 'തള്ള്' },
        { userType: 'തളർത്തൽ' },
        { userType: 'പ്രശംസ' },
        { userType: 'പുച്ഛം' },
        { userType: 'മാസ്സ് ഡയലോഗ്' },
        { userType: 'തെറി' },
        { userType: 'BGM' },
        { userType: 'ആശംസ' },
        { userType: 'ഫോർ സ്റ്റാറ്റസ്' }],

      selectedUserType: 'മറ്റുള്ളവ'

    }
  }

  async componentDidMount() {
    await FirebaseClient.database().ref('Reports').on('value', (snap) => {
      //console.log(data.toJSON());
      var keys = Object.values(snap.val() || {});
      var lastIdInSnapshot = keys.length;
      console.log("=---------------------amir-----------------" + lastIdInSnapshot);
      this.setState({ id: lastIdInSnapshot + 1 })
    })

    showRewardAd()
  }

  loadUserTypes() {
    return this.state.userTypes.map(user => (
      <Picker.Item label={user.userType} value={user.userType} style={{ color: '#fff' }} />
    ))
  }



  report() {
    if(this.state.phone){
            FirebaseClient.database().ref('Reports/' + this.state.id).set(
              {
                id: this.state.id,
                phone: this.state.phone,
                problem: this.state.problem,
                date: new Date().getTime()
              }).then(() => {
                console.log('Report registerd !');
                this.setState({ isLoading: false })
                alert("Thank you! your issue will be checked soon.")
              }).catch((error) => {
                console.log(error);
              });
            }else{
              alert("Please Add your Phone Number:-")
            }
  }



  render() {
    return (

      <View style={styles.containerStyle}>
    
          {this.state.isLoading ? <ActivityIndicator size="large" color="#220b33" style={{ marginBottom: 40 }}></ActivityIndicator> : null}

          <TextInput style={{ color: '#220b33', borderColor: '#220b33', borderWidth: 1, paddingLeft: 20, marginBottom: 20 }}
            placeholder="Your Phone number"
            placeholderTextColor="#220b33"
            onChangeText={(phone) => { this.setState({ phone });
            this.componentDidMount()
            }}
            value={this.state.phone}
            keyboardType={'numeric'} />


          <View style={styles.textAreaContainer} >

            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Type problem here..."
              placeholderTextColor="#220b33"
              numberOfLines={10}
              multiline={true}
              onChangeText={(problem) => { this.setState({ problem });
              this.componentDidMount()}
            }
            />
          </View>


          {/*To multiple single file attribute*/}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={this.report.bind(this)}>
            <Text style={{ fontSize: 19, color: '#fff', padding: 10, }}>
              Report!
        </Text>
          </TouchableOpacity>


      <View style={{marginTop: 50, marginLeft: -30}}>
            <BannerAd 
              unitId='ca-app-pub-1935081920250125/2526441160'
              size={BannerAdSize.LARGE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdLoaded={() => {
                console.log('Advert loaded');
              }}
              onAdFailedToLoad={(error) => {
                console.error('Advert failed to load: ', error);
              }}
            />
     </View>
      </View>
    )
  }

}




const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#642594',
    paddingHorizontal: 50,
    paddingTop: 50,
    color: '#220b33',
  },
  textAreaContainer: {
    borderColor: '#642594',
    borderWidth: 1,
    padding: 5,
    borderColor: '#220b33',
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#220b33',
    padding: 5,
    justifyContent: "center",
    textAlign: "center",
    color: '#f57b1d',
    marginTop: 20
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});

export default App;
