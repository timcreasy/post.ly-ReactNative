import React from 'react';
import {
  NavigatorIOS,
  StyleSheet,
  AppRegistry
} from 'react-native';
import Login from './views/login';

const Postly = React.createClass({

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: "Login",
          component: Login
        }} />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  }
});

AppRegistry.registerComponent('postly', () => Postly);
