  import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  DeviceEventEmitter
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import getPosts from '../src/getPosts';
import sendPost from '../src/sendPost';

const windowSize = Dimensions.get('window');

const Home = React.createClass({

  // Initially set posts to empty array, visible height to full height of page
  getInitialState() {
    return ({ posts: [], visibleHeight: windowSize.height });
  },

  // Reset visible height when keyboard will show
  keyboardWillShow (e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height
    this.setState({visibleHeight: newSize})
  },

  // Reset visible height when keyboard will hide
  keyboardWillHide (e) {
    this.setState({visibleHeight: Dimensions.get('window').height})
  },

  // Listen for keyboard events, and posts
  componentDidMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    this.loadPosts();
    setInterval(this.loadPosts, 2000);
  },

  // Fetch posts collection and store in state
  loadPosts() {
    return getPosts()
      .then(posts => {
        this.setState({ posts })
      })
      .catch(err => {
        console.log("ERR", err);
      });
  },

  // Handle inputting of new post
  handleNewPostInput(newPost) {
    this.setState({ newPost })
  },

  // Handle submitting of new post
  submitNewPost() {
    const newPost = {
      body: this.state.newPost
    };

    this.setState({ newPost: "" });

    sendPost(newPost)
      .then(post => {})
      .catch(err => console.log(err));
  },

  handleData(data) {
    let result = JSON.parse(data);
    console.log("DATA FROM WEBSOCKET:", result);
  },

  render() {

    return (
      <View style={{height: this.state.visibleHeight}}>
        <View style={styles.chatContainer}>
          <ScrollView automaticallyAdjustContentInsets={false}>
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
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.input}
              value={this.state.newPost}
              onChangeText={this.handleNewPostInput}
              />
          </View>
          <View style={styles.sendContainer}>
            <TouchableHighlight
              underlayColor={'#334d5d'}
              onPress={this.submitNewPost}
              >
              <Text style={styles.sendLabel}>SEND</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>

    );
  }

});

const styles = StyleSheet.create({
  chatContainer: {
    flex: 11,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#395668'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  sendContainer: {
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  sendLabel: {
    color: '#ffffff',
    fontSize: 15
  },
  input: {
    width: windowSize.width - 70,
    color: '#555555',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    height: 32,
    borderColor: '#395668',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },

});

module.exports = Home;