import React from "react";
import Helmet from "react-helmet";
import SEO from "../components/SEO/SEO";

import config from "../../data/SiteConfig";

class Index extends React.Component {
    render() {
        const postEdges = this.props.data.allMarkdownRemark.edges;
        return (
            <div className="index-container">
                <Helmet>
                    <title>{config.siteTitle}</title>
                    <link rel="canonical" href={`${config.siteUrl}`} />
                </Helmet>
                <SEO postEdges={postEdges} />
                <div className="jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                A picture of me here
                            </div>
                            <div className="col">
                                <h1>Hello there!</h1>
                                <p>My name is Trystan Binkley-Jones, and this is my personal website.  I am a software engineer from Colorado.  I also like doing mathematics and physics, and have interests in music and video games.</p>
                                <p>Here you can find information and links to <a>projects</a> I have worked on, <a>papers</a> on a variety of subjects that I have written, <a>blog posts</a> that I have made, and <a>tutorials</a> that I have produced.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`;
