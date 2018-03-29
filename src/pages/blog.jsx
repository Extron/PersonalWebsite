import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import config from "../../data/SiteConfig";
import PostPreview from "../components/Blog/PostPreview";

const Container = styled.div.attrs({
    className: "container"
}) `
    padding: 16px;
`;

const Header = styled.div`
    > h1 {
        font-size: 4em;
        margin-bottom: 16px;
    }
`;

const BlogList = styled.div.attrs({
    className: "col-sm-8"
})`
`;

export default class Blog extends React.Component {
    render() {
        const postEdges = this.props.data.allMarkdownRemark.edges;
        const posts = this.normalizePostQuery(postEdges);

        return (
            <div className="blog-container">
                <Helmet>
                    <title>{`Blog | ${config.siteTitle}`}</title>
                    <link rel="canonical" href={`${config.siteUrl}/blog/`} />
                </Helmet>

                <Container>
                    <Header>
                        <h1>Blog</h1>
                        <p>I write about a variety of topics. Browse by topic or by post date.</p>
                    </Header>
                    <hr/>
                    <div className="row">
                        <BlogList>
                            {this.renderPostPreviews(posts)}
                        </BlogList>
                    </div>
                </Container>
            </div>
        );
    }

    renderPostPreviews(posts) {
        return posts.map(post => (
            <PostPreview key={post.title} postInfo={post} />
        ));
    }

    normalizePostQuery(edges) {
        const posts = [];

        edges.forEach(edge => {
            posts.push({
                path: `/${edge.node.frontmatter.dir}${edge.node.fields.slug}`,
                title: edge.node.frontmatter.title,
                date: edge.node.frontmatter.date,
                topic: edge.node.frontmatter.topic,
                excerpt: edge.node.excerpt
            });
        });

        return posts;
    }
}

export const postsQuery = graphql`
    query PostsQuery {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fileAbsolutePath: { regex:"\/.*\/blog\/.*\\.md$/" } }
        ) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
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