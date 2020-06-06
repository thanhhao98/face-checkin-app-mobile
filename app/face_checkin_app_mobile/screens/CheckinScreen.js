import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	StatusBar,
	Image,
	Animated
} from 'react-native';
import {RNCamera}  from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { max } from 'react-native-reanimated';
import { IconButton } from 'react-native-paper';
import { ProgressBar, Colors  } from 'react-native-paper';

export default class CheckinScreen extends React.Component {
  constructor() {
    super();
    this.state={
			progressBar: false,
      image:'',
			cameraIsOn: true,
    }
  }
	toggleCamera() {
		this.setState({
			cameraIsOn: !this.state.cameraIsOn
		})
	}
  render() {
    return (
      <View style={styles.container}>
				<StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#0a4ff0" translucent = {true}/>
				{this.state.cameraIsOn ? (
	        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
						style={[styles.preview, { transform: [{rotateY: '180deg'}]  }]}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
					/>
				): (
          <Image
						style={styles.preview}
            source={{
              uri: this.state.image,
            }}
          /> 
				)}
				<View>
					<ProgressBar indeterminate={true} progress={0.5} visible={this.state.progressBar}/>
				</View>
				        
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
    
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
			this.setState({progressBar: true})
      this.setState({image:data.uri})
			this.toggleCamera()
			console.log('ok')
			let res = await fetch("http://192.168.20.81:5000/api/v1/checkFace", {
				method: 'POST',
        headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
        },
				body: JSON.stringify({
					'data': data,
				})
			})
			console.log('ok1')
			let response = await res.json();
			console.log('ok2')
			console.log(response)
			this.setState({progressBar: false})
			console.log('done')
		} else {
			this.setState({progressBar: false})
			this.toggleCamera()
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
  }
});
