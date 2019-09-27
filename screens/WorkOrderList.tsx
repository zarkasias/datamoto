import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Form, Item, Input, Label, Text, Button } from 'native-base';

import { SearchBar } from '../components/SearchBar'

import { AlertSelection } from '../components/Helpers'

export default class WorkOrderList extends Component {

    state = {
        searchvisible: false,
        show: true
      };

      changeVisibility = () => {
        this.setState({ 
            show: !this.state.show,
            searchvisible: !this.state.searchvisible
         });
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

        return(
            <View style={styles.container}>
            <SearchBar title="WorkOrders" visible={searchvisible} navigation="" changevisibility={this.changeVisibility} />    
            <View style={dynamicstyles.content}>

            {/* <Form style={styles.form}>
                    <Item floatingLabel style={styles.item}>
                    <Label>Username</Label>
                    <Input onChangeText={(e) => this.setState({username: e})}  />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={(e) => this.setState({password: e})} />
                    </Item>
                    
                    <Button block style={styles.button} onPress={() => this.loginApplication()}>
                        <Text>Login</Text>
                    </Button>
                </Form> */}
            
             </View>   
            </View>
        )
    }

}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        form: {
            marginTop: 60,
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
    
        }
      })