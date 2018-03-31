import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

import { Button } from "../Common/StyledComponents";
import Tag from "../Common/Tag";

import projectMetadata from "../../../data/ProjectMetadata"
import theme from "../../../data/SiteTheme";

const Card = styled.div.attrs({
    className: "card"
})`
    max-width: 320px;
    min-width: 192px;
`;

const CardStatus = styled.h5`
`;

const CardTitle = styled.h5.attrs({
    className: "card-title"
})`
    font-size: 1.65em;
    margin-bottom: 12px;
`;

const CardSubtitle = styled.h6.attrs({
    className: "card-subtitle"
})`
    font-size: 1.15em;
    margin-top: 0px;
    margin-bottom: 4px;
`;

const CardPreviewCopy = styled.p.attrs({
    className: "card-text"
})`
    font-size: 0.9em;
`;

const CardImage = styled.img.attrs({
    className: "card-img-top"
})`
    min-height: 128px;
`;

const CardTags = styled.div`
    padding: 4px 0px;
`;

export default class ProjectPreview extends React.Component {
    render() {
        const { projectInfo, showStatus } = this.props;
        const status = showStatus !== undefined ? this.renderStatus(projectInfo) : "";

        return (
            <Card>
                {status}
                <CardImage src={projectInfo.previewImage} alt="Card image cap"/>
                <div className="card-body">
                    <CardSubtitle>{projectInfo.category}</CardSubtitle>
                    <CardTitle>{projectInfo.title}</CardTitle>
                    <CardTags>
                    </CardTags>
                    <CardPreviewCopy>{projectInfo.previewCopy}</CardPreviewCopy>
                </div>
                <div className="card-footer">
                    <Button href={projectInfo.path}>View</Button>
                </div>
            </Card>
        );
    }

    renderStatus(projectInfo) {
        return (
            <div className="card-header" style={{backgroundColor: this.getHeaderBackgroundColor(projectInfo.status)}}>
                <CardStatus style={{color: theme.colors.textLight}}>{this.capitalizeStatus(projectInfo.status)}</CardStatus>
            </div>
        );
    }

    getHeaderBackgroundColor(status) {
        return projectMetadata.statuses.find(statusConfig => statusConfig.name === status).color;
    }

    capitalizeStatus(status) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
}
