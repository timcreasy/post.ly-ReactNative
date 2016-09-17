import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Post from './Post';

const PostList = React.createClass({

  render: function() {
    let posts = this.props.posts.map((post) => {
      return (
        <Post key={post._id} post={post} />
      );
    });

    return (
      <View>
        {posts}
      </View>
    );

  }
});

module.exports = PostList;