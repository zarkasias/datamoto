import React from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import SearchHeader from 'react-native-search-header';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

import MainStyles from '../assets/styles/MainStyles'
import GLOBAL from '../global'

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 86 : 106;
let visible = false;

const styles = StyleSheet.create({
    status: {
        zIndex: 10,
        elevation: 2,
        width: DEVICE_WIDTH,
        height: STATUSBAR_HEIGHT,
        backgroundColor: '#00348a'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        height: APPBAR_HEIGHT,
        backgroundColor: GLOBAL.headerBackground
    },
    label: {
        flexGrow: 1,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: `600`,
        textAlign: `left`,
        marginVertical: 8,
        paddingVertical: 3,
        color: `#f5fcff`,
        backgroundColor: `transparent`
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        marginTop: 40,
        borderRadius: 2,
        backgroundColor: `#ff5722`
    }
});

const showSearchBar = (searchRef, changevisibility) => {
    changevisibility();
    searchRef.current.show();
}



export const SearchBar = ({title, visible, changevisibility, navigation, screen}) => {

    const goBack = () => {
        navigation.goBack();
      }

    const searchHeaderRef = React.useRef(null);

    const dynamicstyles = StyleSheet.create({
        searchcontainer: {
            flex: visible === false ? 0 : 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#ffffff'
        }
});

    return (
        <View style = { dynamicstyles.searchcontainer }>
            <StatusBar barStyle = 'light-content' />
            <View style = { styles.status }/>
            <View style = { styles.header }>
            {navigation
            ? <TouchableOpacity style= {{ marginLeft: 10 }}  onPress={goBack}>
                <FontIcon name={"arrow-left"} size={20} color={'#f5fcff'} />
                </TouchableOpacity>
            : null}
                <Text style = { styles.label }> {title} </Text>
                <TouchableOpacity style= {{ marginRight: 20 }}  onPress={() => showSearchBar(searchHeaderRef, changevisibility) }>
                    <FontIcon name={"search"} size={25} color={'#f5fcff'} />
                </TouchableOpacity>
            </View>
            <SearchHeader
                ref = { searchHeaderRef }
                placeholder = 'Search...'
                entryAnimation =  'from-right-side'
                placeholderColor = 'gray'
                pinnedSuggestions = {[]}
                onClear = {() => {
                    console.log(`Clearing input!`);
                }}
                onHide = {() => {
                    changevisibility()
                }}
                onGetAutocompletions = {async (text) => {
                    console.log(screen)
                    console.log(text)
                    if (text) {
                        return [];
                    } else {
                        return [];
                    }
                }}

                onSearch = {async (event) => {
                    console.log(screen)
                    console.log(event.nativeEvent.text)
                    if (event.nativeEvent.text) {
                        if (screen === "client") {
                          (async () => {
                           const rawResponse = await fetch(GLOBAL.apiURL + '/json/listclient/', {
                             method: 'POST',
                             headers: {
                               'Accept': 'application/json',
                               'Content-Type': 'application/json'
                             },
                             body: JSON.stringify({
                               "apiKey": GLOBAL.apikey,
                               "authToken": GLOBAL.authToken,
                               "method": 'searchCustomer',
                               "batchStart": '0',
                               "batchCount": '40',
                               "client": [{"name":event.nativeEvent.text,"contact":[]}]
                           })
                           });
                           const content = await rawResponse.json();
                           console.log(content);
                           let result = content.client;
                           result = result.map(item => {
                               item.key = item.id.toString()
                               item.isSelect = false
                               item.selectedClass = MainStyles.list
                               item.color = '#ff6600'

                               if (item.contact) {
                                 item.fname = '';
                                 if (item.contact[0]) {
                                   item.fname = item.contact[0].fname
                                 }
                                 item.lname = '';
                                 if (item.contact[0]) {
                                   item.lname = item.contact[0].lname
                                 }
                                 item.city = '';
                                 if (item.contact[0]) {
                                   item.city = item.contact[0].city
                                 }
                                 item.email = '';
                                 if (item.contact[0]) {
                                   item.email = item.contact[0].email
                                 }
                               } else {
                                 item.fname = '';
                                 item.lname = '';
                                 item.city = '';
                                 item.email = '';
                               }
                               return item
                             })
                             return result;

                         })();
                       } else if (screen === "workorder") {

                       } else if (screen === "reminder") {

                       } else if (screen === "asset") {

                       }

                    } else {
                        return [];
                    }
                }}

            />
        </View>
    );
}
