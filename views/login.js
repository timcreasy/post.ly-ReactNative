import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert
} from 'react-native';
import getUser from '../src/getUser';
import getToken from '../src/getToken';
import Home from './home';
import TextField from 'react-native-md-textinput';
import AwesomeButton from 'react-native-awesome-button';
import auth from '../src/userAuth';

const Login = React.createClass({

  getInitialState() {
    return ({
      username: '',
      password: '',
      currentUser: '',
      buttonState: 'idle'
    });
  },

  handleUsernameInput(username) {
    this.setState({username});
  },

  handlePasswordInput(password) {
    this.setState({password});
  },

  _successfulLogin(token) {
    this.setState({ buttonState: 'success' });
    auth.setUser(token);
    this.props.navigator.push({
      title: 'post.ly',
      component: Home
    });
  },

  loginPressed() {

    this.setState({ buttonState: 'busy' });

    getToken(this.state.username, this.state.password)
      .then((token) => {
        if (token === "Invalid password") {
          Alert.alert(
            'Invalid Password',
            'Password was invalid, please try again.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          this.setState({password: "", buttonState: "idle"});
        } else if (token === "Invalid") {
          Alert.alert(
            'User not found',
            'Username was not found, please try again.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          this.setState({password: "", username: "", buttonState: "idle"});
        } else {
          getUser(token)
            .then((userData) => {
              this._successfulLogin(token);
            })
            .catch((err) => {
              console.log("NO USERDATA");
              console.log("ERR", err);
            })
        }
      })
      .catch((err) => {
        console.log("NO TOKEN");
        console.log("ERR", err);
      });
  },

  render() {
    return (
      <View style={styles.container}>
        <TextField
          label={'Username'}
          highlightColor={'#00BCD4'}
          autoCapitalize='none'
          onChangeText={this.handleUsernameInput}
          value={this.state.username} />
        <TextField
          label={'Password'}
          highlightColor={'#00BCD4'}
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
          secureTextEntry={true} />
        <AwesomeButton
          backgroundStyle={styles.loginButtonBackground}
          labelStyle={styles.loginButtonLabel}
          transitionDuration={200}
          states={{
            idle: {
              text: 'Log In',
              onPress: this.loginPressed,
              backgroundColor: '#1155DD',
            },
            busy: {
              text: 'Logging In',
              backgroundColor: '#002299',
              spinner: true,
            },
            success: {
              text: 'Logged In',
              backgroundColor: '#339944'
            }
          }}
          buttonState={this.state.buttonState}
          />

      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    padding: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  loginButtonBackground: {
    height: 40,
    borderRadius: 5
  },
  loginButtonLabel: {
    color: 'white'
  }
});

module.exports = Login;