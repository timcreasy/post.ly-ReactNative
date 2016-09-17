import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import getPosts from '../src/getPosts';
import PostList from './components/PostList';

const Home = React.createClass({

  getInitialState() {
    return ({ posts: [] })
  },

  componentDidMount() {
    this.loadPosts();
  },

  loadPosts() {

    getPosts()
      .then(posts => {
        this.setState({ posts: posts });
      });

  },

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Welcome Home
        </Text>
        <PostList posts={this.state.posts}/>
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