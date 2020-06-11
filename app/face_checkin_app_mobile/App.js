import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerContent } from './routers/DrawerContent';
import LoginScreen from './screens/LoginScreen';
import CheckinScreen from './screens/CheckinScreen';
import HistoryScreen from './screens/HistoryScreen';
import ManageUserScreen from './screens/ManageUserScreen';
import AddUserScreen from './screens/AddUserScreen';
import HistoryUserScreen from './screens/HistoryUserScreen';


const Drawer = createDrawerNavigator();

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      isLogin: false,
      isAdmin: false
    }
  }
  render() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Checkin" drawerContent={props => <DrawerContent isLogin={this.state.isLogin} isAdmin={this.state.isAdmin}{...props}/>}>
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Checkin" component={CheckinScreen} />
        <Drawer.Screen name="History" component={HistoryScreen} />
        <Drawer.Screen name="ManageUser" component={ManageUserScreen}/>
        <Drawer.Screen name="AddUser" component={AddUserScreen} />
        <Drawer.Screen name="HistoryUser" component={HistoryUserScreen}/>

      </Drawer.Navigator>
    </NavigationContainer>
  );
  }
}
export default App;

