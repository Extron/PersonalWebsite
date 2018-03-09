import React from "react";
import Link from "gatsby-link";
import styled from 'styled-components';

const Card = styled.div.attrs({
    className: "card"
})`
    max-width: 320px;
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

export default class ProjectPreview extends React.Component {
    render() {
        const { projectInfo } = this.props;

        return (
            <Card>
                <CardImage src={projectInfo.previewImage} alt="Card image cap"/>
                <div className="card-body">
                    <CardSubtitle>{projectInfo.category}</CardSubtitle>
                    <CardTitle>{projectInfo.title}</CardTitle>
                    <CardPreviewCopy>{projectInfo.previewCopy}</CardPreviewCopy>
                </div>
                <div className="card-footer">
                    <a href={projectInfo.path} className="btn btn-primary">View</a>
                </div>
            </Card>
        );
    }
}
