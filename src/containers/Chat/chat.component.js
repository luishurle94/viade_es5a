import React, { Component } from 'react';
import { Widget, addResponseMessage, addUserMessage, dropMessages } from 'react-chat-widget';
import { CommentService } from '@services';
import { Comment } from '@models';
import { errorToaster } from '@utils';
import { Loader } from '@util-components';

import 'react-chat-widget/lib/styles.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'messages': this.props.route.messagesObject,
    }
  }

  componentDidMount() {
    dropMessages();
    this.setState({
      loading: false,
      messages: this.props.route.messagesObject,
    })
    this.loadMessages();
  }
  
  handleNewUserMessage = async (newMessage) => {
    this.setState({
      loading: true
    })
    const message = new Comment(newMessage, new Date().toISOString(), this.props.webId);console.log([message, message.getIdentifier()])
    const res = await CommentService.publishComment(this.props.route.webId, message);
    if (res.added) {
      this.setState({
        loading: false,
        messages: [...this.state.messages, message]
      })
    } else {
      dropMessages();
      this.loadMessages();
      errorToaster(this.props.t('routeDetails.chat.error'));
      this.setState({
        loading: false
      })
    }
  }

  loadMessages() {
    this.state.messages.filter(m => m && m.createdAt).sort((a, b) => Number(a.createdAt) - Number(b.createdAt)).forEach(m => {
      if (m.createdBy === this.props.webId) {
        addUserMessage(m.message);
      } else {
        addResponseMessage(m.message);
      }
    })
  }

  render() {
    return (
      <div key={this.props.id}>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title={this.props.t('routeDetails.chat.title')}
          subtitle={this.props.t('routeDetails.chat.subtitle', {routeName: this.props.route.name })}
          senderPlaceHolder={this.props.t('routeDetails.chat.placeholder')}
        />
        {this.state.loading && <Loader />}
      </div>
    );
  } 
}

export default Chat;