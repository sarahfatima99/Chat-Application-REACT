import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

class MessagesHeader extends React.Component {


    render() {
        const { channelName, numUniqueUsers, handleSearchChange, searchLoading , isPrivateChannel} = this.props
        return (
            <Segment clearing>
                <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                    <span>
                        {channelName}
                        {!isPrivateChannel&&<Icon name={"star outline"} color="black" />}
                    </span>
                </Header>

                <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                <Header floated="right">                <Input
                    loading={searchLoading}
                    onChange={handleSearchChange}
                    size="mini"
                    Icon="search"
                    name="searchTerm"
                    placeholder="search Meassages"
                />

                </Header>

            </Segment>

        )
    }

}

export default MessagesHeader