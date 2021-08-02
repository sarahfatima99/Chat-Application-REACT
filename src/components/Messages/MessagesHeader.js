import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessagesHeader extends React.Component {


    render() {
        return (
            <Segment clearing>
                <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                    <span>
                        Channel
                     <Icon name={"star outline"} color="black" />
                    </span>
                </Header>
                <Header.Subheader>2 Users</Header.Subheader>
                <Input 
                size="mini"
                Icon="searc"
                name="searchTerm"
                placeholder="search Meassages"
                />
            </Segment>

        )
    }

}

export default MessagesHeader