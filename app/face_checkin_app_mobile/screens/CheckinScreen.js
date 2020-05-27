import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar, Image } from 'react-native';
import {RNCamera}  from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { max } from 'react-native-reanimated';
import { IconButton } from 'react-native-paper';

export default class CheckinScreen extends React.Component {
  constructor() {
    super();
    this.state={
      image:''
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#0a4ff0" translucent = {true}/>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity 
            onPress={this.takePicture.bind(this)} style={styles.capture}>
          <Icon
            name="camera"
            size={40}
            style={{ color:"white", textAlign:"center", marginTop:5 }}
          />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection:'row', justifyContent:"space-between" }}>
          <View>
            <Text>Hello Mai Van Hao</Text>
            <Text>Checkin Success</Text>
            <Text>Time chekcin: 8:00/1111</Text>
          </View>
          <Image
            style={{ width:100, height:100 }}
            source={{
              uri: this.state.image,
            }}
          />     
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.setState({image:data.uri})
      // console.log(data);
      //api post image -> backend
      fetch("http://192.168.0.20:5000/api/v1/checkFace",{
        method:"POST",
        headers: {
         'Content-Type': 'application/json'
       },
       body:JSON.stringify({
         "data":data,
         
       })
      })
      .then(res=>{
        res.json();
        console.log(res.json)
      })
    }
  };

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  preview: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 400,
    overflow: "hidden"
  },
  capture: {
    flex: 0,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    width:80, 
    height: 80, 
    borderRadius:40, 
    backgroundColor:'#0a4ff0',
    opacity:0.3
  },
});