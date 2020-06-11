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
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const HistoryStackScreen = ({ navigation }) => (
//   <Stack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor:"#4179f7",
//     },
//     headerTintColor: "white",
//     headerTitleStyle: {
//       fontWeight: "bold",
      
//     }
//   }}>
//     <Stack.Screen 
//       name="History" component={HistoryScreen} 
//       options={{
//         title:'Manage History',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-menu" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.openDrawer()}>
//           </Icon.Button>
//         )
//       }}
//     />
//   </Stack.Navigator>
// );

// const CheckinStackScreen = ({ navigation }) => (
//   <Stack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor:"#4179f7",
//     },
//     headerTintColor: "white",
//     headerTitleStyle: {
//       fontWeight: "bold",
      
//     }
//   }}>
//     <Stack.Screen 
//       name="Checkin" component={CheckinScreen} 
//       options={{
//         title:'Checkin',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-menu" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.openDrawer()}>
//           </Icon.Button>
//         )
//       }}
//     />
//   </Stack.Navigator>
// );

// const LoginStackScreen = ({ navigation }) => (
//   <Stack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor:"#4179f7",
//     },
//     headerTintColor: "white",
//     headerTitleStyle: {
//       fontWeight: "bold",
      
//     }
//   }}>
//     <Stack.Screen 
//       name="Login" component={LoginScreen} 
//       options={{
//         title:'Login',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-menu" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.openDrawer()}>
//           </Icon.Button>
//         )
//       }}
//     />
//     <Stack.Screen 
//       name="History" component={HistoryScreen} 
//       options={{
//         title:'History',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-menu" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.openDrawer()}>
//           </Icon.Button>
//         )
//       }}
//     />
//     <Stack.Screen 
//       name="AddUser" component={AddUserScreen} 
//       options={{
//         title:'Add New User',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-arrow-round-back" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.goBack()}>
//           </Icon.Button>
//         )
//       }}
//     />
//     <Stack.Screen 
//       name="ManageUser" component={ManageUserScreen} 
//       options={{
//         title:'Manage User',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-menu" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.openDrawer()}>
//           </Icon.Button>
//         ),
//         headerRight:() => (
//           <Icon.Button
//             name="ios-add"
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.navigate('AddUser')}>

//           </Icon.Button>
//         )
//       }}
//     />
//     <Stack.Screen 
//       name="Checkin" component={CheckinScreen} 
//       options={{
//         title:'Checkin',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-menu" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.openDrawer()}>
//           </Icon.Button>
//         )
//       }}
//     />
//   </Stack.Navigator>
// );

// const ManageUserStackScreen = ({ navigation }) => (
//   <Stack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor:"#4179f7",
//     },
//     headerTintColor: "white",
//     headerTitleStyle: {
//       fontWeight: "bold",
      
//     }
//   }}>
//     <Stack.Screen 
//       name="ManageUser" component={ManageUserScreen} 
//       options={{
//         title:'Manage User',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-menu" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.openDrawer()}>
//           </Icon.Button>
//         ),
//         headerRight:() => (
//           <Icon.Button
//             name="ios-add"
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.navigate('AddUser')}>

//           </Icon.Button>
//         )
//       }}
//     />
//   </Stack.Navigator>
// );

// const AddUserStackScreen = ({ navigation }) => (
//   <Stack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor:"#4179f7",
//     },
//     headerTintColor: "white",
//     headerTitleStyle: {
//       fontWeight: "bold",
      
//     }
//   }}>
//     <Stack.Screen 
//       name="AddUser" component={AddUserScreen} 
//       options={{
//         title:'Add New User',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-arrow-round-back" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.goBack()}>
//           </Icon.Button>
//         )
//       }}
//     />
//     <Stack.Screen 
//       name="History" component={HistoryScreen} 
//       options={{
//         title:'Manage History',
//         headerLeft: () => (
//           <Icon.Button 
//             name="ios-menu" 
//             size={28} 
//             backgroundColor="#4179f7" 
//             onPress={()=>navigation.openDrawer()}>
//           </Icon.Button>
//         )
//       }}
//     />
//   </Stack.Navigator>
// );

// const App=()=> {

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

      </Drawer.Navigator>
    </NavigationContainer>
  );
  }
}
export default App;

