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
import getPosts from '../src/getPosts';
import sendPost from '../src/sendPost';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { List, ListItem } from 'react-native-elements';

const windowSize = Dimensions.get('window');


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

  // Scroll a component into view. Just pass the component ref string.
  inputFocused (refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
  },

  render() {

     /* <View style={styles.outside}>
        <ScrollView
            automaticallyAdjustContentInsets={false}
            onScroll={() => { console.log('onScroll!'); }}
            scrollEventThrottle={200}
            style={styles.container}>
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
        <View style={styles.postContainer}>
          <TextInput
            style={styles.newPostInput}
            onChangeText={this.handleNewPostInput}
            value={this.state.text}
          />
        </View>
      </View>

      */
    // var _scrollView: ScrollView;
          // ref={(scrollView) => { _scrollView = scrollView; }}

    return (
      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <Text style={{color: '#000'}}>Chat</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.input}
              value={this.state.message}
              onChangeText={(text) => this.setState({message: text})}
              />
          </View>
          <View style={styles.sendContainer}>
            <TouchableHighlight
              underlayColor={'#4e4273'}
              onPress={() => this.onSendPress()}
              >
              <Text style={styles.sendLabel}>SEND</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>

    );
  }

});

 /* container: {
    flex: 1,
    marginTop: 40,
    // justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
    borderWidth: 3,
    borderColor: 'orange'
  },
  outside: {
    flex: 1
  },
  postContainer: {
    justifyContent: 'flex-end'
  },
  newPostInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    // justifyContent: 'flex-end'
  }
  */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: 'orange'
  },
  chatContainer: {
      flex: 11,
      justifyContent: 'center',
      alignItems: 'stretch'
    },
  inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#6E5BAA'
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
    borderColor: '#6E5BAA',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },

});

module.exports = Home;