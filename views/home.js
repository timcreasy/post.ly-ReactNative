import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import getUser from '../src/getUser';
import getToken from '../src/getToken';

const Home = React.createClass({

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Welcome Home
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Home;