import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import MainStyles from '../assets/styles/MainStyles'
import GLOBAL from '../global'

import { SearchBar } from '../components/SearchBar'

import { AlertSelection } from '../components/Helpers'

export default class ClientList extends Component {

    state = {
        searchvisible: false,
        show: true,
        loading: false,
        data: [],
        selection: []
      };

      componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener ('willFocus', () =>
          this.fetchData()
        );
      }


      fetchData = () => {
        this.setState({ 
          loading: true,
          selection: []
         })
    
        fetch('http://' + GLOBAL.host + ':3000/contacts')
          .then(response => response.json())
          .then(result => {
            result = result.map(item => {
              item.key = item.id.toString()
              item.isSelect = false
              item.selectedClass = MainStyles.list
              item.color = '#ff6600'
    
              return item
            })
    
            this.setState({
              loading: false,
              data: result,
              selection: []
            })
          })
          .catch(error => {
            this.setState({ loading: false })
            AlertSelection(error.message)
          })
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
            <TouchableOpacity style={styles.icon}>
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

    clientInitials = (fname, lname) => {
        return fname[0] + lname[0];
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
                <Text style={MainStyles.clientbadge}>{this.clientInitials(data.item.fname, data.item.lname)}</Text>  
            </View>
            <View style={MainStyles.clientcontentcontainer}>
                <Text style={[MainStyles.clientname, MainStyles.clientinfo]}> {data.item.fname} {data.item.lname} </Text>
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
            <SearchBar title="Clients" visible={searchvisible} navigation="" changevisibility={this.changeVisibility}  />
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

    const styles = StyleSheet.create({
        form: {
            marginLeft: 20,
            width: '85%'
        },
        item: {
            paddingTop: 5,
            paddingBottom: 5
        },
        button: {
            marginTop: 50,
            width: '60%',
            textAlign: 'center'
    
        },
        icon: {
            position: "absolute",
            bottom: 20,
            width: "100%",
            left: 320,
            zIndex: 1
          }
      })