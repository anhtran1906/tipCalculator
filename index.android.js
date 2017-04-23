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
 import PowerRanger from './App/Powerranger.js';

 export default class PreworkCalculator extends Component {
   render() {
     return (
       <PowerRanger />
     );
   }
 }


 AppRegistry.registerComponent('PreworkCalculator', () => PreworkCalculator);
