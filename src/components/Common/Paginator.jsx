import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

const Container = styled.nav`
    padding: 16px 0px;
`;

export default class Paginator extends React.Component {
    render() {
        const { start, current, total, path} = this.props;
        const pages = [ start, start + 1, start + 2 ].filter(page => page <= total);

        return (
            <Container>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${current == 1 ? "disabled" : ""}`}>
                        <Link className="page-link" to={`${path}/${current - 1}`} tabIndex="-1">Prev</Link>
                    </li>
                    {pages.map(page => this.renderPageLink(page, page == current, path))}
                    <li className={`page-item ${current == total ? "disabled" : ""}`}>
                        <Link className="page-link" to={`${path}/${current + 1}`}>Next</Link>
                    </li>
                </ul>
            </Container>
        );
    }

    renderPageLink(pageNum, active, path) {
        return (
            <li key={pageNum} className={`page-item ${active ? "active" : ""}`}>
                <Link className="page-link" to={`${path}/${pageNum}`}>{pageNum}</Link>
            </li>
        )
    }
}