import React from 'react';
import { StyleSheet, View, Text, TextInput, StatusBar, AsyncStorage, Alert } from 'react-native';
import { Title, Button } from 'react-native-paper';
import {SERVER_IP} from '../Config.js'
import Header from '../components/header.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import Loader from '../components/loader';

const options = {
    title: "Image",
    takePhotoButtonTitle: "Take photo with your camera",
    chooseFromLibraryButtonTitle: "Choose photo from library"   
}
class AddUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            checkLogin: false,
            avatarSource: null,
            isLoading: false,
        }
    }

    callAlert = (title, mess) => {
        Alert.alert(
            `${title}`,
            `${mess} cannot empty`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: async () => {}}
            ],
            { cancelable: false }
        )
    }
    sendData = async (props) => {
        let token = await AsyncStorage.getItem('token') || false;
        try {
            this.setState({
                isLoading: true
            })
        
            let data = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                img: this.state.avatarSource
            }
            
            
            let post = { data }
		    let res = await fetch(SERVER_IP+'api/v1/createUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
                body: JSON.stringify(post)
            });
            let response = await res.json();
            if(response) this.setState({isLoading: false})
            console.log(response)
            if (!response.status) {
                Alert.alert(
                    "Something is error",
                    `${response.message}`,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: async () => {}}
                    ],
                    { cancelable: false }
                )
            }
            else {
                Alert.alert(
                    "Sign up Success",
                    "Would you like to switch to the user management screen",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: async () => {
                            let res = await fetch(SERVER_IP+'api/v1/listUser', {
                            method: 'GET',
                            headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'x-access-token': token,
                            },
                            });
                        let response = await res.json();
                        console.log(response.data)
                        this.props.navigation.navigate('ManageUser',{data:response.data.listUsers})
                        }}
                    ],
                    { cancelable: false }
                )
               
            }

            this.setState({
                username: '',
                email: '',
                password: ''
            })
            // AsyncStorage.setItem('aaaaa','asdfasdfg7h9832j0p')
        } catch (e) {
            console.error(e)
        }
    }
    onChangeText = (e) => {
        console.error(e)
    }

    createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

    myfun = (e) => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response.data,"0000000000000000000000000");
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = response.data ;
          
               // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source,
              });
            }
          });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#0a4ff0" translucent={true} />
                <Header style={styles.new_header} title="Add User" navigation={this.props.navigation} isBack={true}/>
                <View style={styles.down}>
                    <Title style={{ color: 'blue' }} >Create new account</Title>
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red', fontSize:18 }}>Username</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Enter your username'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            underlineColorAndroid={
                                "black"
                            }
                            value={this.state.username}
                            onChangeText={(text) => this.setState({ username: text,  checkLogin: false })}
                        />
                        {this.state.checkLogin ? <Text style={{color:'#FF7F50',paddingLeft:3,fontStyle: 'italic'}}>username already exists</Text> : null}
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red', fontSize:18 }}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Enter your email'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            underlineColorAndroid={
                                "black"
                            }
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text,  checkLogin: false })}
                        />
                        {this.state.checkLogin ? <Text style={{color:'#FF7F50',paddingLeft:3,fontStyle: 'italic'}}>username already exists</Text> : null}
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red', fontSize:18 }}>Password</Text>
                        <View sytle={{ flexDirection: 'row' }}>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter your password'
                                secureTextEntry={true}
                                underlineColorAndroid={
                                    "black"
                                }
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text, checkLogin: false })}
                            >
                            </TextInput>
                            {this.state.checkLogin ? <Text style={{color:'#FF7F50',paddingLeft:3,fontStyle: 'italic'}}>wrong username or password</Text> : null}
                            
                        </View>
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#ddd', margin:10,padding:10}} onPress={this.myfun}>
                        <Text>Choose Image</Text>
                    </TouchableOpacity>
                    <Loader loading={this.state.isLoading}/>
                    <Button style={styles.buttonSignIn} onPress={this.sendData} >Sign Up</Button>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    new_header:{
        // marginTop:-20
    },
    down: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop:100
    },
   
    textInputContainer: {
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: 20,
        // borderWidth: 1
    },
    textInput: {
        width: 280,
        height: 45,

    },
    buttonSignIn: {
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: 20,
        backgroundColor: '#4179f7',
        // color: 'white',
        textAlign: 'center',
        width: 280,
        height: 45,
    }
})
export default AddUserScreen;
