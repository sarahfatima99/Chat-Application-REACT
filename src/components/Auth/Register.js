
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
    passwordConfirmation:'',
    errors:[],
    loading:false
};

handleChange= event=>{
    this.setState({[event.target.name]:event.target.value});
}


isFormValid=()=>{


let errors=[];
let error;
if(this.isFromEmpty(this.state)){
error={message:'Full in all fields'};
this.setState({errors:errors.concat(error)})
return false;
}

else if(!this.isPasswordValid(this.state)){
error={message:'Password is invalid'};
this.setState({errors:errors.concat(error)});
return false

}

else{
    return true
}

}


isFromEmpty=({username,email,password,passwordConfirmation})=>{

return !username.length || !email.length || !password.length || !passwordConfirmation;

}


displayErrors=errors=>errors.map((error,i)=><p key={i}>{error.message}</p>)

isPasswordValid=({password,passwordConfirmation})=>{

if(password<6 || passwordConfirmation<6){
    return false
}
else if(password!==passwordConfirmation){
    return false
}
else {
    return true;
}
}

handleSubmit=event=>{

if (this.isFormValid()){
this.setState({errors:[],loading:true})




event.preventDefault();
firebase
.auth()
.createUserWithEmailAndPassword(this.state.email,this.state.password)
.then(createdUser=>{
    console.log(createdUser)
    this.setState({loading:false})
})

.catch(err=>{
    console.log(err)
    this.setState({errors:this.state.errors.concat(err),loading:false})
})

}
}
    render() {

        const {username,email,password,passwordConfirmation,errors,loading}=this.state;

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
                <Button disabled={loading} className={loading?'loading':''} color="purple" fluid size="large" onClick={this.handleSubmit}>Submit</Button>
            </Segment>

            </Form>
           {this.state.errors.length>0 &&(

            <Message error >
            <h3>Error</h3>
            {this.displayErrors(this.state.errors)}
            </Message>

           )} 
           
            <Message>Already a user? <Link to= "/login">Login</Link></Message>
           
           
            </Grid.Column>

                </Grid>
            </div>
        )
    }
}

export default Register
