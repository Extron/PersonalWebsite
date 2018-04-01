import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import ProjectPreview from "../components/Projects/ProjectPreview";
import { GridDeck } from "../components/Common/StyledComponents";
import { normalizeProjectQuery } from "../components/Utilities/Utilities";

import config from "../../data/SiteConfig";
import projectMetadata from "../../data/ProjectMetadata";

const Container = styled.div.attrs({
    className: "container"
})`
    padding: 16px;
`;

const Header = styled.div`
    > h1 {
        font-size: 4em;
        margin-bottom: 16px;
    }
`;

const ProjectCategory = styled.div.attrs({
    className: "project-category"
})`
    margin-top: 16px;
    margin-bottom: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid lightgrey;

    > h2
    {
        font-size: 2em;
        margin-bottom: 16px;
    }
`;

export default class Projects extends React.Component {
    render() {
        const projectEdges = this.props.data.allMarkdownRemark.edges;
        const projects = normalizeProjectQuery(projectEdges);
        const categories = Array.from(new Set(projects.map(project => project.category)));
        
        return (
            <div className="projects-container">
                <Helmet>
                    <title>{`Projects | ${config.siteTitle}`}</title>
                    <link rel="canonical" href={`${config.siteUrl}/projects/`} />
                </Helmet>

                <Container>
                    <Header>
                        <h1>Projects</h1>
                        <p>A list of various projects I have worked on.</p>
                    </Header>
                    <hr/>
                    {this.renderCategories(categories, projects)}
                </Container>
            </div>
        );
    }

    renderCategories(categories, projects) {
        return categories.sort((a, b) => projectMetadata.categories.indexOf(a) - projectMetadata.categories.indexOf(b)).map(category => (
            <ProjectCategory key={category}>
                <h2>{category}</h2>
                <GridDeck>
                    {this.renderProjectPreviews(projects.filter(project => project.category === category))}
                </GridDeck>
            </ProjectCategory> 
        ))
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

export const projectsQuery = graphql`
    query ProjectsQuery {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fileAbsolutePath: { regex:"\/.*\/projects\/.*\\.md$/" } }
        ) {
            edges {
                node {
                    fields {
                        slug
                        dir
                    }
                    frontmatter {
                        title
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