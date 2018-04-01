import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import rehypeReact from "rehype-react";
import lodash from "lodash";

import ImageCarousel from "../../components/Common/ImageCarousel";
import MarkdownImage from "../../components/Common/MarkdownImage";
import Tag from "../../components/Common/Tag";

import config from "../../../data/SiteConfig";

const Container = styled.div.attrs({
    className: "container"
})`
    margin-top: 16px;
    margin-bottom: 48px;
`;

const Project = styled.div`
`;

const ProjectHeader = styled.div`

    > h1 {
        font-size: 4em;
    }
`;

const ProjectBody = styled.div`
`;

export default class ProjectTemplate extends React.Component {
    render() {
        const projectNode = this.props.data.markdownRemark;
        const slug = this.props.pathContext.slug;

        const renderAst = new rehypeReact({
            createElement: React.createElement,
            components: {
                "image-carousel": ImageCarousel,
                "md-image": MarkdownImage
            }
        }).Compiler;

        return (
            <div className="project-page">
                <Helmet>
                    <title>{`${projectNode.frontmatter.title} | ${config.siteTitle} `}</title>
                    <link rel="canonical" href={`${config.siteUrl}${slug}`} />
                </Helmet>
                <Container>
                    <div className="col-md-12">
                        <Project>
                            <ProjectHeader>
                                <h3>{projectNode.frontmatter.category}</h3>
                                <h1>{projectNode.frontmatter.title}</h1>
                                {projectNode.frontmatter.tags.map(tag => <Tag key={tag} to={`/projects/tags/${lodash.kebabCase(tag)}`}>{tag}</Tag>)}
                            </ProjectHeader>
                            <hr />
                            <ProjectBody>
                                {renderAst(projectNode.htmlAst)}
                            </ProjectBody>
                        </Project>
                    </div>
                </Container>
            </div>
        )
    }
}

export const projectQuery = graphql`
    query ProjectBySlug($slug: String!) {
        markdownRemark (
            fileAbsolutePath: { regex: "\/.*\/projects\/.*\\.md$/" }
            fields: { slug: { eq: $slug } }
        ) {
            htmlAst
            frontmatter {
                title
                category
                tags
            }
            fields {
                slug
                dir
            }
        }
    }
`;