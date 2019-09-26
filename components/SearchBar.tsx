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
 
export const SearchBar = ({title, visible, changevisibility}) => {
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
                pinnedSuggestions = {[ `react-native-search-header`, `react-native`, `javascript` ]}
                onClear = {() => {
                    console.log(`Clearing input!`);
                }}
                onHide = {() => {
                    changevisibility()
                }}
                onGetAutocompletions = {async (text) => {
                    if (text) {
                        const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                            method: `get`
                        });
                        const data = await response.json();
                        return data[1];
                    } else {
                        return [];
                    }
                }}
                onSearch = {(event) => {
                    console.log(event.nativeEvent.text);
                }}
            />
        </View>
    );
}
 
