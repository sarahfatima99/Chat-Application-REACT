import React from "react";
import { Segment, Comment, SearchResults } from "semantic-ui-react";
import firebase from "../../Firebase";

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import ProgressBar from "./ProgressBar";
class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    progressBar:false,
    numUniqueUsers:'',
    searchTerm:'',
    searchLoading:false,
    privateChannel:this.props.isPrivateChannel,
    searchResults:[],
    privateMessagesRef:firebase.database().ref("privateMesssages")
  };

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    const ref=this.getMessagesRef()

    ref.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });

      this.countUniqueUsers(loadedMessages)

    });
  };


  getMessagesRef=()=>{
    const {messagesRef,privateMessagesRef,privateChannel}=this.state
    return privateChannel? privateMessagesRef:messagesRef
  }

  countUniqueUsers=messages=>{
    const uniqueUsers=messages.reduce((acc,messages)=>{
      if(!acc.includes(messages.user.name)){
        acc.push(messages.user.name);
      }
     return acc; 
    },[])
    const plural=uniqueUsers.length>1 || uniqueUsers.length==0;

    const numUniqueUsers=`${uniqueUsers.length} user${plural?"s":""}`
    this.setState({numUniqueUsers})
      }

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));

isProgressBarVisible=percent=>{
  if(percent>0){
    this.setState({ProgressBar:true})
  }
}


handleSearchChange=event=>{
  this.setState({
    searchTerm:event.target.value,
    searchLoading:true
  },()=>this.handleSearchMessages())
}

handleSearchMessages=()=>{
  const channelMessages=[...this.state.messages];
  const regex=new RegExp(this.state.searchTerm,'gi')
  const searchResults=channelMessages.reduce((acc,message)=>{
    if(message.content&&message.content.match(regex)){
      acc.push(message)
    }
    return acc;
  },[])
  this.setState({searchResults})
  setTimeout(()=>this.setState({searchLoading:false}),1000)

}

displayChannelName=channel=>{
  return channel ?`${this.state.privateChannel ? '@':'#'}${channel.name}`:""
}

  render() {
    const { messagesRef, messages, channel, user,progressBar ,numUniqueUsers,searchTerm,searchResults,searchLoading,privateChannel} = this.state;

    return (
      <React.Fragment>
        <MessagesHeader 
        
        channelName={this.displayChannelName(channel)}
        numUniqueUsers={numUniqueUsers}
        handleSearchChange={this.handleSearchChange}
        searchLoading={searchLoading}
        isPrivateChannel={privateChannel}
        getMessagesRef={this.getMessagesRef}
        />

        <Segment>
          <Comment.Group className={progressBar?'messages__progress':'messages'}>

            {searchTerm?this.displayMessages(searchResults):this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isProgressBarVisible={this.isProgressBarVisible}
          isPrivateChannel={privateChannel}
      getMessagesRef={this.getMessagesRef}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
