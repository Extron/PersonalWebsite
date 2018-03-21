import React from "react";
import styled from "styled-components";

const MDImage = styled.span.attrs({
    className: "md-image"
})`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Image = styled.img`
    padding-bottom: 0px;
    margin-bottom: 8px;
`;

const Caption = styled.p.attrs({
    className: "caption"
})`
    font-style: italic;
    font-size: 0.85rem;
    margin-bottom: 0px;
`;

export default class MarkdownImage extends React.Component {
    render() {
        const {
            src,
            link,
            justify,
            caption
        } = this.props;

        const img = (
            <Image src={src}>
            </Image>
        );

        const imgContent = link === "link" ? this.renderLink(img, src) : img;

        return (
            <MDImage style={{ alignItems: justify != undefined ? justify : "center"}}>
                {imgContent}
                {this.renderCaption(caption)}
            </MDImage>
        );
    }

    renderLink(img, src) {
        return (
            <a href={src}>
                {img}
            </a>
        );
    }

    renderCaption(caption) {
        if (caption != undefined) {
            return (
                <Caption>{caption}</Caption>
            )
        }
        else {
            return "";
        }
    }
}