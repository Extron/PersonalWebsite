import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./Footer.scss";

export default class Footer extends Component {
  static propTypes = {
    footerConfig: PropTypes.object.isRequired
  }

  render() {
    const { footerConfig } = this.props;

    return (
      <footer className="footer">
        <div className="notice-container">
          <div className="copyright">
            <h4>{footerConfig.copyright}</h4>
          </div>
        </div>
      </footer>
    );
  }
}
