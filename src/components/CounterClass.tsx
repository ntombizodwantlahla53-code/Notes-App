import { Component } from "react";
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CounterState {
  counter: number;
}

export default class CounterClass extends Component<{}, CounterState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      counter: 0
    };

    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
  }

  handleIncrement() {
    this.setState(state => ({ counter: state.counter + 1 }));
  }

  handleDecrement() {
    this.setState(state => ({ counter: state.counter - 1 }));
  }

  conditionalRender() {
    if (this.state.counter < 0) {
      return <Text style={{ color: '#BDBDBD' }}>Number less than 0</Text>;
    } else if (this.state.counter > 0) {
      return <Text style={{ color: '#BDBDBD' }}>Number is greater than 0</Text>;
    } else {
      return <Text style={{ color: '#BDBDBD' }}>Number is Zero</Text>;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.counterCont}>
          <Pressable style={styles.button} onPress={this.handleDecrement}>
            <Text style={styles.buttonText}>Minus</Text>
          </Pressable>
          <Text style={styles.counterText}>{this.state.counter}</Text>
          <Pressable style={styles.button} onPress={this.handleIncrement}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
        {
            this.state.counter > 0 && (
                <Text style={{ color: '#BDBDBD' }}>Number is greater than 0</Text>
            )
        }
        {/* {this.conditionalRender()} */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#010709',
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  counterCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#808080'
  },
  buttonText: {
    color: '#808080',
    fontSize: 16
  },
  counterText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold'
  }
});
