import React from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';

function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.up}>
                <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.down}>
                <Title>Sign In</Title>
                <Paragraph> Hi there! Nice to see you again.</Paragraph>
                <View style={styles.textInputContainer}>
                    <Text style={{paddingLeft:3,color:'red'}}>Email</Text>
                    <TextInput 
                    style={styles.textInput}
                    placeholder='Enter your email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    underlineColorAndroid={
                        "428AF8"
                    }
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <Text style={{paddingLeft:3, color:'red'}}>Password</Text>
                    <TextInput 
                    style={styles.textInput}
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    underlineColorAndroid={
                        "428AF8"
                    }
                    />
                </View>
                <Button style={styles.buttonSignIn}>Sign In</Button>
            </View>            
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    up:{
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    down:{
        flex:7,
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