import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList, BackHandler } from 'react-native'
import { Icon } from 'react-native-elements'

import MainStyles from '../assets/styles/MainStyles'
import GLOBAL from '../global'

import { SearchBar } from '../components/SearchBar'

import { AlertSelection } from '../components/Helpers'
var Promise = require('promise');

/*
const getContact =  => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve(users.id), 500)
  })
}
*/

export default class ClientList extends Component {

    state = {
        searchvisible: false,
        show: true,
        loading: false,
        data: [],
        selection: [],
      };

      componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener ('willFocus', () =>
          this.fetchData()
        );
        this.backHandler = this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          return true;
        });
      }

      componentWillUnmount() {
          this.backHandler.remove();
      }

      fetchData = () => {

        this.setState({
            loading: true,
            selection: []
        });

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
              "method": 'getCustomerList',
              "batchStart": '0',
              "batchCount": '40'
          })
          });
          const content = await rawResponse.json();
          //console.log(content);
          let result = content.client;
          result = result.map(item => {
              item.key = item.id.toString()
              item.isSelect = false
              item.selectedClass = MainStyles.list
              item.color = '#ff6600'

              if (item.contact) {
                item.name = item.name;
                item.city = '';
                if (item.contact[0]) {
                  item.city = item.contact[0].city
                }
                item.email = '';
                if (item.contact[0]) {
                  item.email = item.contact[0].email
                }
              } else {
                item.name = '';
                //item.lname = '';
                item.city = '';
                item.email = '';
              }
              return item
            })

            this.setState({
              loading: false,
              data: result,
              selection: []
            });
        })();
        console.log('Hello....................');
      }


      selectItem = data => {
        const index = this.state.data.findIndex(
            item => data.item.id === item.id
          )
           this.props.navigation.navigate("ClientSheet", {
            client: this.state.data[index]
          })
      }

    addClient = () => {
      this.props.navigation.navigate("AddClient");
    }

    changeVisibility = () => {
        this.setState({
            show: !this.state.show,
            searchvisible: !this.state.searchvisible
         });
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
                onPress={() => this.addClient()}
                />
            </View>
            </TouchableOpacity>
        )
    }

    clientInitials = (name) => {
        s = "";
        if (name) {
          let compname = name.split(" ", 2);
          s = compname[0].charAt(0);
          if (compname.length > 1) {
            s = s + compname[1].charAt(0);
          } else if (compname[0].charAt(1)) {
            s = s + compname[0].charAt(1);
          } else {
            s = s + compname[0].charAt(0);
          }
        }
        return s.toUpperCase();
    };

    renderItem = data =>
        <TouchableOpacity
        style={[
            MainStyles.list,
            data.item.selectedClass
        ]}
        onPress={() => this.selectItem(data)}
        >
        <View style={MainStyles.clientcontainer}>
            <View style={[MainStyles.clientbadgecontainer, MainStyles.clientinitialscontainer]}>
                <Text style={MainStyles.clientbadge}>{this.clientInitials(data.item.name)}</Text>
            </View>
            <View style={MainStyles.clientcontentcontainer}>
                <Text style={[MainStyles.clientname, MainStyles.clientinfo]}> {data.item.name} </Text>
                <Text style={[MainStyles.clientdetail, MainStyles.clientinfo]}> {data.item.city} </Text>
                <Text style={[MainStyles.clientdetail, MainStyles.clientinfo]}> {data.item.email} </Text>
            </View>
        </View>

        </TouchableOpacity>

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
            <SearchBar title="Clients" visible={searchvisible} navigation="" changevisibility={this.changeVisibility} screen="client" />
            <View style={dynamicstyles.content}>

            <FlatList
                data={this.state.data}
                renderItem={item => this.renderItem(item)}
                idExtractor={item => item.id.toString()}
                extraData={this.state}
                style={MainStyles.List}
            />


            {this.showNavigationButton()}

             </View>
            </View>
        )
    }

}
