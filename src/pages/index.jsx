import React from "react";
import Helmet from "react-helmet";
import SEO from "../components/SEO/SEO";
import Link from "gatsby-link";
import styled from "styled-components";

import ProjectPreview from "../components/Projects/ProjectPreview";
import PostPreview from "../components/Blog/PostPreview";
import { GridDeck, VerticalSplitter } from "../components/Common/StyledComponents";
import { normalizeProjectQuery, normalizePostQuery } from "../components/Utilities/Utilities";

import config from "../../data/SiteConfig";

const Jumbotron = styled.div.attrs({
    className: "jumbotron"
})`
    padding: 0px;
    margin: 0px;
`;

const ProfileImage = styled.img.attrs({
})`
    padding: 0px;
    margin: 0px;
`;

const ProfileBlurb = styled.div.attrs({
})`
    padding-top: 16px;
`;

const PreviewContainer = styled.div.attrs({
    className: "container-fluid"
})`
    padding: 16px 15%;
`;

const Director = styled.div`
    margin-top: 16px;

    > a {
        font-size: 1.5rem;
    }
`;

class Index extends React.Component {
    render() {
        const postEdges = this.props.data.allMarkdownRemark.edges;

        const projects = normalizeProjectQuery(postEdges.filter(edge => edge.node.fields.dir === "projects" && edge.node.frontmatter.status === "active"));
        const posts = normalizePostQuery(postEdges.filter(edge => edge.node.fields.dir === "blog").slice(0, config.blog.maxPreviewPosts));

        return (
            <div className="index-container">
                <Helmet>
                    <title>{config.siteTitle}</title>
                    <link rel="canonical" href={`${config.siteUrl}`} />
                </Helmet>
                <SEO postEdges={postEdges} />
                <Jumbotron>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <ProfileImage src="/images/me.jpg" />
                            </div>
                            <div className="col">
                                <ProfileBlurb>
                                    <h1>Hello there!</h1>
                                    <p>My name is Trystan Binkley-Jones, and this is my personal website.  I am a software engineer from Colorado.  I also like doing mathematics and physics, and have interests in music and video games.</p>
                                    <p>Here you can find information and links to <a>projects</a> I have worked on, <a>papers</a> on a variety of subjects that I have written, <a>blog posts</a> that I have made, and <a>tutorials</a> that I have produced.</p>
                                </ProfileBlurb>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <PreviewContainer>
                    <div className="row">
                        <div className="col">
                            <h2>Active Projects</h2>
                            <GridDeck>
                                {projects.map(project => <ProjectPreview key={project.title} projectInfo={project} />)}
                            </GridDeck>
                            <Director>
                                <Link to="/projects/">
                                    See All Projects
                                </Link>
                            </Director>
                        </div>
                        <div className="col-1">
                            <VerticalSplitter/>
                        </div>
                        <div className="col">
                            <h2>Recent Blog Posts</h2>
                            {posts.map(post => <PostPreview key={post.title} postInfo={post} />)}
                            <Director>
                                <Link to="/blog/">
                                    See All Posts
                                </Link>
                            </Director>
                        </div>
                    </div>
                </PreviewContainer>
            </div>
        );
    }
}

export default Index;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    fields {
                        slug
                        dir
                    }
                    excerpt
                    frontmatter {
                        title
                        date
                        category
                        topic
                        status
                        previewCopy
                        previewImage {
                            childImageSharp {
                                original {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
