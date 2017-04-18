/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  Button,
  View
} from 'react-native';

import Calculator from "./App/Calculator.js";
import Setting from './App/Settings.js';

export default class PreworkCalculator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{id: 'CalculatorPage', title: 'Tip Calculator Page'}}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case 'CalculatorPage':
              return <Calculator navigator= {navigator} />
              break;
            case 'BlankPage':
              return (
                <View>
                  <Button
                    style={{width:10, flex:0.1}}
                    title="Go Back"
                    onPress={() => navigator.pop({id:"CalculatorPage"})}
                  />

                  <View style={{flexDirection:'column'}}>
                      <Setting />
                  </View>

                </View>
              )
              break;
            default:
          }
        }}
        />
    );
  }
}

AppRegistry.registerComponent('PreworkCalculator', () => PreworkCalculator);
