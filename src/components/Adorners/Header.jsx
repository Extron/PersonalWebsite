import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

import { header } from "../../../data/SiteConfig";

import "font-awesome/scss/font-awesome.scss";

const NavBar = styled.nav.attrs({
    className: "navbar navbar-expand"
})`
    background-color: ${props => props.theme.colors.primary};

    .container {   
        display: flex;
        align-items: baseline;
    }

    a {
        color: ${props => props.theme.colors.textLight};
    }
`;

const Branding = styled.div`
    margin: 0px 12px;
    
    .navbar-brand {
        font-size: 2rem;
        padding: 0px;
        margin: 0px;
    }

    img {
        display: inline-block;
        vertical-align: text-bottom;
        padding-bottom: 0px;
        margin-right: 6px;
        margin-bottom: 0px;
    }
`;

const Page = styled.div`
    .nav-link {
        font-size: 1.2rem;
        margin: 0px 0px;
        padding: 0px;
    }
`;

const SocialButton = styled.a.attrs({
    className: "btn btn-social-icon"
})`
    font-size: 1.3rem;
`;

export default class Header extends React.Component {
    render() {
        return (
            <NavBar>
                <div className="container">
                    <Branding>
                        <Link to="/">
                            <img src="/logos/logo-48.png" height="32"/>
                            <h1 className="navbar-brand">{header.title}</h1>
                        </Link>
                    </Branding>
                    <ul className="navbar-nav flex-row">
                        {this.renderPages(header.pages, this.props.location)}
                    </ul>
                    <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
                    <ul className="navbar-nav navbar-right">
                        {this.renderSocialMedia(header.socialMedia)}
                    </ul>
                </div>
            </NavBar>
        );
    }

    renderPages(pages, location) {
        return pages.map(link => (
            <li key={link.label} className={location.pathname === link.path ? 'nav-item active' : 'nav-item'}>
                <Page>
                    <Link to={link.path} className="nav-link">
                        {link.label}
                    </Link>
                </Page>
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
