import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import MainStyles from '../assets/styles/MainStyles'
import GLOBAL from '../global'

import { SearchBar } from '../components/SearchBar'

import { AlertSelection } from '../components/Helpers'

export default class ReminderList extends Component {

    state = {
        loading: false,
        searchvisible: false,
        show: true
      };

      changeVisibility = () => {
        this.setState({ 
            show: !this.state.show,
            searchvisible: !this.state.searchvisible
         });
    }

    addReminder = () => {
        this.props.navigation.navigate("AddReminder");
    }

    showNavigationButton = () => {
        return (
                <TouchableOpacity style={MainStyles.addicon}>
                <View>
                    <Icon
                    raised
                    reverse
                    name="plus"
                    type="font-awesome"
                    color="#67b100"
                    size={25}
                    onPress={() => this.addReminder()}
                    />
                </View>
                </TouchableOpacity> 
            )
        }

    render() {
        const { searchvisible, show } = this.state;

        const dynamicstyles = StyleSheet.create({
            content: {
                flex: 1,
                backgroundColor: '#fff',
                display: show ===  true ? 'flex' : 'none'
              }
        });

        if (this.state.loading) {
            return (
              <View style={MainStyles.loader}>
                <ActivityIndicator size='large' color={GLOBAL.headerBackground} />
              </View>
            )
          }

        return(
            <View style={MainStyles.container}>
            <SearchBar title="Reminders" visible={searchvisible} navigation="" changevisibility={this.changeVisibility} />
            <View style={dynamicstyles.content}>

           
            {this.showNavigationButton()}

             </View>   
            </View>
        )
    }

}