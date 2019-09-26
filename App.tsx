import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome5'

import Login from './screens/Login';

//client stack
import ClientList from './screens/ClientList';
import ClientSheet from './screens/Client';
import AddClient from './screens/AddClient';
import AddClientDetails from './screens/AddClientDetails';

//workorder stack
import WorkOrderList from './screens/WorkOrderList';

//reminder stack
import ReminderList from './screens/ReminderList';

import GLOBAL from './global'


const ClientStack = createStackNavigator({
  Login:   { screen: Login },
  ClientList: { screen: ClientList },
  ClientSheet: { screen: ClientSheet },
  AddClient: { screen: AddClient },
  AddClientDetails: { screen: AddClientDetails }

},{
headerMode: 'none',
initialRouteName: 'AddClientDetails',
navigationOptions:  ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index === 0) {
      tabBarVisible = true;  //set to false when Login is first screen
    }

    return {
      tabBarVisible
    }
}});

const WorkOrderStack = createStackNavigator({
  WorkOrderList: { screen: WorkOrderList }
}, {
  headerMode: 'none',
});

const ReminderStack = createStackNavigator({
  RminderList: { screen: ReminderList }
}, {
  headerMode: 'none',
});

const TabNavigation = createBottomTabNavigator({

  Clients: { screen: ClientStack },
  WorkOrders: { screen: WorkOrderStack },
  Reminders: { screen: ReminderStack }
}, {
  defaultNavigationOptions: ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => {
        const route = navigation.state.routeName
        const name = {
          'Clients' : 'user',
          'WorkOrders' : 'tasks',
          'Reminders' : 'bell'
        }[route]
        return <Icon name={name} color={tintColor} solid size={22} />
      },
      tabBarOptions: {
        safeAreaInset: { bottom: 'always', top: 'never'},
        style: {
          paddingTop: 10,
          borderTopColor: '#ccc',
          borderTopWidth: 0.5,
          backgroundColor: '#fff'
        }
      }
    }
  }
});


const Application = createAppContainer(TabNavigation)

export default class App extends Component {
  render() {

    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
      'forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?'
    ]);

    return (
      <SafeAreaView style={styles.safeArea}>
        <Application />
      </SafeAreaView> 
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GLOBAL.statusbarBackground
  }
})
