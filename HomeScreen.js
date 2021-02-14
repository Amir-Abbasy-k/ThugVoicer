//This is an example code for FlatList//
import React from 'react';
//import react in our code.
import { StyleSheet, FlatList, Text, Linking, View, StatusBar, Switch, TouchableOpacity, ImageBackground, Image, DeviceEventEmitter, ToastAndroid, ActivityIndicator } from 'react-native';
//import styles from './Styles';
import SendIntentAndroid from 'react-native-send-intent';
import Share from 'react-native-share';
import { showFloatingBubble, hideFloatingBubble, requestPermission, checkPermission, initialize } from "react-native-floating-bubble"



const showToast = text => ToastAndroid.show(text, 1000)


DeviceEventEmitter.addListener("floating-bubble-press", (e) => {
  // What to do when user press the bubble floatBTN2
  //Linking.openURL('https://play.google.com/store/apps/details?id=com.whatsapp&hl=en_IN');
  SendIntentAndroid.openApp("com.thugwhatsappvoicer").then(wasOpened => { });

});


class SplashScreen extends React.Component {
  render() {
    return (
 
      <View style={{backgroundColor: '#ff00f2', flex:1, justifyContent: "center", alignItems: "center"}}>
      <StatusBar hidden />

   
      <ActivityIndicator color='#391903' size='large' ></ActivityIndicator>
 

       <Image source={require('./asset/splash.png')} style={{width: 300, height: 500}} />
      </View>
      
    );
  }
}






export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [
        { emoji: '🤐', value: 'മറ്റുള്ളവ' },
        { emoji: '😀', value: 'സന്തോഷം' },
        { emoji: '😥', value: 'സങ്കടം' },
        { emoji: '😴', value: 'നല്ല പാട്ടുകൾ' },
        { emoji: '😎', value: 'തള്ള്' },
        { emoji: '😧', value: 'തളർത്തൽ' },
        { emoji: '🤩', value: 'പ്രശംസ' },
        { emoji: '😒', value: 'പുച്ഛം' },
        { emoji: '🤠', value: 'മാസ്സ് ഡയലോഗ്' },
        { emoji: '🤬', value: 'തെറി' },
        { emoji: '😵', value: 'BGM' },
        { emoji: '🤗', value: 'ആശംസ' },
        { emoji: '🎼', value: 'ഫോർ സ്റ്റാറ്റസ്' },
        /*
        { emoji: '14', value: 'N' },
        { emoji: '15', value: 'O' },
        { emoji: '16', value: 'P' },
        { emoji: '17', value: 'Q' },
        { emoji: '18', value: 'R' },
        { emoji: '19', value: 'S' },
        { emoji: '20', value: 'T' },
        { emoji: '21', value: 'U' },
        { emoji: '22', value: 'V' },
        { emoji: '23', value: 'W' },
        { emoji: '24', value: 'X' },
        { emoji: '25', value: 'Y' },
        { emoji: '26', value: 'Z' },391903*/ 
      ],
      isLoading: true,
      isEnabled: false
    };
  }





  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }

    await checkPermission().then((value) => showToast(`Permission: ${value ? 'Yes' : 'No'}`)).catch(() => showToast("Failed to check"))
    await requestPermission().then(() => showToast("Permission received for Thug Whatsapp voicer app")).catch(() => showToast("Failed to get permission"))
    await initialize().then(() => showToast("Swith on Floating button to get app enywhere")).catch(() => showToast("Failed init"));


  }


  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };


   toggleSwitch=()=>{
    this.setState({ isEnabled: true });
     showFloatingBubble(10, 10).then(() => showToast("Thug Whatsapp voicer app added Floating Button"))

    if (this.state.isEnabled == true) {
      this.setState({ isEnabled: false });
      hideFloatingBubble().then(() => showToast("You Removed Thug Whatsapp voicer app Bubble")).catch(() => showToast("Failed to remove"))
    } else {
      this.setState({ isEnabled: true });
    }
  }

 
  render() {

    if (this.state.isLoading) {
       return <SplashScreen />;
    }
    return (
      <ImageBackground source={require('./asset/BG.jpg')} style={styles.image}>
        <StatusBar hidden />


        <View style={{ flex: 1 }}>
          <Image
            style={{ width: 60, height: 60, float: 'left', marginLeft: 30, marginTop: 10 }}
            //source={{ uri: 'https://cdn4.buysellads.net/uu/1/41334/1550855401-cc_light.png' }}
            source={require('./asset/logo.png')}
          />
          <Text style={{ fontSize: 12, float: 'right', marginLeft: 100, marginTop: -50, right: -25, color: '#f4f3f4', opacity: 0.8 }}>
           എല്ലാ ആപ്പുകളിലും കൊണ്ടുവരാം</Text>
          <Switch style={{ position: "relative", top: -20, right: 10 }}
            trackColor={{ false: "#767577", true: "#0cb76d" }}
            thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={this.state.isEnabled}
          />

          <Text style={{ fontSize: 25, float: 'right', marginLeft: 100, marginTop: -30, color: '#0cb76d', fontWeight: "bold" }}>
            Whatsapp Voices</Text>

        </View>

        <View style={{ flex: 1, flexDirection: 'row', position: 'relative', bottom: 0, marginLeft: 20 }}>
          <TouchableOpacity style={styles.link_button}>
            <Text style={styles.text_Button} onPress={()=>{
              Linking.openURL('https://instagram.com/team_thug_whatsap_voicer?igshid=y7rzju2t3s97')
            }}>Follow us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link_button}>
            <Text style={styles.text_Button} onPress={() => { this.props.navigation.navigate('About') }}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link_button}>
            <Text style={styles.text_Button}  onPress={() => { this.props.navigation.navigate('Report') }}>Report</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.MainContainer}>

          <View >
            <FlatList
              data={this.state.FlatListItems}
              //data defined in constructor
              ItemSeparatorComponent={this.FlatListItemSeparator}

              //Item Separator View
              renderItem={({ item }) => (
                // Single Comes here which will be repeatative for the FlatListItems
                <View>
                  <Text
                    style={styles.item}
                    onPress={() => { this.props.navigation.navigate('BatchList', { batchName: item.value }) }}>
                    {item.emoji}   {item.value}   ____🔔
              </Text>
                </View>
              )
              }
              // throw error of key...
              keyExtractor={(item, index) => index.toString()}
            />
          </View>


        
        </View>

          <TouchableOpacity style={styles.floatButton}
              onPress={() => { this.props.navigation.navigate('NewAudio') }}>
              <Text style={{ fontSize: 50, color: '#fff', position: 'relative', left: 20, top: -5 }}>+</Text>
            </TouchableOpacity>


      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  MainContainer: {
    flex: 1,
    flexGrow: 8,
    justifyContent: 'flex-start',
    marginHorizontal: 50,
    marginBottom: 0,
    paddingLeft: 10,
    backgroundColor: '#fff',
    position: 'relative',
    left: -50
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  floatButton: {
    justifyContent: "flex-end",
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: '#f57b1d',
    position: 'absolute',
    right: 65,
    bottom: 20,
  },
  link_button: {
    backgroundColor: '#eb4f69',
    width: '27%',
    height: 25,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginLeft: 10,
    marginTop: 20,


  },
  text_Button:
  {
    alignItems: "center", justifyContent: "center", color: '#fff', marginLeft: 25,
  }
});


