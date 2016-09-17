import React from 'react';
import {
  Text,
  View
} from 'react-native';

const Post = React.createClass({
  render: function() {
    return (
      <View>
        <Text>@{this.props.post.username} </Text>
        <Text>{this.props.post.body}</Text>
      </View>
    );
  }
});

module.exports = Post;