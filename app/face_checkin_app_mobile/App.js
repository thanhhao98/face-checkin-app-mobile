import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerContent } from './screens/DrawerContent';
import LoginScreen from './screens/LoginScreen';
import CheckinScreen from './screens/CheckinScreen';
import HistoryScreen from './screens/HistoryScreen';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#0a4ff0" translucent = {true}/>
    <Button
      onPress={() => navigation.navigate('Checkin')}
      title="Checkin nào ae ơi"
    />
  </View>
  );
}



const Drawer = createDrawerNavigator();

const App=()=> {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Checkin" component={CheckinScreen} />
        <Drawer.Screen name="History" component={HistoryScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;