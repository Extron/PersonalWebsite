import React from "react";
import RDComments from "react-disqus-comments";
import styled from "styled-components";

import config from "../../../data/SiteConfig";

const Comments = styled.div`
    margin-top: 48px;
`;

const Header = styled.div`
    > h2 {
        font-size: 2em;
    }
`;

export default class Disqus extends React.Component {
    render() {
        const { postInfo } = this.props;

        if (!config.disqus.shortname) {
            return null;
        }

        return (
            <Comments>
                <Header>
                    <h2>Comments</h2>
                    <hr/>
                </Header>
                <RDComments
                    shortname={config.disqus.shortname}
                    identifier={postInfo.title}
                    title={postInfo.title}
                    url={postInfo.url} />
            </Comments>
        );
    }
}
