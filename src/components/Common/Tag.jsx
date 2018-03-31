import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

export const TagLink = styled.a.attrs({
    className: "badge badge-primary"
})`
    margin: 4px;
    
    :link {
        color: ${props => props.theme.colors.textLight};
    }
`;

export default class Tag extends React.Component {
    render() {
        const {
            to,
            children
        } = this.props;

        return <TagLink href={to}>{children}</TagLink>;
    }
}