import React from 'react';
import { StyleSheet, View, Text , FlatList, Dimensions, StatusBar} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-paper';
import Header from '../components/header' 

var devicewidth = Dimensions.get('window').width;

function Item({ title, checkin, checkout }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <View style={ {flexDirection:'row', justifyContent: "space-between"} }>
            <Text style={styles.checkin}>Checkin: {checkin}</Text>
            <Text style={styles.checkout}>Checkout: {checkout}</Text>
        </View>
      </View>
    );
  }

export default class HistoryScreen extends React.Component {
    
    constructor (props) {
        super(props);
        // console.log(props.navigation.getParam('respone'))
        this.state = {
            date: '',
            alldata:[],
            data: [],
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.route.params !== prevProps.route.params) {
            const {data} =  this.props.route.params;
            this.setState({
                data: data.data,
                alldata: data.data,
            })

            console.warn(data,'111111111111111111111111111111')
        }
    }
    checkinLate(){
        const data = this.state.alldata.filter(item=>{
            return !item.checkin.onTime
        })
        this.setState({data})
        console.log(data,'55555555555555555555555')
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#0a4ff0" translucent={true} />
                <Header title="Manage History" navigation={this.props.navigation} />
                <DatePicker
                    style={styles.datepicker}
                    date={this.state.date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Search Date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2016"
                    maxDate="01-01-2025"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                        },
                        dateInput: {
                            marginLeft: 40,
                            borderRadius:10,
                            borderWidth:2,
                            height: 45,
                            fontSize: 20
                        },
                    }}
                    onDateChange={date => {
                        const day = date.toString().substring(0,2); 
                        const month = date.toString().substring(3,5);
                        const year = date.toString().substring(6,10);
                        const formatDay =  new Date (year+'-'+month+'-'+day);
                        const SearchDay = formatDay.toString().substring(0,16);
                        const new_data = this.state.alldata.filter(item => item.checkin.time.includes(SearchDay))
                        this.setState({ date: date, data:new_data });
                    }}
                />
                <View style={{ flexDirection:"row" }}>
                    <Button onPress={()=>this.setState({data:this.state.alldata})}> Show All</Button>
                    <Button onPress={()=>{this.checkinLate()}}>Checkin Late</Button>
                </View>
                <FlatList
                    style={styles.flatlist}
                    const data = {this.state.data}
                    renderItem={({item}) => 
                    <Item 
                        title={item.checkin.time.substring(0,16)} 
                        checkin={item.checkin.time.substring(17,25)} 
                        checkout={item.checkout.time.substring(17,25)}
                    />}
                    keyExtractor={(item, index) => index.toString()} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
    },
    datepicker: {
        marginTop: '12%',
        width: devicewidth*0.8,
    },  
    flatlist: {
        marginLeft:20,
        marginRight:20, 
        marginTop:10,
        width: devicewidth
    },  
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 16,
        marginLeft: 16,
        marginRight:16
    },
    title: {
        fontSize:20
    },
    checkin: {
        fontSize: 18
    },
    checkout: {
        fontSize:18
    }
   
})