import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Calculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previousInputValue: 0,
      result: 0
    }
  }

  onButtonPressed(input) {
    switch (typeof input) {
      case 'number':
        return this.onNumber(input)
      case 'string':
        return this.onString(input)
    }
  }

  onNumber(input) {
    console.log('its a number');
  }

  onString(input) {
    switch (input) {
      case "":
        console.log('do nothing');
        break;
      case "AC":
        this.setState({ result: 0 });
        break;
      case "±":
        console.log('±');
        break;
      default:

    }
  }

  clearResult() {
    this.setState({
      result: 0
    })
  }

  render() {
    const { testShit, container, upperContainer, bottomContainer, resultLabel, resultLabelText, leftPane, rightPane, rows } = styles;
    return(
      <View style={[container]}>
        <View style={upperContainer}>
          <View style={[resultLabel]}>
            <Text style={resultLabelText}>{this.state.result}</Text>
          </View>
        </View>
        <View style={[bottomContainer]}>
          <View style={leftPane}>
            <View style={rows}>
              <Cell keyValue="AC" onPress={() => this.onButtonPressed("AC")} />
              <Cell keyValue="±" onPress={() => this.onButtonPressed("±")} />
              <Cell keyValue="﹪" onPress={() => this.onButtonPressed("﹪")} />
            </View>
            <View style={rows}>
              <Cell keyValue="7" onPress={() => this.onButtonPressed(7)} />
              <Cell keyValue="8" onPress={() => this.onButtonPressed(8)} />
              <Cell keyValue="9" onPress={() => this.onButtonPressed(9)} />
            </View>
            <View style={rows}>
              <Cell keyValue="4" onPress={() => this.onButtonPressed(4)} />
              <Cell keyValue="5" onPress={() => this.onButtonPressed(5)} />
              <Cell keyValue="6" onPress={() => this.onButtonPressed(6)} />
            </View>
            <View style={rows}>
              <Cell keyValue="1" onPress={() => this.onButtonPressed(1)} />
              <Cell keyValue="2" onPress={() => this.onButtonPressed(2)} />
              <Cell keyValue="3" onPress={() => this.onButtonPressed(3)} />
            </View>
            <View style={rows}>
              <Cell keyValue="0" onPress={() => this.onButtonPressed(0)} />
              <Cell keyValue=""  onPress={() => this.onButtonPressed()} />
              <Cell keyValue="." onPress={() => this.onButtonPressed(".")} />
            </View>
          </View>
          <View style={rightPane}>
            <Cell keyValue="÷" onPress={() => this.onButtonPressed("÷")}/>
            <Cell keyValue="×" onPress={() => this.onButtonPressed("×")}/>
            <Cell keyValue="-" onPress={() => this.onButtonPressed("-")}/>
            <Cell keyValue="+" onPress={() => this.onButtonPressed("+")}/>
            <Cell keyValue="=" onPress={() => this.onButtonPressed("=")}/>
          </View>
        </View>
      </View>
    )
  }
}

class Cell extends Component {
  render() {
    const { centerEverything, cellStyle, keyValueStyle } = styles;
    return(
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor="transparent"
        activeOpacity={0.5}>
        <View style={[centerEverything, cellStyle]}>
          <Text style={keyValueStyle}>{this.props.keyValue}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = {
  testShit: {
    borderWidth: 2,
    borderColor: 'red'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: .3,
    backgroundColor: '#F5F5F5'
  },
  bottomContainer: {
    flex: .7,
    flexDirection: 'row',
  },
  resultLabel: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    padding: 10
  },
  resultLabelText: {
    fontSize: 80,
    fontFamily: 'Helvetica Neue',
    color: '#202020',
  },
  leftPane: {
    flex: .75,
    flexDirection: 'column',
    backgroundColor: '#202020',
  },
  rightPane: {
    flex: .25,
    backgroundColor: '#565656',
  },
  rows: {
    flexDirection: 'row'
  },
  cellStyle: {
    width: 0.25*deviceWidth,
    height: (deviceHeight / 7.7), //odd config right? haha
    borderWidth: 0.5,
    borderColor: '#777777'
  },
  keyValueStyle: {
    fontSize: 30,
    color: '#FFF'
  }
}

export default Calculator;
