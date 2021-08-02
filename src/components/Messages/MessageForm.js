import firebase from 'firebase/app';
import React, { Component } from 'react';
import {Segment,Button,Input} from 'semantic-ui-react'

class MessageForm extends Component {



    state={
        loading:false,
        message:'',
        channel:this.props.channel,
        user:this.props.currentUSer,
        errors:[]
    }

    handleChange=event=>{
     this.setState({[event.target.name]:event.target.value})   
    }

    createMessage=()=>{

        const message={
            timestamp:firebase.database.ServerValue.TIMESTAMP,
            user:{
            id:this.state.user.uid,
            name:this.state.user.displayName
            },
            content:this.state.message
        }
        return message;
    }

    sendMessage=()=>{
        const {messagesRef}=this.props;
        const {message}=this.state;
        const {error}=this.state
        if(message){
            this.setState({loading:true})
            messageRef
            .child(channelid)
            .push()
            .set(this.createMessage())
            .then(()=>{
                this.setState({loading:false,message:'',errors:[]})
            })
            .catch(err=>{
                console.error(Err)
                this.setState({
                    loading:false,
                    errors:this.state.errors.concat(err)
                })
            })
        }
        else{
            this.setState({
                errors:this.state.errors.concat({message:"Add a message"})
            })
        }
    
    }

    render() {
        const {error,message,loading}=this.state
        return (
        <Segment className="message__form">

            <Input 
            fluid 
            className={errors.some(error=>error.message.include('message')?'error':'')}
            name="messages"
            style={{marginBottom:'0.7em'}}
            value={message}
            labelPosition="left"
            onChange={this.handleChange()}
            placeholder="Write your message"/>
            <Button.Group icon widths="2"> 
            <Button
            color="orange"
            disabled={loading}
            content="Add Reply"
            labelPosition="left"
            icon="Add"/>
            <Button
            color="teal"
            content="upload Media"
            labelPosition="right"
            icon="cloud upload"/>
            </Button.Group>
        </Segment>
        );
    }
}

export default MessageForm;