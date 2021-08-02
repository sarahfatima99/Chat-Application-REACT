import React from 'react';
import {Segment,Comment} from 'semantic-ui-react'
import MessageForm from './MessageForm';
import MessagesHeader from './MessagesHeader';
import firebase from 'firebase/app';
import UserPanel from '../SidePanel/UserPanel';
class Messages extends React.Component{

    state={
        messagesRef:firebase.database().ref('messages'),
        channel:this.props.currentChannel,
        user:this.props.currentUser
        
    }

    render(){

        const {messagesRef,user,channel}=this.state

        return (
            <React.Fragment>

                <MessagesHeader/>
                <Segment>
                    <Comment.Group className="messages">

                    </Comment.Group>
                </Segment>
                <MessageForm
                currentUser={user}
                messagesRef={messagesRef}
               currentChannel={channel} />
            </React.Fragment>


        );
        }
    }

export default Messages;