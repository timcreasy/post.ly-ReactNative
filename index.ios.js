import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import getUser from './src/getUser';
import getToken from './src/getToken';

const Postly = React.createClass({

  getInitialState() {
    return ({
      username: '',
      password: ''
    });
  },

  handleUsernameInput(username) {
    this.setState({username});
  },

  handlePasswordInput(password) {
    this.setState({password});
  },

  loginPressed() {

    getToken(this.state.username, this.state.password)
      .then((token) => {
        getUser(token)
          .then((userData) => {
            console.log("LOGGED IN AS:");
            console.log(userData);
          });
      });
  },


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Login
        </Text>
        <TextInput
          autoCapitalize='none'
          style={styles.userInputs}
          onChangeText={this.handleUsernameInput}
          value={this.state.username}
          placeholder="Enter username"
        />
        <TextInput
          style={styles.userInputs}
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
          placeholder="Enter password"
          secureTextEntry={true}
        />
        <TouchableHighlight
          style={styles.submit}
          underlayColor="gray"
          onPress={this.loginPressed}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    marginTop: 30,
    fontSize: 30
  },
  userInputs: {
    height: 40,
    borderBottomColor: 'gray',
    borderWidth: 1
  },
  submit: {
    borderColor: 'black'
  }
});

AppRegistry.registerComponent('postly', () => Postly);
