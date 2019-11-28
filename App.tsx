import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, YellowBox, Alert } from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome5'

import Login from './screens/Login';
import Logout from './screens/Logout';

//client stack
import ClientList from './screens/ClientList';
import ClientSheet from './screens/Client';

import AssetList from './screens/AssetList';
import AddAsset from './screens/AddAsset';

import AddClient from './screens/AddClient';
import AddClientDetails from './screens/AddClientDetails';

//workorder stack
import WorkOrderList from './screens/WorkOrderList';
import AddWorkOrder from './screens/AddWorkOrder';

//reminder stack
import ReminderList from './screens/ReminderList';
import AddReminder from './screens/AddReminder';

import GLOBAL from './global'


const ClientStack = createStackNavigator({
  Login:   { screen: Login },
  ClientList: { screen: ClientList },
  ClientSheet: { screen: ClientSheet },
  AddAsset: { screen: AddAsset },
  AssetList: { screen: AssetList },
  AddClient: { screen: AddClient },
  AddClientDetails: { screen: AddClientDetails },
  WorkOrderList: { screen: WorkOrderList },
  AddWorkOrder: { screen: AddWorkOrder },
  ReminderList: { screen: ReminderList },
  AddReminder: { screen: AddReminder }

},{
headerMode: 'none',
initialRouteName: 'Login',
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
  WorkOrderList: { screen: WorkOrderList },
  AddWorkOrder: { screen: AddWorkOrder }
}, {
  headerMode: 'none',
});

const ReminderStack = createStackNavigator({
  RminderList: { screen: ReminderList },
  AddReminder: { screen: AddReminder }
}, {
  headerMode: 'none',
});

const LogoutStack = createStackNavigator({
  RminderList: { screen: Logout }
}, {
  headerMode: 'none',
  navigationOptions:  ({ navigation }) => ({
    tabBarOnPress: (scene, jumpToIndex) => {
               if (GLOBAL.authToken) {
               return Alert.alert(   // Shows up the alert without redirecting anywhere
                   'Datamoto'
                   ,'Do you really want to logout?'
                   ,[
                     {text: 'Yes', onPress: () =>  { GLOBAL.authToken = null; navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }))}},
                     {text: 'Cancel'}
                    ]
               )}
           },
  })
});

const TabNavigation = createBottomTabNavigator({

  Clients: { screen: ClientStack },
  WorkOrders: { screen: WorkOrderStack },
  Reminders: { screen: ReminderStack },
  Logout: { screen: LogoutStack },
}, {
  initialRouteName: 'Clients',
  defaultNavigationOptions: ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => {
        const route = navigation.state.routeName
        const name = {
          'Clients' : 'user',
          'WorkOrders' : 'tasks',
          'Reminders' : 'bell',
          'Logout' : 'lock'

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
