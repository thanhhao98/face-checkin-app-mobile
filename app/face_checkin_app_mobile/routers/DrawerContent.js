import React, { useState, useEffect } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import {
  Avatar,
  Title,
  Caption,
  Drawer,
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {SERVER_IP} from '../Config.js'


export function DrawerContent(props) {
  const [isLogin, setLogin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    //check user
    try {
      async function checkAsyncStorage() {
        let token = await AsyncStorage.getItem('token') || false;
        if(!token){
          setAdmin(false);
          setLogin(false);
        }
        else{
          let checkAdmin = await AsyncStorage.getItem('isAdmin') || false;
          let checkLogin = await AsyncStorage.getItem('isLogin') || false;
          let username   = await AsyncStorage.getItem('username') || '';
          let email      = await AsyncStorage.getItem('email') || '';
          setUsername(username);
          setEmail(email);
        if (checkAdmin === 'true') {
          setAdmin(true);
          setLogin(true);

        }
        else if (checkLogin === 'true') {
          setLogin(true);

        }
        else {
          setAdmin(false);
          setLogin(false);
        }
        }
      }
      checkAsyncStorage();
    } catch (e) {
      console.error(e)
    }
  });


  async function callApiHistory() {
    let token = await AsyncStorage.getItem('token') || false;
    let res = await fetch(SERVER_IP+"api/v1/getCheckHistory", {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
      }});
      let response = await res.json();
      const redirect = response.status? props.navigation.navigate('History', {data: response.data}) :  props.navigation.navigate('Login')
  }

  if (!isLogin) {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View styles={styles.drawerContent}>
            

            <View style={styles.userInfoSection}>
              <View style={{ marginTop: 15 }}>
                <Icon2 name="md-person" size={50}/>
              </View>
              <View style={{ marginLeft: 15, marginTop: 15 }}>
                <Title style={styles.title}></Title>
                <Caption style={styles.caption}></Caption>
              </View>
            </View>


            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="camera"
                    color={color}
                    size={size}
                  />
                )}
                label="Checkin"
                onPress={() => { props.navigation.navigate('Checkin') }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="sign-in"
                    color={color}
                    size={size}
                  />
                )}
                label="Login"
                onPress={() => { props.navigation.navigate('Login') }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>


      </View>
    )
  } else {
    if (isAdmin) {
      return (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView {...props}>
            <View styles={styles.drawerContent}>

              <View style={styles.userInfoSection}>
                <View style={{ marginTop: 15 }}>
                  <Icon2 name="md-person" size={50}/>
                </View>
                <View style={{ marginLeft: 15, marginTop: 15 }}>
                  <Title style={styles.title}>{username}</Title>
                  <Caption style={styles.caption}>{email}</Caption>
                </View>
              </View>

              <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="camera"
                      color={color}
                      size={size}
                    />
                  )}
                  label="Checkin"
                  onPress={() => { props.navigation.navigate('Checkin') }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="history"
                      color={color}
                      size={size}
                    />
                  )}
                  label="History"
                  onPress={async() => {
                    await callApiHistory();
                    }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="users"
                      color={color}
                      size={size}
                    />
                  )}
                  label="Manage User"
                  onPress={() => { props.navigation.navigate('ManageUser') }}
                />
                {/* <DrawerItem
                        label="Open drawer"
                        onPress={() => props.navigation.openDrawer()}
                      /> */}
              </Drawer.Section>


            </View>
          </DrawerContentScrollView>

          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="sign-out"
                  color={color}
                  size={size}
                />
              )}
              label='Logout'
              onPress={async () => {
                await AsyncStorage.clear();
								props.navigation.navigate('Login')
              }}
            />
          </Drawer.Section>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView {...props}>
            <View styles={styles.drawerContent}>
              <View style={styles.userInfoSection}>
                <View style={{ marginTop: 15 }}>
                  <Icon2 name="md-person" size={50}/>
                </View>
                <View style={{ marginLeft: 15, marginTop: 15 }}>
                  <Title style={styles.title}>{username}</Title>
                  <Caption style={styles.caption}>{email}</Caption>
                </View>
              </View>

              <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="camera"
                      color={color}
                      size={size}
                    />
                  )}
                  label="Checkin"
                  onPress={() => { props.navigation.navigate('Checkin') }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="history"
                      color={color}
                      size={size}
                    />
                  )}
                  label="History"
                  onPress={() => { props.navigation.navigate('History') }}
                />
              </Drawer.Section>


            </View>
          </DrawerContentScrollView>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="sign-out"
                  color={color}
                  size={size}
                />
              )}
              label='Logout'
              onPress={async () => {
                const temp = await AsyncStorage.removeItem('token');
                const temp1 = await AsyncStorage.removeItem('isAdmin');
                const temp2 = await AsyncStorage.removeItem('isUser');
								await props.navigation.navigate('Login')
              }}
            />
          </Drawer.Section>
        </View>
      )
    }

  }

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
