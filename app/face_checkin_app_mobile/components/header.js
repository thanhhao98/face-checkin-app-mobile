import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';
const statusbarHeight = StatusBar.currentHeight;

export default function Header ({navigation,title, isStatus, isBack}) {
    return (
            <View style={styles.header}>
                {isBack? <Icon.Button 
                    name="ios-arrow-round-back" 
                    size= {28}
                    style={styles.icon}
                    onPress={()=>navigation.goBack()}
                /> : <Icon.Button 
                    name="ios-menu" 
                    size= {28}
                    style={styles.icon}
                    onPress={()=>navigation.openDrawer()}
                />}
                <Text style={styles.headerText}>{title}</Text>
                {isStatus? <Icon.Button
                    name="ios-add"
                    size={28}
                    style={styles.icon2}
                    onPress={()=>navigation.navigate('AddUser')}
                /> : null}
                
            </View>
        )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '8%',
        top:statusbarHeight,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'#4179f7',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "white",
        letterSpacing: 1,
        
    },
    icon: {
        paddingLeft:20,
        backgroundColor: "#4179f7"
    },
    icon2: {
        // position:'absolute',
        // marginLeft:20,
        backgroundColor: "#4197f7"
    }
})