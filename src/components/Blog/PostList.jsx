import React from "react";
import styled from "styled-components";

import PostPreview from "./PostPreview";

export default class PostList extends React.Component {
    render() {
        const { posts } = this.props;

        return (
            <div>
                {posts.map(post => <PostPreview key={post.title} postInfo={post} />)}
            </div>
        );
    }
}