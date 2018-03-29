import React from "react";
import Helmet from "react-helmet";
import SEO from "../components/SEO/SEO";
import Link from "gatsby-link";
import styled from "styled-components";

import ProjectPreview from "../components/Projects/ProjectPreview";
import PostPreview from "../components/Blog/PostPreview";
import { GridDeck } from "../components/Common/StyledComponents";

import config from "../../data/SiteConfig";

const Jumbotron = styled.div.attrs({
    className: "jumbotron"
})`
`;

const PreviewContainer = styled.div.attrs({
    className: "container-fluid"
})`
    padding: 16px 15%;
`;

const ProjectCardDeck = styled.div.attrs({
    className: "grid-deck"
})`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
    grid-gap: 16px;
`;

const VerticalSplitter = styled.div.attrs({
})`
    width: 1px;
    height: 100%;
    border-left: 1px solid lightgrey;
    margin-left: auto;
    margin-right: auto;
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

        const projects = this.normalizeProjectQuery(postEdges.filter(edge => edge.node.frontmatter.dir === "projects" && edge.node.frontmatter.status === "active"));
        const posts = this.normalizePostQuery(postEdges.filter(edge => edge.node.frontmatter.dir === "blog").slice(0, 4));

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
                                A picture of me here
                            </div>
                            <div className="col">
                                <h1>Hello there!</h1>
                                <p>My name is Trystan Binkley-Jones, and this is my personal website.  I am a software engineer from Colorado.  I also like doing mathematics and physics, and have interests in music and video games.</p>
                                <p>Here you can find information and links to <a>projects</a> I have worked on, <a>papers</a> on a variety of subjects that I have written, <a>blog posts</a> that I have made, and <a>tutorials</a> that I have produced.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <PreviewContainer>
                    <div className="row">
                        <div className="col">
                            <h2>Active Projects</h2>
                            <GridDeck>
                                {this.renderProjectPreviews(projects)}
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
                            {this.renderPostPreviews(posts)}
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

    renderProjectPreviews(projects) {
        return projects.map(project => (
            <ProjectPreview key={project.title} projectInfo={project} />
        ));
    }

    renderPostPreviews(posts) {
        return posts.map(post => (
            <PostPreview key={post.title} postInfo={post} />
        ));
    }

    normalizeProjectQuery(edges) {
        const projects = [];

        edges.forEach(edge => {
            projects.push({
                path: `/${edge.node.frontmatter.dir}${edge.node.fields.slug}`,
                title: edge.node.frontmatter.title,
                category: edge.node.frontmatter.category,
                previewCopy: edge.node.frontmatter.previewCopy,
                previewImage: edge.node.frontmatter.previewImage ? edge.node.frontmatter.previewImage.childImageSharp.original.src : ""
            });
        });

        return projects;
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
                    }
                    excerpt
                    frontmatter {
                        title
                        date
                        dir
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
