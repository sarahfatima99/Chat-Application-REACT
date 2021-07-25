
import React, { Component } from 'react'
import { Grid,Form,Segment,Button,Header,Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {FaTeamspeak} from "react-icons/fa";
import firebase from '../../Firebase';
export class Register extends Component {

state={
    username:'',
    email:'',
    password:'',
    passwordConfirmation:''
};

handleChange= event=>{
    this.setState({[event.target.name]:event.target.value});
}


handleSubmit=event=>{

event.preventDefault();
firebase
.auth()
.createUserWithEmailAndPassword(this.state.email,this.state.password)
.then(createdUser=>{
    console.log(createdUser)
})
}

    render() {

        const {username,email,password,passwordConfirmation}=this.state;

        return (
            <div>
               <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth:450}}>

            <FaTeamspeak color="purple" size={90}/>

            <Header as="h1"  color='purple'>

            
            Register for DevChat
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>

            <Segment stacked>

                <Form.Input fluid name="username" value={username} icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange}/>
                <Form.Input fluid name="email" value ={email}icon="mail" iconPosition="left" placeholder="Email" type="email" onChange={this.handleChange}/>
                <Form.Input fluid name="password" value={password} icon="lock" iconPosition="left" placeholder="Password" type="password" onChange={this.handleChange}/>
                <Form.Input fluid name="passwordConfirmation" value={passwordConfirmation} icon="repeat" iconPosition="left" placeholder="Confirm Password" type="password" onChange={this.handleChange}/>
                <Button color="purple" fluid size="large" onClick={this.handleSubmit}>Submit</Button>
            </Segment>

            </Form>
            <Message>Already a user? <Link to= "/login">Login</Link></Message>
            </Grid.Column>

                </Grid>
            </div>
        )
    }
}

export default Register
