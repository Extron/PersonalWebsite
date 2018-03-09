import React from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import config from "../../data/SiteConfig";
import "./index.scss";
import "./global.scss";
import './gatstrap.scss'
import Footer from "../components/Adorners/Footer";
import Header from "../components/Adorners/Header";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Header headerConfig={config.header} location={this.props.location} />
        {children()}
        <Footer footerConfig={config.footer} />
      </div>
    );
  }
}
