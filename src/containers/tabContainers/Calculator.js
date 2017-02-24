import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const cellKeys = [
  ['AC', '±', '﹪', '÷'],
  [7, 8, 9, '×'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '', '.', '=']
]

class Calculator extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null
    };

    this.state = this.initialState;
  }

  // renderCells() {
  //   let cells = cellKeys.map((row, id) => {
  //     let cellRow = row.map(cellVal, columnId) => {
  //       return <Cell
  //                 value={cellVal}
  //
  //     }
  //   })
  // }

  onButtonPressed(input) {
    switch (typeof input) {
      case 'number':
        return this.onNumber(input)
      case 'string':
        return this.onString(input)
    }
  }

  onNumber(input) {
    let inputValue = (this.state.inputValue * 10) + input;
    this.setState({ inputValue });
  }

  onString(input) {
    switch (input) {
      case "":
        console.log('do nothing');
        break;
      case "AC":
        this.setState({ inputValue: 0 });
        break;
      case "±":
        let flipValue = this.state.inputValue * -1;
        this.setState({ inputValue: flipValue });
        break;
      case '%':
        let value = this.state.inputValue / 100;
        this.setState({ inputValue: value });
        break;
      case '/':
      case '*':
      case '-':
      case '+':
        this.setState({
          selectedSymbol: input,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        });
        break;
      case '=':
        let symbol = this.state.selectedSymbol,
          inputValue = this.state.inputValue,
          previousInputValue = this.state.previousInputValue;

        if (!symbol) {
          return;
        }

        this.setState({
          previousInputValue: 0,
          inputValue: eval(previousInputValue + symbol + inputValue),
          selectedSymbol: null
        });
        break;
    }
  }

  render() {
    const { testShit, container, upperContainer, bottomContainer, resultLabel, resultLabelText, leftPane, rightPane, rows } = styles;
    return(
      <View style={[container]}>
        <View style={upperContainer}>
          <Ionicons
            name="ios-arrow-round-back"
            size={50}
            style={{ color: '#202020', paddingLeft: 20, paddingTop: 20 }}
            onPress={() => Actions.pop()}
          />
          <View style={[resultLabel]}>
            <Text style={resultLabelText}>{this.state.inputValue}</Text>
          </View>
        </View>
        <View style={[bottomContainer]}>
          <View style={leftPane}>
            <View style={rows}>
              <Cell keyValue="AC" onPress={() => this.onButtonPressed("AC")} />
              <Cell keyValue="±" onPress={() => this.onButtonPressed("±")} />
              <Cell keyValue="﹪" onPress={() => this.onButtonPressed("%")} />
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
            <Cell keyValue="÷" onPress={() => this.onButtonPressed("/")}/>
            <Cell keyValue="×" onPress={() => this.onButtonPressed("*")}/>
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
        // underlayColor="#202020"
        activeOpacity={0.2}>
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
    justifyContent: 'center',
    padding: 10
  },
  resultLabelText: {
    fontSize: 80,
    fontFamily: 'Helvetica Neue',
    textAlign: 'right',
    color: '#202020',
    padding: 20
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
    height: (deviceHeight / 7),
    borderWidth: 0.5,
    borderColor: '#777777'
  },
  keyValueStyle: {
    fontSize: 30,
    color: '#FFF'
  }
}

export default Calculator;
