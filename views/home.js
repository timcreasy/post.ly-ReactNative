  import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import getPosts from '../src/getPosts';
import sendPost from '../src/sendPost';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { List, ListItem } from 'react-native-elements'


const Home = React.createClass({

  getInitialState() {
    return ({ posts: [] });
  },

  componentDidMount() {
    this.loadPosts();
    setInterval(this.loadPosts, 2000);
  },

  loadPosts() {
    return getPosts()
      .then(posts => {
        this.setState({ posts })
      })
      .catch(err => {
        console.log("ERR", err);
      });
  },

  handleNewPostInput(newPost) {
    this.setState({ newPost })
  },

  submitNewPost(event) {
    const newPost = {
      body: event.nativeEvent.text
    };
    sendPost(newPost)
      .then(post => {
        console.log("POST", post);
      })
      .catch(err => console.log(err));
  },

  render() {

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <List>
          {
            this.state.posts.map((post, i) => (
              <ListItem
                key={i}
                title={post.body}
                subtitle={`@${post.username}`}
                icon={{name: 'person'}}
              />
            ))
          }
        </List>
      </KeyboardAwareScrollView>
    );
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 42,
    // justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Home;