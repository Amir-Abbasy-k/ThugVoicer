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
  Button,
  TouchableOpacity,
  Picker,
  ActivityIndicator
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import FirebaseClient from './Config'

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
      uploadStatus: 0.4,

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
        { userType: 'ഫോർ സ്റ്റാറ്റസ്'}],

      selectedUserType: 'മറ്റുള്ളവ'

    }
  }

  async componentDidMount() {
    await FirebaseClient.database().ref('voices').child(this.state.selectedUserType).on('value', (snap) => {
      //console.log(data.toJSON());
      var keys = Object.values(snap.val() || {});
      var lastIdInSnapshot = keys.length;
      console.log("=---------------------amir-----------------" + lastIdInSnapshot);
      this.setState({ id: lastIdInSnapshot + 1 })
    })

  }

  loadUserTypes() {
    return this.state.userTypes.map(user => (
      <Picker.Item label={user.userType} value={user.userType} style={{ color: '#fff' }} />
    ))
  }

  async selectMultipleFile() { }

  async selectOneFile() {
    this.componentDidMount();
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      this.setState({ singleFile: res });

      const ext = res.type;
      const split = ext.split('/');
      const ext_name = split.pop();
      //alert(ext_name);
      console.log("TYPE--------------------------" + res.type + '------------' + ext_name);


    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker 😡');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }



  uploadImage(uri, mime = 'application/octet-stream') {

    if(this.state.voice_title){
    uri = this.state.singleFile.uri;
    let ext = this.state.singleFile.type;
    this.setState({ isLoading: true })

    let split = ext.split('/');
    let ext_name = split.pop();

    if (ext_name == 'x-wav') {
      ext_name = ".wav";

    } else if (ext_name == 'aac-adts') {
      ext_name = ".aac";

    } else if (ext_name == 'mpeg') {
      ext_name = ".mp3";
    }
    else if (ext_name == 'ogg') {
      ext_name = ".ogg";
    } else {
      ext_name = ".mp3";
    }



    return new Promise((resolve, reject) => {

      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      const imageRef = FirebaseClient.storage().ref('voices/' + this.state.selectedUserType + '/').child(this.state.voice_title + ext_name);

      fs.readFile(uploadUri, 'base64')  // listen to upload progress event, emit every 250ms
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })

        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })

        })
        //.uploadProgress({ interval : 250 },(written, total) => {
        //console.log('uploaded', written / total)
        //})
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL().then((downloadUrl) => {

            FirebaseClient.database().ref('voices/' + this.state.selectedUserType + '/' + this.state.voice_title).set(
              {
                id: this.state.id,
                title: this.state.voice_title,
                url: downloadUrl,
                date: new Date().getTime()
              }).then(() => {
                console.log('INSERTED !');
                this.setState({ isLoading: false })
              }).catch((error) => {
                console.log(error);
              });


            console.log("Your Download URL is = " + downloadUrl)
          })
        })
        .then((url) => {
          resolve(url)
          alert('👍 Uploaded Successfully! 🌹🌹')
        })
        .catch((error) => {
          reject(error)
        })
    })
  }else{
    alert(' Please Enter Voice Title !🌹')
  }
}




  render() {
    return (
      <ScrollView style={styles.containerStyle}>

        {this.state.isLoading ? <ActivityIndicator size="large" color="#fff" style={{marginBottom: 40}}></ActivityIndicator> : null}
        
        <View style={{borderWidth: 1, borderColor: '#fff', marginBottom: 20,}}>
        <Text style={{color: '#fff', opacity: 0.4, paddingLeft:10, top: 10}}>Select Section</Text>
        <Picker style={{ color: '#fff', borderRadius: 5, borderColor: '#fff', borderWidth: 1, }}
          selectedValue={this.state.selectedUserType}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ selectedUserType: itemValue })
            this.componentDidMount();
          }}>

          {this.loadUserTypes()}
        </Picker>
        </View>



        <TextInput style={{ color: '#fff', borderRadius: 5, borderColor: '#fff', borderWidth: 1, paddingLeft: 20, }}
          placeholder="Type here your voice_title"
          placeholderTextColor="#fff" 
          onChangeText={(voice_title) => {
            this.setState({ voice_title, uploadStatus: 1})
            this.componentDidMount();
          }
        }
          value={this.state.voice_title} />

        {/*To show single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={this.selectOneFile.bind(this)}>
          {/*Single file selection button*/}
          <Image
            source={{
              uri: 'https://www.iconsdb.com/icons/preview/orange/whatsapp-xxl.png',
            }}
            style={styles.imageIconStyle}
          />
          <Text style={{ marginLeft: 20, fontSize: 19, color: '#f57b1d' }}>
            Select Audio Clip
        </Text>
     
        </TouchableOpacity>
        {/*Showing the data of selected Single file*/}
        <Text style={styles.textStyle}>
          File Name:{' '}{this.state.singleFile.name ? this.state.singleFile.name : ''}
          {'\n'}
        Type: {this.state.singleFile.type ? this.state.singleFile.type : ''}
          {'\n'}
        File Size:{' '}
          {this.state.singleFile.size ? this.state.singleFile.size : ''}
          {'\n'}
        URI: {this.state.singleFile.uri ? this.state.singleFile.uri : ''}
          {'\n'}

        Audio Type: {this.state.selectedUserType}
          {'\n'}
        Item Id:{this.state.id}
          {'\n'}
        Item Name:{this.state.voice_title} </Text>



        {/*To multiple single file attribute*/}
        <View style={{opacity: this.state.uploadStatus}}>

        
        <TouchableOpacity 
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={this.uploadImage.bind(this)}>
          {/*Multiple files selection button*/}
          <Image
            source={{
              uri: 'data:image/png;base64,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',
            }}
            style={styles.imageIconStyle}
          />
          <Text style={{ fontSize: 19, color: '#f57b1d', padding: 10, }}>
            Upload!
        </Text>
        </TouchableOpacity>
        </View>

      </ScrollView>)
  }

}




const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#f57b1d',
    padding: 50,
    paddingLeft: 50,
    paddingRight: 50,
    color: '#fff',
  },
  textStyle: {
    backgroundColor: '#f57b1d',
    fontSize: 12,
    marginTop: 16,
    color: '#fff',
    opacity: 0.6
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 40,
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
