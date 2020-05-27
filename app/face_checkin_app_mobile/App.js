import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerContent } from './screens/DrawerContent';
import LoginScreen from './screens/LoginScreen';
import CheckinScreen from './screens/CheckinScreen';
import HistoryScreen from './screens/HistoryScreen';
import ManageUser from './screens/ManageUser';
// import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HistoryStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor:"#4179f7",
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
      
    }
  }}>
    <Stack.Screen 
      name="History" component={HistoryScreen} 
      options={{
        title:'Manage History',
        headerLeft: () => (
          <Icon.Button 
            name="ios-menu" 
            size={28} 
            backgroundColor="#4179f7" 
            onPress={()=>navigation.openDrawer()}>
          </Icon.Button>
        )
      }}
    />
  </Stack.Navigator>
);

const CheckinStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor:"#4179f7",
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
      
    }
  }}>
    <Stack.Screen 
      name="Checkin" component={CheckinScreen} 
      options={{
        title:'Checkin',
        headerLeft: () => (
          <Icon.Button 
            name="ios-menu" 
            size={28} 
            backgroundColor="#4179f7" 
            onPress={()=>navigation.openDrawer()}>
          </Icon.Button>
        )
      }}
    />
  </Stack.Navigator>
);

const LoginStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor:"#4179f7",
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
      
    }
  }}>
    <Stack.Screen 
      name="Login" component={LoginScreen} 
      options={{
        title:'Login',
        headerLeft: () => (
          <Icon.Button 
            name="ios-menu" 
            size={28} 
            backgroundColor="#4179f7" 
            onPress={()=>navigation.openDrawer()}>
          </Icon.Button>
        )
      }}
    />
  </Stack.Navigator>
);

const ManageUserStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor:"#4179f7",
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
      
    }
  }}>
    <Stack.Screen 
      name="ManageUser" component={ManageUser} 
      options={{
        title:'Manage User',
        headerLeft: () => (
          <Icon.Button 
            name="ios-menu" 
            size={28} 
            backgroundColor="#4179f7" 
            onPress={()=>navigation.openDrawer()}>
          </Icon.Button>
        )
      }}
    />
  </Stack.Navigator>
);

const App=()=> {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Checkin" drawerContent={props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Login" component={LoginStackScreen} />
        <Drawer.Screen name="Checkin" component={CheckinStackScreen} />
        <Drawer.Screen name="History" component={HistoryStackScreen} />
        <Drawer.Screen name="ManageUser" component={ManageUserStackScreen}/>

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;

