import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import PostPreview from "../../components/Blog/PostPreview";
import { normalizePostQuery } from "../../components/Utilities/Utilities";

import config from "../../../data/SiteConfig";


const Container = styled.div.attrs({
    className: "container"
})`
    padding: 16px;
`;

const Header = styled.div`
    margin: 16px 0px;

    > h1 {
        font-size: 3rem;
        margin-bottom: 16px;
    }
`;


export default class BlogTagTemplate extends React.Component {
    render() {
        const tag = this.props.pathContext.tag;
        const postEdges = this.props.data.allMarkdownRemark.edges;
        const posts = normalizePostQuery(postEdges);

        return (
            <div className="tag-container">
                <Helmet>
                    <title>{`Posts tagged as "${tag}" | ${config.siteTitle}`}</title>
                    <link rel="canonical" href={`${config.siteUrl}/tags/${tag}`} />
                </Helmet>
                <Container>
                    <Header>
                        <h3>All posts tagged</h3>
                        <h1>{`"${tag}"`}</h1>
                    </Header>
                    <hr/>
                    {posts.map(post =><PostPreview key={post.title} postInfo={post} />)}
                </Container>
            </div>
        );
    }
}

export const postQuery = graphql`
    query TaggedPosts($tag: String) {
        allMarkdownRemark(
            limit: 1000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fileAbsolutePath: { regex:"\/.*\/blog\/.*\\.md$/" }, frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    excerpt
                    frontmatter {
                        title
                        date
                        dir
                        topic
                    }
                }
            }
        }
    }
`;
