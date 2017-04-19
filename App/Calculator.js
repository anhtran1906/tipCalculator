import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
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
render(){
    return(
      <View>
        <View>
          <Text style={styles.baseText}>
          Tip Calculator
          </Text>
        </View>
        <View>
          <Text style={styles.inputText}> Bill amount</Text>
          <TextInput
            style={{ backgroundColor: '#ededed', height: 30 }}
            onChangeText = {(billAmount) => this.handeBillAmountChange(billAmount)}
          />
        </View>

        <View>
          <Text style={styles.inputText}> Tip amount : 0 </Text>
        </View>
        <View>
        <SegmentedControlTab
                 values={this.segmentValues()}
                 onTabPress={index => this.handleSegmentChange(index)}
                 />
        </View>
        <View>
          <Text> Bill input: {this.state.billAmount}</Text>
          <Text> Tip amount: {this.state.tipAmount}</Text>
              <Text> Segment control: {this.segmentValues()[this.state.segmentSelectedIndex]}</Text>
        </View>

        <View>
          <Text style = {styles.resultText}> Result: {this.state.result}</Text>
        </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Times',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  inputText: {
    fontSize: 18,
  },
  resultText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
module.exports = Cal
