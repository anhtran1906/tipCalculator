import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  LeftButton,
  RightButton,
  Keyboard,
  Title,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';


// export default class CustomNavBar extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//     }
//   }
// Defined controls
var NavigationBarRouteMapper = {
  LeftButton: (route, navigator, index, navState) =>{
    return
  },
  RightButton: (route, navigator, index, navState) => {
    if(route.id != 'CalculatorPage'){
      return (
        <TouchableOpacity style={stylesCSS.tabbarHeadr}
          onPress={() => {
            navigator.refresh = true;
            navigator.pop();}
          }>
          <Image
            style = {stylesCSS.icon}
            source={require('./ic_done_3x.png')}
          />
        </TouchableOpacity>
      );
    }
    else{
      return (
        <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => {
          Keyboard.dismiss();
          navigator.push({id: 'SettingPage'});}
        }>

        <Image
          style = {stylesCSS.icon}
          source={require('./ic_settings_3x.png')}
        />

        </TouchableOpacity>
      );
    }
  },
  Title: (route, navigator, index, navState) => {
    return;
  },
}
const stylesCSS = StyleSheet.create({
  tabbarHeadr: {
    marginTop: 3.5,
  },
  headerFontSize: {
    fontSize: 18,
  },
  icon: {
    width: 25,
    height: 25,
    opacity: 0.5,
    marginRight: 8.5
  },
});
// export this component
module.exports = (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper} />
)
