import { Component } from 'react';
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from './CustomInput';
import { validateInput } from '@/utils/input.validation';

interface ValidationResult {
  valid: boolean;
  error: string | null;
}

interface LoginState {
  email: string;
  password: string;
  errors: {
    [key: string]: ValidationResult | undefined;
  };
}

export default class Login extends Component<{}, LoginState> {
    constructor(props: {}) {
        //Allows you to set initial state of the application/class/component before methods are called.

      super(props) //Allows you access to props from main class/inherited class

      this.handleOnPress = this.handleOnPress.bind(this)
      //Recommended: bcs it does not create a new instance of the function

      this.state = {
        email: '',
        password: '',
        errors: {}
      }
    }

    //1. componentDidMount :when the component is added to the view/DOM
    //3.componentDidUpdate: when component state/props are updated
    //3. componentDidUnmount: when the component will be removed from view/DOM
componentDidUpdate(){
  console.log({state: this.state});
}
componentDidMount(){
  console.log('is mounted');
  //this is where you add event listeners, or subscriptions
  //or set the state of the component
  //or fetch date from APIs and datebases
}
componentDidUnmount(){
  console.log('will be unmounted');
  //component distraction: example removing any event listeners that you have, or subscrictions to real time APIs
}
    //   const [firstName, setFirstName] = useState('')
  
//   useEffect(() => {
//     console.log(firstName);
//   }, [firstName])
  handleOnPress = () => {
    Alert.alert('Alert', 'Button was pressed', [
      { text: 'Okay', onPress: () => console.log('Okay was pressed') },
      { text: 'Cancel', style: 'cancel', onPress: () => console.log('Cancel was pressed') },
      { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete was pressed') }
    ])
  }
  handleOnLongPress = () => {
    ToastAndroid.show('Button was long pressed...', 3000)
  }
    handleShowAlert = () => {
  ToastAndroid.show("Tried to navigate the Registration", 300);
};
  handleInput = (type: string, stateName: string, value: string) => {
    this.setState(state => ({
      ...state,
      errors: {
        ...state.errors,
        [stateName]: validateInput(type, value)
      }
    }))
  }
  

render (){
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="position">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.formTitle}>Login</Text>

          <CustomInput name={'Email'} onChange={(ev: string) => this.setState({ email: ev })}/>
          <CustomInput name={'Password'} onChange={(ev: string) => this.setState({ password: ev })}/>

          <Pressable style={styles.button} onPress={this.handleOnPress} onLongPress={this.handleOnLongPress}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
          <View style={styles.signInSection}>
            <Text style={{ color: '#BDBDDB' }}>Don't have an account? </Text>
            <Pressable onPress={this.handleShowAlert}>
              <Text style={{ color: '#306A68', padding: 5, }}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010709',
  },
  scrollView: {
    padding: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#ffffff',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#121c24',
    color: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#717171',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#306A68',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
