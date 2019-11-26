import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import MainStyles from '../assets/styles/MainStyles'
import GLOBAL from '../global'

import { SearchBar } from '../components/SearchBar'

import { AlertSelection } from '../components/Helpers'

export default class WorkOrderList extends Component {

    state = {
        client: this.props.navigation.getParam('client', {}),
        searchvisible: false,
        show: true,
        loading: false,
        data: [],
        selection: []
      };

      componentDidMount() {
        client: this.props.navigation.getParam('client', {});
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
        console.log('this.state.client.id=');
        console.log(this.state.client.id);
        let clientid = this.state.client.id;
         (async () => {
          const rawResponse = await fetch(GLOBAL.apiURL + '/json/listworkorder/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "apiKey": GLOBAL.apikey,
              "authToken": GLOBAL.authToken,
              "method": 'getWorkorderList',
              "clientid": this.state.client.id,
              "worder": [{"clientid": clientid}],
              "batchStart": '0',
              "batchCount": '40'
          })
          });
          const wo = await rawResponse.json();
          console.log(wo.worder);
          let result = wo.worder;
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
        let workorder = this.state.data[index];

        let litm = undefined;
        (async () => {
         const rawResponse = await fetch(GLOBAL.apiURL + '/json/workorderwithclient/', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             "apiKey": GLOBAL.apikey,
             "authToken": GLOBAL.authToken,
             "method": 'getWorkorderWithClient',
             "id": workorder.id
         })
         });
         const wo = await rawResponse.json();
         //console.log('workorderwithclient...wp');
         //console.log(wo);
         litm = wo.workorder.lineItem;

         workorder.lineItem = litm;

         this.props.navigation.navigate("AddWorkOrder", {
           workorder,
           client: wo.client
         })
         })();
        /*
        const index = this.state.data.findIndex(
            item => data.item.id === item.id
        )
        this.props.navigation.navigate("AddWorkOrder", {
          workorder: this.state.data[index]
        }) */

      }

      addWorkOrder = () => {
        this.props.navigation.navigate("AddWorkOrder", {
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
                    onPress={() => this.addWorkOrder()}
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
        <View style={MainStyles.workordercontainer}>
            <View style={(data.item.status === 1 ? MainStyles.workorderdraft : MainStyles.workorderactive )} />
            <View style={MainStyles.workordercontentcontainer}>
                <View style={[MainStyles.clientinfo, MainStyles.workrow]}>
                    <Text style={MainStyles.clientname}> {data.item.clientName} </Text>
                    <Text style={MainStyles.clientdetail}> {data.item.orderDate} </Text>
                </View>
                <Text style={[MainStyles.clientdetail, MainStyles.clientinfo]}> {data.item.orderNumber} </Text>
                <View style={[MainStyles.clientinfo, MainStyles.workrow]}>
                    <Text style={(data.item.status === 1 ? MainStyles.orderdraft : MainStyles.orderactive)}> {(data.item.status === 1 ? "DRAFT" : "ACTIVE")} </Text>
                    <Text style={MainStyles.ordercost}>{data.item.currency} {data.item.ordertotal}</Text>
                </View>
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
            <SearchBar title="WorkOrders" visible={searchvisible} navigation="" changevisibility={this.changeVisibility} />
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
