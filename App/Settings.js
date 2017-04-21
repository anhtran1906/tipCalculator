import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  Modal,
  Slider,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Picker
} from 'react-native';

export default class Setting extends Component{
  constructor(props){
    super(props);
    this.state = {
      sceneTransition: 0,
      scene: 0,
      percentage: 10
    }
  }

  // action to set select value to AsyncStorage
  setSelectSceneTransition(scene){
    try {
      this.setSceneTransition(scene);
      this.setState({
        scene: scene
      });
    } catch (error) {
      console.log("Oop!! Something went wrong !!!" + error);
    }
  }
  // set data to AsyncStorage
  async setSceneTransition(scene){
    try{
      await AsyncStorage.setItem('SCENE_SELECTED', scene);
      this.setState({
        sceneTransition : scene
      });
    }catch(error){
      console.log("Hmm, something when wrong when set data..." + error);
    }
  }
  // get data to AsyncStorage
  async getSceneTransition(){
    try{
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      // Store value to State
      this.setState({
        sceneTransition : sceneTransitionValue
      });
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  onPercentageChange(percent){
    this.setState({
      percentage: percent
    })
  }

  async handlePercentageChange(percent){
    try{
      await AsyncStorage.setItem('PERCENT_', String(percent));
    }
    catch(error){
      console.log(error);
    }
  }

  async getPercentage(){
    try{
      let percent = await AsyncStorage.getItem('PERCENT_');
      this.setState({"percentage": parseFloat(percent)});
    }
    catch(error){
      console.log(error);
    }
  }

  // this method will be called when scene loaded
  componentDidMount(){
    this.getSceneTransition();
    this.getPercentage();
  }
  render(){
    return(
      <View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Scene Transitions</Text>
          <Picker
            style={styles.picker}
            selectedValue={this.state.sceneTransition}
            onValueChange={(scene) => this.setSelectSceneTransition(scene)}>
            <Picker.Item label="FloatFromRight" value="FloatFromRight" />
            <Picker.Item label="FloatFromLeft" value="FloatFromLeft" />
            <Picker.Item label="FloatFromBottom" value="FloatFromBottom" />
            <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid" />
            <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft" />
            <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump" />
            <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight" />
          </Picker>
        </View>

        <View style ={styles.itemContainer}>
        <Text style={styles.itemTitle}> Default percentage: {this.state.percentage}% </Text>
        <Text style={{marginTop: 10}}> Slide to change </Text>
        <Slider
          style = {styles.slider}
          percent={this.state.percentage}
          minimumValue={0}
          maximumValue={100}
          step={5}
          onValueChange={(percent) => this.onPercentageChange(percent)}
          onSlidingComplete={(percent) => this.handlePercentageChange(percent)}
        />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
  },
  itemTitle: {
    fontSize:20,
    marginTop:50,
  },
  picker: {
    marginLeft: 30,
    marginTop: -10,
  },
  modalContainer: {
       flex: 1,
       justifyContent: "center",
       padding: 20,
       backgroundColor: "rgba(0,0,0,0.5)",
   },
   modalInnerContainer: {
       borderRadius: 10,
       padding: 20,
       backgroundColor: '#fff',
   },
   slider: {
       marginTop: 10,
       marginBottom: 20,
   },
   lastSlider: {
       marginTop: 10,
   }
});
module.exports = Setting
