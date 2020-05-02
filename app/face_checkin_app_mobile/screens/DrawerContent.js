import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { 
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

export function DrawerContent(props){
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View styles = {styles.drawerContent}>
                    <View style = {styles.userInfoSection}>
                      <View style = {{ marginTop:15}}>
                        <Avatar.Image 
                          source ={{
                            uri:'http://streaming1.danviet.vn/upload/2-2018/images/2018-06-21/anh-1-1529571305-width650height1018.jpg',
                          }}
                          size = {50}
                        />
                      </View>
                      <View style ={{marginLeft:15, marginTop:15}}>
                        <Title style={styles.title}>Mai Van Hao</Title>
                        <Caption style={styles.caption}>maihao1997@gmail.com</Caption>
                      </View>
                    </View>
                    
                    <Drawer.Section style={styles.drawerSection}>
                      <DrawerItem 
                        icon={({color, size})=>(
                          <Icon name="home"
                          color={color}
                          size={size}
                          />
                        )}
                        label="Home"
                        onPress={()=>{props.navigation.navigate('Home')}}
                      />
                      <DrawerItem 
                        icon={({color, size})=>(
                          <Icon name="camera"
                          color={color}
                          size={size}
                          />
                        )}
                        label="Checkin"
                        onPress={()=>{props.navigation.navigate('Checkin')}}
                      />
                      <DrawerItem 
                        icon={({color, size})=>(
                          <Icon name="sign-in"
                          color={color}
                          size={size}
                          />
                        )}
                        label="Login"
                        onPress={()=>{props.navigation.navigate('Login')}}
                      />
                      <DrawerItem 
                        icon={({color, size})=>(
                          <Icon name="history"
                          color={color}
                          size={size}
                          />
                        )}
                        label="History"
                        onPress={()=>{props.navigation.navigate('History')}}
                      />
                    </Drawer.Section>
                   
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                  icon={({color, size})=>(
                    <Icon name="sign-out"
                    color={color}
                    size={size}
                    />
                  )}
                  label="Log Out"
                  onPress={()=>{}}
                />
            </Drawer.Section>
        </View>
    )
}
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });