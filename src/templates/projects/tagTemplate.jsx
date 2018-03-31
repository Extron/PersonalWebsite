import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import ProjectPreview from "../../components/Projects/ProjectPreview";
import { GridDeck } from "../../components/Common/StyledComponents";
import { normalizeProjectQuery } from "../../components/Utilities/Utilities";

import config from "../../../data/SiteConfig";
import projectMetadata from "../../../data/ProjectMetadata";


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

export default class ProjectsTagTemplate extends React.Component {
    render() {
        const tag = this.props.pathContext.tag;
        const projectEdges = this.props.data.allMarkdownRemark.edges;
        const projects = normalizeProjectQuery(projectEdges);

        return (
            <div className="tag-container">
                <Helmet>
                    <title>{`Projects tagged as "${tag}" | ${config.siteTitle}`}</title>
                    <link rel="canonical" href={`${config.siteUrl}/tags/${tag}`} />
                </Helmet>
                <Container>
                    <Header>
                        <h3>All projects tagged</h3>
                        <h1>{`"${tag}"`}</h1>
                    </Header>
                    <hr/>
                    <GridDeck>
                        {this.renderProjectPreviews(projects)}
                    </GridDeck>
                </Container>
            </div>
        );
    }

    renderProjectPreviews(projects) {
        const sort = (a, b) => {
            const aStatus = projectMetadata.statuses.find(statusConfig => statusConfig.name === a.status);
            const bStatus = projectMetadata.statuses.find(statusConfig => statusConfig.name === b.status);

            return projectMetadata.statuses.indexOf(aStatus) - projectMetadata.statuses.indexOf(bStatus);
        };

        return projects.sort(sort).map(project => (
            <ProjectPreview key={project.title} projectInfo={project} showStatus="showStatus" />
        ));
    }
}

export const projectQuery = graphql`
    query TaggedProjects($tag: String) {
        allMarkdownRemark(
            limit: 1000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fileAbsolutePath: { regex:"\/.*\/projects\/.*\\.md$/" }, frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        dir
                        category
                        status
                        tags
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
