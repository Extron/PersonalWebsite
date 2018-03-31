import React from "react";
import Helmet from "react-helmet";
import styled, { ThemeProvider } from "styled-components";

import config from "../../data/SiteConfig";
import theme from "../../data/SiteTheme";

import "./global.scss";
import './gatstrap.scss'

import Footer from "../components/Adorners/Footer";
import Header from "../components/Adorners/Header";

const Root = styled.div`
    background-color: white;
`;

export default class MainLayout extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <Root>
                <Helmet>
                    <meta name="description" content={config.siteDescription} />
                </Helmet>
                <ThemeProvider theme={theme}>
                    <div>
                        <Header location={this.props.location} />
                        {children()}
                        <Footer />
                    </div>
                </ThemeProvider>
            </Root>
        );
    }
}
