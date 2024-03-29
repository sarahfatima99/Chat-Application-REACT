import React, { Component } from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react'
import mime from 'mime-types'

class FileModal extends Component {

    state={
        file:null,
        authorized:['image/jpeg','image/png'],
        closeModal:this.props.closeModal,
        uploadFile:this.props.uploadFile
    }

    addFile=event=>{
        const file=event.target.files[0]
        if(file){
            this.setState({file})
        }
    }


    sendFile=()=>{
        const {file}=this.state;
        const { uploadFile, closeModal } = this.props;
        if(file!=null){
            if(this.isAuthorized(file.name)){
                const metadata={contentType:mime.lookup(file.name)}
                uploadFile(file,metadata)
                closeModal();
                this.clearFile()
            }
        }
    }

    clearFile=()=>this.setState({file:null})





isAuthorized=filename=>this.state.authorized.includes(mime.lookup(filename));

    render() {

        const { modal, closeModal } = this.props;

     

        return (

            <Modal basic open={modal} onClose={closeModal}>

                <Modal.Header>
                    Select an Image Files
                </Modal.Header>
                <Modal.Content>
                    <Input
                        fluid
                        label="File types:jpg,png"
                        name="file"
                        type="file" 
                        onChange={this.addFile}/>

                </Modal.Content>

                <Modal.Actions>
                    <Button onClick={this.sendFile} color="green"
                        inverted>
                        <Icon name="checkmark" />Send</Button>
                    <Button color="red"
                    inverted
                    onClick={closeModal}> Cancel </Button>
                </Modal.Actions>

            </Modal>

        );
    }
}

export default FileModal;