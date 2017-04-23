import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Animated,
  Slider,
} from 'react-native';
//import SegmentedControlTab from 'react-native-segmented-control-tab';
import * as Animatable from 'react-native-animatable';


export default class Cal extends Component{
  constructor(props){
    super(props);
    this.state = {
      //segmentSelectedIndex : 0,
      billAmount : 0,
      result: 0,
      tipAmount: 0,
      percentage: 10,
      duration: 1000,
      //fadeAnim: new Animated.Value(20), //opacity 0

    };
  }
// handleSegmentChange(index){
//   this.dismissKeyboard();
//   this.setState({
//     segmentSelectedIndex : index
//   })
//   this.handleBillAmountChange(this.state.billAmount,index);
// }
handleBillAmountChange(bill,percent){
  this.setState({
    billAmount : bill
  })

  // if(!index && index !=0){
  //   index = this.state.segmentSelectedIndex;
  // }

  bill = parseFloat(bill);
  //var percent = this.segmentValues()[index];
  var percent = percent
  percent = parseFloat(percent)/100; //0.1 0.5
  var result = bill + (bill*percent);

  this.setState({
    result: result,
    tipAmount : bill*percent
  })
}
segmentValues(){
  //return ["10%","15%","50%"];
  return this.state.percentage;
}
dismissKeyboard() {
  Keyboard.dismiss();
}
onPercentageChange(percent){
  this.setState({
      percentage: percent
  }
  )
}
handlePercentageChange(percent){
  this.dismissKeyboard();
  if(!percent && percent != 10 ){
    percent: this.state.percentage;
  }
  this.handleBillAmountChange(this.state.billAmount,percent);
}

async getPercentage(){
  console.log("Percentage");
  try{
    let percent = await AsyncStorage.getItem('PERCENT_');
    console.log(" " + percent);
    if(percent){
      this.setState({
        percentage: percent
      });
    }
    else{
      percent = parseFloat(this.state.percentage);
      this.setPercentage(percent);
    }
  }
  catch(error){
    console.log(error);
  }
}

async setPercentage(percent){
  try{
    await AsyncStorage.setItem('PERCENT_', String(percent));
  }
  catch(error){
    console.log(error);
  }
}

componentDidMount(){
  this.getPercentage();
  // Animated.timing(
  //   this.state.fadeAnim,
  //   {
  //     toValue: 1,
  //     duration: 2000,
  //   },
  // ).start();
}

render(){
  if (this.props.navigator.refresh) {
           this.props.navigator.refresh = false;
           this.getPercentage();
  }
    return(
      <TouchableWithoutFeedback onPress={()=>this.dismissKeyboard()}>
      <View style={styles.container}>
        <View>
          <Animatable.Text style={styles.baseText} animation="zoomInUp" iterationCount={1} direction="alternate">Tip Calculator</Animatable.Text>
        </View>
        <View>
          <Text style={styles.inputText}> Bill amount</Text>

          <TextInput style={styles.inputAmount}
            onChangeText = {(billAmount) => this.handleBillAmountChange(billAmount,this.state.percentage)}
            keyboardType={'numeric'}
            maxLength = {10}
            keyboardAppearance = 'dark'
            placeholder= '0'
            autoFocus={true}
            />

        </View>

        <View>
          <Text style={styles.inputText}> Tip percentage : {this.state.percentage}% </Text>
          <Text style={styles.inputText}> Tip amount : {this.state.tipAmount} </Text>

          <Slider
            style = {styles.slider}
            percent={this.state.percentage}
            minimumValue={0}
            maximumValue={100}
            step={5}
            minimumTrackTintColor={'purple'}
            maximumTrackTintColor={'violet'}

            onValueChange={(percent) => this.onPercentageChange(percent)}
            onSlidingComplete={(percent) => this.handlePercentageChange(percent)}
            />
        </View>

      <View>
          <Text style = {styles.resultText}> Total bill: {this.state.result}</Text>
        </View>
        </View>
     </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ffe4e1'
  },
  baseText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    opacity: 0.8
  },
  inputText: {
    height : 25,
    fontSize: 20,
    marginTop: 10,
  },
  inputAmount:{
    backgroundColor: '#ededed',
    height: 100,
    marginTop: 10,
    opacity: 0.8,
    fontSize: 60,
  },
  slider:{
    marginTop: 10,
    marginBottom: 20,
  },
  resultText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    opacity: 0.8
  },
});
module.exports = Cal
