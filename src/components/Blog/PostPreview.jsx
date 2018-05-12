import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import lodash from "lodash";

const Card = styled.div.attrs({
    className: "card"
})`
    margin-top: 16px;
    margin-bottom: 16 px;
`;

const Header = styled.a`
    > h2 {

    }

    > p {

    }
`;

const Excerpt = styled.p`
`;

export default class PostPreview extends React.Component {

    static propTypes = {
        postInfo: PropTypes.object.isRequired
    }

    render() {
        const { postInfo } = this.props;
        return (
            <Card>
                <Link to={`/blog/topics/${lodash.kebabCase(postInfo.topic)}`}>
                    <h3 className="card-header">
                        {postInfo.topic}
                    </h3>
                </Link>
                <div className="card-body">
                    <Header href={postInfo.path}>
                        <h2 className="card-title">{postInfo.title}</h2>
                        <h6>{postInfo.date}</h6>
                    </Header>
                    <Excerpt>{postInfo.excerpt}</Excerpt>
                </div>
            </Card>
        );
    }
}