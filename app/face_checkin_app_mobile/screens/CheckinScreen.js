import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	StatusBar,
	Image,
	Animated,
	Dimensions,
	TouchableHighlight
} from 'react-native';
import {RNCamera}  from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProgressBar} from 'react-native-paper';
import Header from '../components/header';
import {SERVER_IP} from '../Config.js'
export default class CheckinScreen extends React.Component {
  constructor() {
    super();
    this.state={
			username: '',
			status: '',
			progressBar: false,
      		image:'',
			cameraOn: true,
    }
  }
  render() {
    return (
			<View style={styles.container}>
				<StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#0a4ff0" translucent = {true}/>
				<Header title="Checkin" navigation={this.props.navigation}/>
				{this.state.cameraOn ? (
					<RNCamera
					ref={ref => {
						this.camera = ref;
						}}
						style={[styles.preview ]}
						type={RNCamera.Constants.Type.front}
						androidCameraPermissionOptions={{
							title: 'Permission to use camera',
							message: 'We need your permission to use your camera',
							buttonPositive: 'Ok',
							buttonNegative: 'Cancel',
						}}
					/>
				):(
					<Image
						style={styles.preview}
						source={{
							uri: this.state.image,
						}}
					/> 
				)}
				<View style={{marginTop:StatusBar.currentHeight}}>
					<ProgressBar indeterminate={true} visible={this.state.progressBar}/>
				</View>
				<View style={{ flex: 0, flexDirection: 'column', justifyContent: 'center'  }}>
					<View sytle={{flex:2}}>
						<TouchableOpacity
							onPress={this.takePicture.bind(this)} style={styles.capture}
						>
							<Icon
								name="camera"
								size={40}
								style={{ color:"white", textAlign:"center", marginTop:5  }}
							>
							</Icon>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{flex:1}}>
					{this.state.username.length ? (
						<Text
							style={{textAlign: 'center', fontSize:20, fontWeight: "bold", color: "blue", marginTop: 20}}
						>
							Hello: {this.state.username}
						</Text>
					):(
						<Text
							style={{textAlign: 'center', fontSize:20, color: "red", marginTop: 20}}
						>
							{this.state.status}
						</Text>
					)}
					
				</View>
			</View>
		);
  }
  takePicture = async () => {
		if (this.state.progressBar){
				this.setState({
					username: '',
					status: '',
					progressBar: false,
			})
			return
		}
		if (this.camera) {
			await this.setState({
				username: '',
				progressBar: true,
			})	
			console.log(this.state.progressBar)
			while(this.state.progressBar){
				const options = { quality: 0.5, base64: true};
				const data = await this.camera.takePictureAsync(options);
				let res = await fetch(SERVER_IP+'api/v1/checkFace', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
						'data': data,
					})
				})
				let response = await res.json()
				if (response['status']){
					if(this.state.progressBar){
						this.setState({
							username: response['data']['username'],
							status: '',
							progressBar: false,
							cameraOn: false,
							image: data.uri,
						})
					}
					break
				}
				else{
					if(this.state.progressBar){
						this.setState({
							username: '',
							status: response['message']
						})
					}
				}
			}
		} else {
			this.setState({
				username: '',
				status: '',
				progressBar: false,
				cameraOn: true,
			})
		}
	}		
};

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
		overflow: "hidden",
		top: StatusBar.currentHeight
	},
	capture: {
		flex: 0,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		marginTop: 40,
		width:80, 
		height: 80, 
		borderRadius:40, 
		backgroundColor:'#0a4ff0',
		opacity:0.3
	}
});
