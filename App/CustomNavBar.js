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
  Title
} from 'react-native';

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
          <Text>Save</Text>
        </TouchableOpacity>
      );
    }
    else{
      return (
        <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => {
          Keyboard.dismiss();
          navigator.push({id: 'SettingPage'});}
        }>
          <Text style={stylesCSS.headerFontSize}>Setting</Text>
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
});
// export this component
module.exports = (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper} />
)
