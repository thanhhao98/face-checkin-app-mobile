import React from 'react';
import { StyleSheet, View, Text, TextInput, StatusBar, AsyncStorage } from 'react-native';
import { Title, Button } from 'react-native-paper';
import Header from '../components/header';
import Loader from '../components/loader';
class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            checkLogin: false,
            isLoading: true,
        }
    }
    sendData = async (props) => {
        try {
            let data = {
                username: this.state.username,
                password: this.state.password
            }
            let post = { data }
            let res = await fetch('http://192.168.2.18:5000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            });
            let response = await res.json();
            this.setState({
                isLoading: false
            })
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

                    //get data for manage history screen
                    let res = await fetch("http://192.168.2.18:5000/api/v1/getCheckHistory", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                    }});
                    let response = await res.json();
                    this.props.navigation.navigate('History',{data:response})
                } catch (error) {
                    console.error(error.message)
                }
            }

            this.setState({
                username: '',
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
             <Loader
                    loading={this.state.isLoading} />
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#0a4ff0" translucent={true} />
                <Header title="Login" navigation={this.props.navigation}/>
                <View style={styles.down}>
                    {/* <Paragraph> Hi there! Nice to see you again.</Paragraph> */}
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
        alignItems: 'center',
        marginTop: "32%"
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
export default LoginScreen;