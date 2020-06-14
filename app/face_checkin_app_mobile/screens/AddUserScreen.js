import React from 'react';
import { StyleSheet, View, Text, TextInput, StatusBar, AsyncStorage } from 'react-native';
import { Title, Button } from 'react-native-paper';
import {SERVER_IP} from '../Config.js'


class AddUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            checkLogin: false,
        }
    }
    sendData = async (props) => {
        let token = await AsyncStorage.getItem('token') || false;
        try {
            let data = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
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
            if (!response.status) {
                this.setState({
                    checkLogin: true
                })
            }
            else {
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

    render() {
        return (
            <View style={styles.container}>

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#0a4ff0" translucent={true} />
                <View style={styles.down}>
                    <Title style={{ color: 'blue' }} >Login to your account</Title>
                    {/* <Paragraph> Hi there! Nice to see you again.</Paragraph> */}
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red' }}>Username</Text>
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
                            onChangeText={(text) => this.setState({ email: text,  checkLogin: false })}
                        />
                        {this.state.checkLogin ? <Text style={{color:'#FF7F50',paddingLeft:3,fontStyle: 'italic'}}>username already exists</Text> : null}
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red' }}>Password</Text>
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
