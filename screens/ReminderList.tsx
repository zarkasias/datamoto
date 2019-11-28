import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList, BackHandler } from 'react-native'
import { Icon } from 'react-native-elements'

import MainStyles from '../assets/styles/MainStyles'
import GLOBAL from '../global'

import { SearchBar } from '../components/SearchBar'

import { AlertSelection } from '../components/Helpers'

export default class ReminderList extends Component {

    state = {
        client: this.props.navigation.getParam('client', {}),
        clientID: this.props.navigation.getParam('clientId', undefined),
        loading: false,
        searchvisible: false,
        show: true,
        loading: false,
        data: [],
        selection: []
      };

      componentDidMount() {
        this.state.clientID = this.props.navigation.getParam('clientId', undefined);
        this.state.client = this.props.navigation.getParam('client', {});
        const { navigation } = this.props;
        navigation.addListener ('willFocus', () =>
          this.fetchData()
        );
      }

      fetchData = () => {
        this.setState({
            loading: true,
            selection: []
        });

          (async () => {
            console.log('reminders...');
            let mthd = 'getCustomerReminderAllList';
            //if (this.state.client.id) {
            if (this.state.clientID) {
              mthd = 'getCustomerReminderList';
            }
            console.log('reminders...:' + mthd);
            /*
            let clientid = undefined;
            if (this.state.client.id) {
              clientid = this.state.client.id
            }
            console.log('reminders...:' + clientid);
            */
           const rawResponse = await fetch(GLOBAL.apiURL + '/json/listclientreminder/', {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               "apiKey": GLOBAL.apikey,
               "authToken": GLOBAL.authToken,
               "method": mthd,
               "clientid": this.state.clientID,
               "batchStart": '0',
               "batchCount": '100'
           })
           });
           var reminders = await rawResponse.json();
           console.log(reminders);

           let result = reminders.cReminder;
           result = result.map(item => {
               item.key = item.id.toString()
               return item
             })

           this.setState({
             loading: false,
             data: result,
             selection: []
           });
         })();
      }

      selectItem = data => {
        const index = this.state.data.findIndex(
            item => data.item.id === item.id
          )
           this.props.navigation.navigate("AddReminder", {
            reminder: this.state.data[index],
            client: this.state.client
          })
      }

    addReminder = () => {
      this.props.navigation.navigate("AddReminder", {
        client: this.state.client
      });
    }


      changeVisibility = () => {
        this.setState({
            show: !this.state.show,
            searchvisible: !this.state.searchvisible
         });
    }

    showNavigationButton = () => {
        return (
                this.state.client.id &&
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

        renderItem = data =>
            <TouchableOpacity
            style={[
                MainStyles.list,
                data.item.selectedClass
            ]}
            onPress={() => this.selectItem(data)}
            >
            <View style={MainStyles.clientcontainer}>
                <View style={MainStyles.clientcontentcontainer}>
                    <Text style={[MainStyles.clientname, MainStyles.clientinfo]}> {data.item.companyName} </Text>
                    <Text style={[MainStyles.assetdetail, MainStyles.assetinfo]}> Note: {data.item.log} </Text>
                    <Text style={[MainStyles.assetdetail, MainStyles.assetinfo]}> Due: {data.item.pendingActivityDate} </Text>
                    <Text style={[MainStyles.assetdetail, MainStyles.assetinfo]}> By: {data.item.userWhoCreated} </Text>
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
            {this.state.clientID ?
            <SearchBar title="Reminders" visible={searchvisible} navigation={this.props.navigation} changevisibility={this.changeVisibility} />
            : <SearchBar title="Reminders" visible={searchvisible} navigation="" changevisibility={this.changeVisibility} />
            }
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
