import React from 'react';
import { StyleSheet, View, Text , FlatList, Dimensions} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
const time_data = [
    {
        checkin: {
            onTime: 'true',
            time: "Thu, 11 Jun 2020 01:33:10 GMT"
        },
        checkout: {
            onTime: 'false',
            time: "Thu, 11 Jun 2020 09:33:10 GMT"
        }
    },
    {
        checkin: {
            onTime: 'true',
            time: "Wed, 10 Jun 2020 02:33:10 GMT"
        },
        checkout: {
            onTime: 'false',
            time: "Wed, 10 Jun 2020 10:33:10 GMT"
        }
    },
    {
        checkin: {
            onTime: 'true',
            time: "Wed, 10 Jun 2020 03:33:10 GMT"
        },
        checkout: {
            onTime: 'false',
            time: "Wed, 10 Jun 2020 11:33:10 GMT"
        }
    },
    {
        checkin: {
            onTime: 'true',
            time: "Wed, 10 Jun 2020 04:33:10 GMT"
        },
        checkout: {
            onTime: 'false',
            time: "Wed, 10 Jun 2020 12:33:10 GMT"
        }
    },
    {
        checkin: {
            onTime: 'true',
            time: "Wed, 10 Jun 2020 01:33:10 GMT"
        },
        checkout: {
            onTime: 'false',
            time: "Wed, 10 Jun 2020 09:33:10 GMT"
        }
    },
    {
        checkin: {
            onTime: 'true',
            time: "Wed, 10 Jun 2020 02:33:10 GMT"
        },
        checkout: {
            onTime: 'false',
            time: "Wed, 10 Jun 2020 10:33:10 GMT"
        }
    },
    {
        checkin: {
            onTime: 'true',
            time: "Wed, 10 Jun 2020 03:33:10 GMT"
        },
        checkout: {
            onTime: 'false',
            time: "Wed, 10 Jun 2020 11:33:10 GMT"
        }
    },
    {
        checkin: {
            onTime: 'true',
            time: "Wed, 10 Jun 2020 04:33:10 GMT"
        },
        checkout: {
            onTime: 'false',
            time: "Wed, 10 Jun 2020 12:33:10 GMT"
        }
    }
]
export default class HistoryScreen extends React.Component {
    constructor () {
        super();

        this.state = {
            date: '',
            data: time_data
        }
    }

    render() {
        return (
            <View style={styles.container}>
               
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
                    const formatDay =  new Date (year, month, day);
                    // const SearchDay = formatDay.substring(0,16);
                    console.log(formatDay+ "aaaaaaaaaaaaaaaaaa")
                    const new_data = this.state.data.filter(item => item.checkin.time.includes("Thu, 11 Jun"))
                    console.log(new_data, "bbbbbbbbbbbbbbbbbbbbbbbbbbb")
                    this.setState({ date: date, data:new_data });
                }}
            />
            <View style={{ flexDirection:"row" }}>
                <Button onPress={()=>this.setState({data:time_data})}> Show All</Button>
                <Button>Checkin Late</Button>
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
        marginTop: 25,
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