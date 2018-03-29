import styled from "styled-components";

export const GridDeck = styled.div.attrs({
    className: "grid-deck"
})`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
    grid-gap: 16px;
`;

export const Button = styled.a.attrs({
    className: "btn btn-primary"
})`
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};

    :link {
        color: ${props => props.theme.colors.textLight};
    }
`