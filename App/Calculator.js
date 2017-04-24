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
  Slider
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
      fadeAnim: new Animated.Value(0), //opacity 0
      splitNum: 1,

    };
  }
// handleSegmentChange(index){
//   this.dismissKeyboard();
//   this.setState({
//     segmentSelectedIndex : index
//   })
//   this.handleBillAmountChange(this.state.billAmount,index);
// }
handleBillAmountChange(bill,percent,number){
  this.setState({
    billAmount : bill,
    splitNum: number
  })

  // if(!index && index !=0){
  //   index = this.state.segmentSelectedIndex;
  // }

  bill = parseFloat(bill);
  //var percent = this.segmentValues()[index];
  var percent = percent
  percent = parseFloat(percent)/100; //0.1 0.5
  var result = (bill + (bill*percent))/this.state.splitNum;

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
  this.handleBillAmountChange(this.state.billAmount,percent,this.state.splitNum);
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
onSplitNumChange(number){
  this.setState({
      splitNum: number
  }
  )
}

handleSplitNumChange(number){
  this.dismissKeyboard();
  if(number && number != 1 ){
    number: this.state.splitNum;
  }
  this.handleBillAmountChange(this.state.billAmount,this.state.percentage,number);

}

handlePercentageChange(percent){
  this.dismissKeyboard();
  if(!percent && percent != 10 ){
    percent: this.state.percentage;
  }
  this.handleBillAmountChange(this.state.billAmount,percent,this.state.splitNum);
}

componentDidMount(){
  this.getPercentage();
  Animated.timing(
    this.state.fadeAnim,
    {
      toValue: 5,
      duration: 2000,
    },
  ).start();
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
            onChangeText = {(billAmount) => this.handleBillAmountChange(billAmount,this.state.percentage,this.state.splitNum)}
            keyboardType={'numeric'}
            maxLength = {10}
            keyboardAppearance = 'dark'
            placeholder= '0'
            autoFocus={true}
            />

        </View>

        <View>
          <Text style={styles.inputText}> Tip percentage : {this.state.percentage}% </Text>
        </View>
        <Animated.View
          style={{
            opacity: this.state.fadeAnim,
          }}>
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
          </Animated.View>

          <View>
            <Text style={styles.inputText}> Split among : {this.state.splitNum} </Text>
          </View>
          <Animated.View
            style={{
              opacity: this.state.fadeAnim,
            }}>
            <Slider
              style = {styles.slider}
              number={this.state.splitNum}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor={'purple'}
              maximumTrackTintColor={'violet'}
              onValueChange={(number) => this.onSplitNumChange(number)}
              onSlidingComplete={(number) => this.handleSplitNumChange(number)}
              />
            </Animated.View>

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
    height: 60,
    marginTop: 10,
    opacity: 0.8,
    fontSize: 40,
  },
  slider:{
    marginTop: 5,
    marginBottom: 5,
  },
  resultText: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 30,
    opacity: 0.8
  },
});
var customStyles7 = StyleSheet.create({
  track: {
   height: 1,
   backgroundColor: '#303030',
 },
 thumb: {
   width: 10,
   height: 10,
   backgroundColor: 'rgba(150, 150, 150, 0.3)',
   borderColor: 'rgba(150, 150, 150, 0.6)',
   borderWidth: 9,
   borderRadius: 15,
 }
});



module.exports = Cal
