import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import MainStyles from '../assets/styles/MainStyles'
import GLOBAL from '../global'

import { SearchBar } from '../components/SearchBar'

import { AlertSelection } from '../components/Helpers'

export default class AssetList extends Component {

    state = {
        client: this.props.navigation.getParam('client', {}),
        searchvisible: false,
        show: true,
        loading: false,
        data: [],
        selection: []
      };

      componentDidMount() {
        client: this.props.navigation.getParam('client', {})
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
           const rawResponse = await fetch(GLOBAL.apiURL + '/json/listclientasset/', {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               "apiKey": GLOBAL.apikey,
               "authToken": GLOBAL.authToken,
               "method": 'getClientAssetList',
               "clientid": this.state.client.id,
               "batchStart": '0',
               "batchCount": '100'
           })
           });
           const assets = await rawResponse.json();
           console.log(assets);
           let result = assets.asset;
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
           this.props.navigation.navigate("AddAsset", {
            asset: this.state.data[index]
          })
      }

    addAsset = () => {
      this.props.navigation.navigate("AddAsset", {
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
            <TouchableOpacity style={MainStyles.addicon}>
            <View>
                <Icon
                raised
                reverse
                name="plus"
                type="font-awesome"
                color="#67b100"
                size={25}
                onPress={() => this.addAsset()}
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
                <Text style={[MainStyles.clientname, MainStyles.clientinfo]}> {data.item.description} </Text>
                <Text style={[MainStyles.assetdetail, MainStyles.assetinfo]}> Model: {data.item.model} </Text>
                <Text style={[MainStyles.assetdetail, MainStyles.assetinfo]}> Serial: {data.item.serialNo} </Text>
                <Text style={[MainStyles.assetdetail, MainStyles.assetinfo]}> Manufacturer: {data.item.manufacturer} </Text>
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
            <SearchBar title="Assets" visible={searchvisible} navigation={this.props.navigation} changevisibility={this.changeVisibility}  />
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
