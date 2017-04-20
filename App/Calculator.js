import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class Cal extends Component{
  constructor(props){
    super(props);
    this.state = {
      segmentSelectedIndex : 0,
      billAmount : 0,
      result: 0,
      tipAmount: 0

    }
  }
handleSegmentChange(index){
  this.setState({
    segmentSelectedIndex : index
  })

  this.handeBillAmountChange(this.state.billAmount,index);
}
handeBillAmountChange(bill,index){
  this.setState({
    billAmount : bill
  })

  if(!index && index !=0){
    index = this.state.segmentSelectedIndex;
  }

  bill = parseFloat(bill);
  var percent = this.segmentValues()[index];
  percent = parseFloat(percent)/100; //0.1 0.5

  var result = bill + (bill*percent);

  this.setState({
    result: result,
    tipAmount : bill*percent
  })
}
segmentValues(){
  return ["10%","15%","50%"];
}
dismissKeyboard() {
        Keyboard.dismiss();
}

render(){
    return(
      <TouchableWithoutFeedback onPress={()=>this.dismissKeyboard()}>
      <View style={styles.container}>
        <View>
          <Text style={styles.baseText}>
          Tip Calculator
          </Text>
        </View>
        <View>
          <Text style={styles.inputText}> Bill amount</Text>
          <TextInput style={{ backgroundColor: '#ededed', height: 30, marginTop: 10 }}
            onChangeText = {(billAmount) => this.handeBillAmountChange(billAmount)}
            keyboardType={'numeric'}
            maxLength = {10}
            keyboardAppearance = 'dark'
            placeholder="0"
            autoFocus={true}
            />
        </View>

        <View>
          <Text style={styles.inputText}> Tip amount : {this.state.tipAmount} </Text>
        </View>
        <View style={{height: 30, marginTop: 10}}>
        <SegmentedControlTab
                 values={this.segmentValues()}
                 onTabPress={index => this.handleSegmentChange(index)}
                 />
        </View>
        <View style={{marginTop: 10}}>
          <Text> Bill input: {this.state.billAmount}</Text>
          <Text> Tip amount: {this.state.tipAmount}</Text>
              <Text> Tip percentage: {this.segmentValues()[this.state.segmentSelectedIndex]}</Text>
        </View>
        <View>
          <Text style = {styles.resultText}> Result: {this.state.result}</Text>
        </View>
        </View>
     </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f5fffa'
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
  resultText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
module.exports = Cal
