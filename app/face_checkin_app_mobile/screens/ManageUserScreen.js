import React from 'react';
import { StyleSheet, View, Text, TextInput, StatusBar, FlatList, AsyncStorage}  from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/header'
import {SERVER_IP} from '../Config'

export default class ManageUserScreen extends React.Component {
    constructor () {
        super();

        this.state = {
            date: '',
            data: [
                {
                    username:'thuan',
                    userId: '10'
                },
                {
                    username:'ronaldo',
                    userId:'2'
                },
                {
                    username:'benzema',
                    userId: '3'
                },
                {
                    username:'bruyne',
                    userId:'7'
                }
            ],
        }
        
    }

	async componentDidMount(){
				 let token = await AsyncStorage.getItem('token') || false;
				 let res = await fetch(SERVER_IP+'api/v1/listUser', {
						 method: 'GET',
						 headers: {
								 'Accept': 'application/json',
								 'Content-Type': 'application/json',
								 'x-access-token': token,
						 },
				 });
				 let response = await res.json();
			   console.log(response)
				 this.setState({
						 data:response.data.listUsers
				 })

		 }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#0a4ff0" translucent = {true}/>
                <Header title="Manage User" navigation={this.props.navigation} isStatus={true}/>
                <FlatList
                style={styles.list}
                const data = {this.state.data}
                keyExtractor = {(item,index)=> index.toString()}
                renderItem={
                ({item}) => 
                <TouchableOpacity
                    style={{ 
                    flex:1, 
                    flexDirection: "row",
                    borderBottomColor: '#ddd',
                    borderBottomWidth:2,
                    }}
                    onPress={()=>this.props.navigation.navigate('HistoryUser',{data:item.userId})}
                >
                
                <Text style={styles.item}>{item.username}</Text>
                </TouchableOpacity>}
                />
               
            
           
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    headerContainer :{
        backgroundColor: "#ddd",
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row'
    },
    inputContainer: {
        flexDirection: 'row'
        // backgroundColor:'#ccc'
    },
    list: {
        marginLeft:20,
        marginRight:20,
        marginTop: 25,
        alignSelf: 'stretch',
        maxHeight: 420
    },
    item: {
        // paddingLeft: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        fontSize: 18,
        height: 44,
      },
})
