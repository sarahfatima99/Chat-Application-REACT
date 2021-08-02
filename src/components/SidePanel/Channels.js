import React from 'react'

import { Menu, Icon, Model, Modal, Form, Input, Button } from 'semantic-ui-react'
import firebase from '../../Firebase'
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions'

class Channels extends React.Component {
    state = {
        user: this.props.currentUser,
        channels: [],
        ChannelName: "",
        ChannelDetails: "name",
        channelsRef: firebase.database().ref('channels'),
        modal: false,
        firstLoad: true,
        activeChannel:''

    }



    componentDidMount() {
        this.addListeners();
    }

    addListeners = () => {
        let loadedChannels = []
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            this.setState({ channels: loadedChannels }, () => this.setFirstChannel())
        })
    }

 
  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }
    this.setState({ firstLoad: false });
  };

    handleSubmit = event => {
        event.preventDefault();

        if (this.isFormValid(this.state)) {
            this.addChannel()
        }
    }

    changeChannel = channel => {
        this.setActiveChannel(channel)
        this.props.setCurrentChannel(channel)
    }

    setActiveChannel=channel=>{
        this.setState({activeChannel:channel.id})
    }

    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                style={{ opacity: 0.7 }}
                active={channel.id===this.state.activeChannel}            >
                #{channel.name}

            </Menu.Item>
        ))


    )
   

    addChannel = () => {
        const { channelsRef, ChannelName, ChannelDetails, user } = this.state;
        const key = channelsRef.push().key
        const newChannel = {
            id: key,
            name: ChannelName,
            details: ChannelDetails,
            createdBy: {
                name: user.displayName
            }
        }

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({ ChannelName: '', ChannelDetails: '' }, () => this.setFirstChannel())
                this.closeModal
                console.log("channel added")
            })
            .catch(err => {
                console.error(err)
            })
    }



    isFormValid = ({ ChannelName, ChannelDetails }) => ChannelName && ChannelDetails

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    openModal = () => this.setState({ modal: true })
    closeModal = () => this.setState({ modal: false })

    render() {

        const { channels, modal } = this.state
        return (
            <React.Fragment>
                <Menu.Menu style={{ paddingBottom: "2em" }}>
                    <Menu.Item>

                        <span>

                            <Icon name="exchange" />

                            Channels

                        </span>
                        ({channels.length}) <Icon name="add" onClick={this.openModal} />

                    </Menu.Item>
                    {this.displayChannels(channels)}
                </Menu.Menu>
                {/* Channels */}

                {/* //Add channel modal */}
                <Modal basic open={modal} onClose={this.closeModal}>

                    <Modal.Header>Add a Channel</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Name of Channel"
                                    name="ChannelName"
                                    onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="About the Channel"
                                    name="ChannelDetails"
                                    onChange={this.handleChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSubmit}>
                            <Icon name="checkmark" />
                            Add
                        </Button>
                        <Button color="red" inverted onClick={this.closeModal}>
                            <Icon name="remove" />
                            Cancel
                        </Button>
                    </Modal.Actions>

                </Modal>

            </React.Fragment>

        )
    }
}

export default connect(null, { setCurrentChannel })(Channels)