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
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class Cal extends Component{
  constructor(props){
    super(props);
    this.state = {
      segmentSelectedIndex : 0,
      billAmount : 0,
      result: 0,
      tipAmount: 0,
      //percentage: "10%",
      // percent1: 0,
      // percent2: 0,
      // percent3: 0,
    };
  }
handleSegmentChange(index){
  this.dismissKeyboard();
  this.setState({
    segmentSelectedIndex : index
  })
  this.handleBillAmountChange(this.state.billAmount,index);
}
handleBillAmountChange(bill,index){
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
  //return [this.state.percent1, this.state.percent2, this.state.percent3];
}
dismissKeyboard() {
  Keyboard.dismiss();
}

// async getPercentages(){
//   console.log("Percentages");
//   try{
//     for(let i = 1; i <= 3; i++){
//       let value = await AsyncStorage.getItem("PERCENT_" + i);
//       console.log(i + ": " + value);
//       if(value) {
//         this.setState({["percent" + i]: value + "%"});
//       }
//       else{
//         value = parseFloat(this.state["percent" + i]);
//         this.setPercentages(i,value);
//       }
//     }
//   }
//   catch (error){
//     console.log(error);
//   }
// }
//
// async setPercentages(index,value){
//   try{
//     await AsyncStorage.setItem('PERCENT_' + index, String(value));
//   }
//   catch(error){
//     console.log(error);
//   }
// }
//
// componentDidMount(){
//   this.getPercentages();
// }

render(){
    // if(this.props.navigator.refresh){
    //   this.props.navigator.refresh = false;
    //   this.getPercentages();
    // }
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
          <TextInput style={styles.inputAmount}
            onChangeText = {(billAmount) => this.handleBillAmountChange(billAmount)}
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
            activeTabStyle={style={backgroundColor:'#f08080', opacity: 0.9}}
        />
        </View>

        <View style={{marginTop: 10}}>
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
    height: 70,
    marginTop: 10,
    opacity: 0.8,
    fontSize: 40,
  },
  resultText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    opacity: 0.8
  },
});
module.exports = Cal
