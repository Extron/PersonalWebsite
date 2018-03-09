import React, { Component } from "react";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'

import "./Header.scss";

export default class Header extends Component {

  static propTypes = {
    headerConfig: PropTypes.object.isRequired
  }

  render() {
    const { children, headerConfig } = this.props;
    return (
      <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row bg-primary">
      <div className="container">
        <Link className="text-center" to="/">
          <h1 className="navbar-brand mb-0">{headerConfig.title}</h1>
        </Link>
        <div className="navbar-nav-scroll">
          <ul className="navbar-nav bd-navbar-nav flex-row">
            {this.renderPages(headerConfig.pages, this.props.location)}
          </ul>
        </div>
        <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
        <div className="navbar-nav-scroll">
          <ul className="navbar-nav navbar-right">
          {this.renderSocialMedia(headerConfig.socialMedia)}
          </ul>
        </div>
      </div>
    </nav>
    );
  }

  renderPages(pages, location) {
    return pages.map(link => (
      <li key={link.label} className={ location.pathname === link.path ? 'nav-item active' : 'nav-item' }>
        <Link to={link.path} className="nav-link">
          {link.label}
        </Link>
      </li>
    ));
  }

  renderSocialMedia(socialMedia) {
    return socialMedia.map(link => (
      <li key={link.label}>
        <a className="btn btn-social-icon" href={link.url}><span className={link.iconClassName}></span></a>
      </li>
    ));
  }
}
