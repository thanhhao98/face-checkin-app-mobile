import React from 'react';
import { StyleSheet, View, Text , FlatList} from 'react-native';
import { Title, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native/Libraries/NewAppScreen';

// import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';


export default class HistoryScreen extends React.Component {
    constructor () {
        super();

        this.state = {
            date: '15-05-2018',
            data: [
                // {checkin: '27-3-2020 08:31', checkout: '27-3-2020 08:31'},
                {date: '27-3-2020 08:31', status: 'check-in'},
                {date: '27-3-2020 17:31', status: 'check-out'},
                {date: '28-3-2020 08:30', status: 'check-in'},
                {date: '28-3-2020 17:32', status: 'check-out'},
                {date: '29-3-2020 08:28', status: 'check-in'},
                {date: '29-3-2020 17:35', status: 'check-out'},
                {date: '30-3-2020 08:35', status: 'check-in'},
                {date: '30-3-2020 17:32', status: 'check-out'},
                {date: '27-3-2020 08:31', status: 'check-in'},
                {date: '27-3-2020 17:31', status: 'check-out'},
                {date: '28-3-2020 08:30', status: 'check-in'},
                {date: '28-3-2020 17:32', status: 'check-out'},
                {date: '29-3-2020 08:28', status: 'check-in'},
                {date: '29-3-2020 17:35', status: 'check-out'},
                {date: '30-3-2020 08:35', status: 'check-in'},
                {date: '30-3-2020 17:32', status: 'check-out'}
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
               
                
                {/* <View style={{ alignSelf: "stretch", marginTop:25, marginBottom: 30, backgroundColor: "#4179f7" }}>
                    <Title style={{ marginTop:25, marginLeft:40, marginBottom: 30, color: 'white'}}>Manage History</Title>
                </View> */}

            {/* <View style={styles.headerContainer}>
                <View style={styles.inputContainer}>
                    <FontAwesome name='search' size={24} color="#969696"/>
                    <Text>Search date</Text>
                </View>
            </View> */}

            <DatePicker
                style={{ width: 200, marginTop:25 }}
                date={this.state.date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2016"
                maxDate="01-01-2019"
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
                    marginLeft: 36,
                    },
                }}
                onDateChange={date => {
                    this.setState({ date: date });
                }}
            />

               
            <FlatList
                style={styles.list}
                const data = {this.state.data}
                renderItem={({item}) => <View 
                                            style={{ flex:1, 
                                                     flexDirection: "row",
                                                     borderBottomColor: '#ddd',
                                                     borderBottomWidth:2,
                                                   }}    
                                        >
                                            <Text style={styles.item}>{item.date}</Text>
                                            <Text style={styles.item}>{item.status}</Text>
                                        </View>}
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
    statusbar: {
        backgroundColor: '#FFCE00',
        height: 20
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
        marginTop: 25,
        alignSelf: 'stretch',
        maxHeight: 420
    },
    item: {
        paddingLeft: 50,
        padding: 10,
        fontSize: 18,
        height: 44,
      },
})