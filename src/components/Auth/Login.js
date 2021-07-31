
import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { FaTeamspeak } from "react-icons/fa";
import firebase from '../../Firebase';

export class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: [],
        loading: false,

    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }



    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  

    handleSubmit = event => {

        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true })

            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(signedInUser=>{
                console.log(signedInUser)
            })
            .catch(err=>{
                console.error(err);
                this.setState({
                    errors:this.state.errors.concat(err),
                    loading:false
                })
            })

            event.preventDefault();
       
      
        }
       
    }
    isFormValid=({email,password})=>email&&password;
  
    render() {

        const { email, password, errors, loading } = this.state;


        return (
            <div>
                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{ maxWidth: 450 }}>

                        <FaTeamspeak color="purple" size={90} />

                        <Header as="h1" color='purple'>


                           Login to DevChat for DevChat
                        </Header>
                        <Form size="large" onSubmit={this.handleSubmit}>

                            <Segment stacked>

                               
                                <Form.Input fluid name="email" value={email} icon="mail" iconPosition="left" placeholder="Email" type="email" onChange={this.handleChange} />
                                <Form.Input fluid name="password" value={password} icon="lock" iconPosition="left" placeholder="Password" type="password" onChange={this.handleChange} />
                                <Button disabled={loading} className={loading ? 'loading' : ''} color="purple" fluid size="large" onClick={this.handleSubmit}>Submit</Button>
                            </Segment>

                        </Form>
                        {this.state.errors.length > 0 && (

                            <Message error >
                                <h3>Error</h3>
                                {this.displayErrors(this.state.errors)}
                            </Message>

                        )}

                        <Message>Dont have a account? <Link to="/Register">Register</Link></Message>


                    </Grid.Column>

                </Grid>
            </div>
        )
    }
}

export default Login
