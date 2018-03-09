import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import config from "../../data/SiteConfig";

const Container = styled.div.attrs({
    className: "container"
})`
    margin-top: 16px;
`;

const Project = styled.div`
`;

const ProjectHeader = styled.div`

    > h1 {
        font-size: 4em;
    }

    > p {
        font-size: 1em;
        margin: 0px;
        color: #666666;
    }
`;

const ProjectBody = styled.div`
`;

const Tag = styled.span.attrs({
    className: "badge badge-primary"
})`
    margin: 4px;
`;

export default class ProjectTemplate extends React.Component {
    render() {
        const projectNode = this.props.data.markdownRemark;
        const slug = this.props.pathContext.slug;

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
                                <p>{projectNode.frontmatter.category}</p>
                                <h1>{projectNode.frontmatter.title}</h1>
                                {this.renderTags(projectNode.frontmatter.tags)}
                            </ProjectHeader>
                            <hr />
                            <ProjectBody>
                                <div dangerouslySetInnerHTML={{ __html: projectNode.html }} />
                            </ProjectBody>
                        </Project>
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

export const projectQuery = graphql`
    query ProjectBySlug($slug: String!) {
        markdownRemark (
            fileAbsolutePath: { regex: "\/.*\/projects\/.*\\.md$/" }
            fields: { slug: { eq: $slug } }
        ) {
            html
            frontmatter {
                title
                category
                tags
            }
            fields {
                slug
            }
        }
    }
`;