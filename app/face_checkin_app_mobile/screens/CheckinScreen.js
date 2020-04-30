import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Title } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';

function CheckinScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <RNCamera
            
                 ref={(cam)=>{
                    this.Camera = cam
                }}
                style={styles.view}
                aspect={Camera.constants.Aspect.fill}>
                    <Text
                    style={styles.capture} 
                    onpress={this.takePicture.bind(this)}>
                        [CAPTURE_IMAGE]
                    </Text>
            </RNCamera> 
        </View>
    );
}
function takePicture(){
    const option = {}

    this.camera.capture({metadata: option}).then((data) => {
        console.log(data)
    }).catch((error)=>{
        console.log(error)
    })
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: 'blue',
        borderRadius: 10,
        color: 'red',
        padding: 15,
        margin: 45
    }
})
export default CheckinScreen;