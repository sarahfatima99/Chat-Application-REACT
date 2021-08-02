import React from "react";
import { Grid } from "semantic-ui-react";
import "./App.css";
import {connect} from 'react-redux'
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetalPanel from "./MetalPanel/MetalPanel";

const App = ({currentUser,currentChannel}) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages currentUser={currentUser} currentChannel={currentChannel}/>
    </Grid.Column>

    <Grid.Column width={4}>
      <MetalPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProps=state=>
({
  currentUser:state.user.currentUser,
  currentChannel:state.channel.currentChannel
})
export default connect(mapStateToProps)( App);
