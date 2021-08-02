import React from 'react'
import { Grid,Header ,Icon,Dropdown,avatar} from 'semantic-ui-react'
import firebase from '../../Firebase'
import {Img} from 'react-image' 
import {connect} from 'react-redux';
class UserPanel extends React.Component{

    state={
        user:this.props.currentUser
    }

 
    DropdownOptions=()=>[

        {   key:"user",
            text:(<span>Signed in as <strong>{this.state.user.displayName}</strong> </span>),
            disable:true
        },
        {   key:"avatar",
            text:<span>Change Avatar</span>
        },
        {   key:'signout',
            text: <span onClick={this.handleSignout}>Sign Out</span>
        }

    ]

handleSignout=()=>{
    firebase
    .auth()
    .signOut()
    .then(()=> console.log("signed out"))
}
     


render(){

    return(

        <Grid style={{background:'4c3c4c'}}>

            <Grid.Column>
                <Grid.Row style={{padding:'1.2em',margin:0}}>
           {/* main app */}
            
            <Header inverted floated="left" as ="h2">
            <Icon name="code"/>

            <Header.Content>DevChat</Header.Content>
            </Header>
            <Header style={{padding:'0.25em'}} as ="h4" inverted>

            <Dropdown trigger={
                <span>
                    {/* <Img src={this.state.user.photoURL} spaced="right" avatar/> */}
                    {this.state.user.displayName}</span>
            } options={this.DropdownOptions()}/>
 
            
            </Header>
            </Grid.Row>
            </Grid.Column>

        </Grid>

    ) 

}
}



export default UserPanel