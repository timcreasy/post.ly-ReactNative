  import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ListView
} from 'react-native';
import getPosts from '../src/getPosts';
import PostList from './components/PostList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import sendPost from '../src/sendPost';
import auth from '../auth';

const Home = React.createClass({

  // getInitialState() {
  //   return ({ posts: [] })
  // },

  componentDidMount() {
    this.loadPosts();
  },

  // loadPosts() {

  //   getPosts()
  //     .then(posts => {
  //       this.setState({ posts: posts });
  //     });

  // },

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>
  //         Welcome Home
  //       </Text>
  //       <PostList posts={this.state.posts}/>
  //     </View>
  //   );
  // }

  loadPosts() {

    return getPosts()
      .then(posts => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let postsArray = posts.map(post => `${post.username} - ${post.body}`);
        this.setState({
          dataSource: ds.cloneWithRows(postsArray),
        })
      })
      .catch(err => {
        console.log("ERR", err);
      });

  },

  getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      newPost: ""
    };
  },

  handleNewPostInput(newPost) {
    this.setState({ newPost })
  },

  submitNewPost(event) {
    const newPost = {
      username: auth.getUser(),
      body: event.nativeEvent.text
    };
    console.log(newPost);
  },

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.postsContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.newPostInput}
              onChangeText={this.handleNewPostInput}
              value={this.state.newPost}
              placeholder="Enter post"
              returnKeyType="go"
              onSubmitEditing={this.submitNewPost}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }

});

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    marginTop: 1,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  newPostInput: {
    height: 40,
    borderBottomColor: 'gray',
    borderWidth: 1
  },
});

module.exports = Home;