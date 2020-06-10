import React from 'react';
import { StyleSheet, View, Text, TextInput, StatusBar, AsyncStorage,  } from 'react-native';
import { Title, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

class AddUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            photo: null,
        }
    }
    sendData = async (props) => {
        try {
            let data = {
                username: this.state.username,
                password: this.state.password
            }
            let post = { data }
            let res = await fetch('http://192.168.0.20:5000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            });
            let response = await res.json();

            if (!response.status) {
                this.setState({
                    checkLogin: true
                })
            }
            else {
                let isAdmin = response.data.isAdmin;
                let token = response.data.token;
                try {
                    await AsyncStorage.setItem('isAdmin', isAdmin.toString());
                    await AsyncStorage.setItem('isLogin', 'true');
                    await AsyncStorage.setItem('token', token.toString())
                    this.props.navigation.navigate('History')
                } catch (error) {
                    console.error(error.message)
                }
            }

            this.setState({
                username: '',
                password: '',
                email: '',
            })
            // AsyncStorage.setItem('aaaaa','asdfasdfg7h9832j0p')
        } catch (e) {
            console.error(e)
        }
    }
    onChangeText = (e) => {
        console.error(e)
    }

    chooseFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              filePath: source,
            });
          }
        });
      };
    render() {
        const { photo } = this.state
        return (
            <View style={styles.container}>

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#0a4ff0" translucent={true} />
                <View style={styles.down}>
                    
                    {/* <Paragraph> Hi there! Nice to see you again.</Paragraph> */}
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red' }}>username</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Enter your email'
                            keyboardType='email-address'
                            underlineColorAndroid={
                                "black"
                            }
                            value={this.state.username}
                            onChangeText={(text) => this.setState({ username: text,  checkLogin: false })}
                        />
                        {this.state.checkLogin ? <Text style={{color:'#FF7F50',paddingLeft:3,fontStyle: 'italic'}}>wrong username or password</Text> : null}
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red' }}>Password</Text>
                        <View sytle={{ flexDirection: 'row' }}>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter your password'
                                secureTextEntry={this.state.secureTextEntry}
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
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red' }}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Enter your email'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            underlineColorAndroid={
                                "black"
                            }
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ username: text,  checkLogin: false })}
                        />
                        {this.state.checkLogin ? <Text style={{color:'#FF7F50',paddingLeft:3,fontStyle: 'italic'}}>wrong username or password</Text> : null}
                    </View>
                    <View style={styles.container}>
                        {/*<Image 
                        source={{ uri: this.state.filePath.path}} 
                        style={{width: 100, height: 100}} />*/}
                        <Image
                            source={{
                            uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
                            }}
                            style={{ width: 100, height: 100 }}
                        />
                        <Image
                            source={{ uri: this.state.filePath.uri }}
                            style={{ width: 250, height: 250 }}
                        />
                        <Text style={{ alignItems: 'center' }}>
                            {this.state.filePath.uri}
                        </Text>
                        <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
                    </View>
                    <Button style={styles.buttonSignIn} onPress={this.sendData} >Sign In</Button>
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
    up: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    down: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        textAlign: 'center',
        width: 400,
        fontSize: 23
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
        backgroundColor: 'red',
        // color: 'white',
        textAlign: 'center',
        width: 280,
        height: 45,
    }
})
export default AddUserScreen;