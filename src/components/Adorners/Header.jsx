import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

import { header } from "../../../data/SiteConfig";


const SocialButton = styled.a.attrs({
    className: "btn btn-social-icon"
})`
    color: ${props => props.theme.colors.textLight};
`;

export default class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row bg-primary">
                <div className="container">
                    <Link className="text-center" to="/">
                        <h1 className="navbar-brand mb-0">{header.title}</h1>
                    </Link>
                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav bd-navbar-nav flex-row">
                            {this.renderPages(header.pages, this.props.location)}
                        </ul>
                    </div>
                    <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav navbar-right">
                            {this.renderSocialMedia(header.socialMedia)}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    renderPages(pages, location) {
        return pages.map(link => (
            <li key={link.label} className={location.pathname === link.path ? 'nav-item active' : 'nav-item'}>
                <Link to={link.path} className="nav-link">
                    {link.label}
                </Link>
            </li>
        ));
    }

    renderSocialMedia(socialMedia) {
        return socialMedia.map(link => (
            <li key={link.label}>
                <SocialButton href={link.url}><span className={link.iconClassName}></span></SocialButton>
            </li>
        ));
    }
}
