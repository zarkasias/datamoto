import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Form, Item, Input, Label, Text, Button } from 'native-base';

import { CustomHeader } from '../components/Header'

import MainStyles from '../assets/styles/MainStyles'
import FormStyles from '../assets/styles/FormStyles'
import GLOBAL from '../global'
import { Root } from "native-base";
import { AppLoading } from "expo";
import * as Font from "expo-font";


export default class Login extends Component {


    state = {
        username: '',
        password: undefined,
        loading: false
    }

    async componentWillMount() {
      await Font.loadAsync({
        Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf")
      });
      this.setState({ loading: true });
    }

    loginApplication = () => {
        if (!this.state.username || this.state.username.length <5 || !this.state.password || this.state.password.length < 4) {
          alert ('Please provide correct username and password!');
          return;
        }
        (async () => {
            const rawResponse = await fetch(GLOBAL.apiURL + '/json/apikeygen/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "username": this.state.username.trim(),
                "password": this.state.password,
            })
            });
            const content = await rawResponse.json();
            console.log(content);
            if (!content.apiKey) {
              alert ('Please provide correct username and password!');
              return;
            }
            this.state.password = '',
            GLOBAL.apikey = content.apiKey;
            GLOBAL.authToken = content.authToken;
            GLOBAL.companyId = content.companyId;
            GLOBAL.term = content.term;
            GLOBAL.tax = content.tax;
            GLOBAL.ship = content.ship;
            GLOBAL.mou = content.mou;
            GLOBAL.username = this.state.username.trim();

            console.log('tax=');
            console.log(GLOBAL.tax);
            console.log('term=' + GLOBAL.term);
            console.log('ship=' + GLOBAL.ship);
            console.log('mou=' + GLOBAL.mou);

            this.props.navigation.navigate("ClientList");
          })();
    }

    render() {

      if (!this.state.loading) {
          return <AppLoading />;
        }

        let logo = <Image key={0} style={{width: 129, height: 29, marginRight: 20}} source={require('../assets/logo.png')} />;

        return(
            <View style={MainStyles.container}>
            <CustomHeader title="Datamoto" navigation={''} buttons={[logo]} />
            <View style={FormStyles.content}>

                <Form style={FormStyles.loginform}>
                    <Item floatingLabel style={FormStyles.item}>
                    <Label>Username</Label>
                    <Input onChangeText={(e) => this.setState({username: e})}  autoCapitalize= 'none' autoCompleteType= 'email'/>
                    </Item>
                    <Item floatingLabel last style={FormStyles.item}>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={(e) => this.setState({password: e})}  autoCapitalize= 'none' />
                    </Item>

                    <Button block style={FormStyles.button} onPress={() => this.loginApplication()}>
                        <Text>Login</Text>
                    </Button>
                </Form>

             </View>
            </View>
        )
    }
}
