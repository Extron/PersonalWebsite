import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import styled from "styled-components";
import lodash from "lodash";

import Disqus from "../../components/Disqus/Disqus";
import Tag from "../../components/Common/Tag";

import "katex/dist/katex.min.css"

import config from "../../../data/SiteConfig";

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
`;

const PostBody = styled.div`
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
                                <Link to={`/topics/${lodash.kebabCase(postNode.frontmatter.topic)}`}>
                                    <h3>{postNode.frontmatter.topic}</h3>
                                </Link>
                                <h1>{postNode.frontmatter.title}</h1>
                                <p>{postNode.frontmatter.date}</p>
                                {postNode.frontmatter.tags.map(tag => <Tag key={tag} to={`/blog/tags/${lodash.kebabCase(tag)}`}>{tag}</Tag>)}
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