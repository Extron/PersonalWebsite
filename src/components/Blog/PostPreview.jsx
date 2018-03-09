import React from "react";
import PropTypes from 'prop-types';
import Link from "gatsby-link";
import styled from 'styled-components';

const BlogPreview = styled.div`
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
            <BlogPreview className="blog-preview">
                <Header href={postInfo.path}>
                    <h2>{postInfo.title}</h2>
                    <p>{postInfo.date}</p>
                </Header>
                <hr/>
                <Excerpt>{postInfo.excerpt}</Excerpt>
            </BlogPreview>
        );
    }
}