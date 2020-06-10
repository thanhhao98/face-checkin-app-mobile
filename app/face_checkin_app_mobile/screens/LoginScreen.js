import React from 'react';
import { StyleSheet, View, Text, TextInput, StatusBar, AsyncStorage } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';


class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            checkLogin: 0
        }
    }
    sendData = async (props) => {
        try {
            let data = {
                username: this.state.username,
                password: this.state.password
            }
            let post = { data }
            let res = await fetch('http://192.168.20.111:5000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            });
            let response = await res.json();

            if (!response.status) {
                return;
            }
            else {
                let isAdmin = response.data.isAdmin;
                let token = response.data.token;
                try {
                    await AsyncStorage.setItem('isAdmin', isAdmin.toString());
                    await AsyncStorage.setItem('isLogin', 'true');
                    await AsyncStorage.setItem('token', token.toString())
                    this.props.navigation.navigate('ManageUser')
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

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#0a4ff0" translucent={true} />
                <View style={styles.down}>
                    <Title style={{ color: 'blue', size: 25 }} >Login to your account</Title>
                    {/* <Paragraph> Hi there! Nice to see you again.</Paragraph> */}
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red' }}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Enter your email'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            underlineColorAndroid={
                                "428AF8"
                            }
                            value={this.state.username}
                            onChangeText={(text) => this.setState({ username: text })}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={{ paddingLeft: 3, color: 'red' }}>Password</Text>
                        <View sytle={{ flexDirection: 'row' }}>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter your password'
                                secureTextEntry={true}
                                underlineColorAndroid={
                                    "428AF8"
                                }
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                            >
                            </TextInput>
                            {/* <Icon name='eye'></Icon> */}
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
export default LoginScreen;