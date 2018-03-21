import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";

export default class About extends React.Component {
    render() {
        return (
            <div className="about-container">
                <Helmet>
                    <title>{`About | ${config.siteTitle}`}</title>
                    <link rel="canonical" href={`${config.siteUrl}/about/`} />
                </Helmet>
            </div>
        );
    }
}
