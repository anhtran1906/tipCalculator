import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import CustomNavBar from './CustomNavBar.js';
import Calculator from './Calculator.js';
import Setting from './Settings.js';


export default class PRanger extends Component{
  constructor(props){
    super(props);
    this.state = {
      sceneTransition : null
    }
  }
  // Render
  render(){
    return (
      <Navigator
      initialRoute={{id: 'CalculatorPage', sceneTransition: 'FloatFromRight'}}
      renderScene={this.renderScene.bind(this)}
      configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromRight;
      }}
      navigationBar={CustomNavBar}
      configureScene={this.configureScene.bind(this)}
      />
    );
  }
  // To navigate to page based on page ID
  renderScene(route, navigator) {
    switch (route.id) {
      case 'CalculatorPage':
        return (
          <Calculator navigator={navigator}/>
        );
        break;
      case 'SettingPage':
        return (<Setting navigator={navigator}/>
        );
        break;
      default:
        break;
    }
  }
  // config scene transition, change scene transition based on Setting
  configureScene(route, routeStack){
    //@Todo, change to scene transition from Asynstorage vale
    this.getSceneTransition();
    console.log("transition", this.state.sceneTransition);

    switch (this.state.sceneTransition) {
      case 'FloatFromLeft':
        return Navigator.SceneConfigs.FloatFromLeft;
        break;
      case 'FloatFromBottom':
        return Navigator.SceneConfigs.FloatFromBottom;
        break;
      case 'FloatFromBottomAndroid':
        return Navigator.SceneConfigs.FloatFromBottomAndroid;
        break;
      case 'SwipeFromLeft':
        return Navigator.SceneConfigs.SwipeFromLeft;
        break;
      case 'HorizontalSwipeJump':
        return Navigator.SceneConfigs.HorizontalSwipeJump;
        break;
      case 'HorizontalSwipeJumpFromRight':
        return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
        break;
      default:
        return Navigator.SceneConfigs.FloatFromRight;
        break;
    }
  }
  async getSceneTransition() {
    try {
      var sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      this.setState({
        transition: sceneTransitionValue
      })
    } catch (error) {
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }
}
module.exports = PRanger
