import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import config from "../../data/SiteConfig";

import Disqus from "../components/Disqus/Disqus";

const Container = styled.div.attrs({
    className: "container"
})`
    margin-top: 16px;
`;

const Post = styled.div`
`;

const PostHeader = styled.div`

    > h1 {
        font-size: 4em;
    }

    > p {
        font-size: 1em;
        margin: 0px;
        color: #666666;
    }
`;

const PostBody = styled.div`
`;

const Tag = styled.span.attrs({
    className: "badge badge-primary"
})`
    margin: 4px;
`;

export default class PostTemplate extends React.Component {
    render() {
        const postNode = this.props.data.markdownRemark;
        const slug = this.props.pathContext.slug;
        const url = `${config.siteUrl}/${postNode.frontmatter.dir}${slug}`;

        return (
            <div className="project-page">
                <Helmet>
                    <title>{`${postNode.frontmatter.title} | ${config.siteTitle} `}</title>
                    <link rel="canonical" href={url} />
                </Helmet>
                <Container>
                    <div className="col-md-12">
                        <Post>
                            <PostHeader>
                                <p>{postNode.frontmatter.topic}</p>
                                <h1>{postNode.frontmatter.title}</h1>
                                <p>{postNode.frontmatter.date}</p>
                                {this.renderTags(postNode.frontmatter.tags)}
                            </PostHeader>
                            <hr />
                            <PostBody>
                                <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
                            </PostBody>
                        </Post>
                        <Disqus postInfo={{ title: postNode.frontmatter.title, url: url}} expanded="true" />
                    </div>
                </Container>
            </div>
        )
    }

    renderTags(tags) {
        return tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
        ));
    }
}

export const postQuery = graphql`
    query PostBySlug($slug: String!) {
        markdownRemark (
            fileAbsolutePath: { regex: "\/.*\/blog\/.*\\.md$/" }
            fields: { slug: { eq: $slug } }
        ) {
            html
            frontmatter {
                title
                date
                topic
                tags
                dir
            }
            fields {
                slug
            }
        }
    }
`;