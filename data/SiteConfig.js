module.exports = {
    siteTitle: "16 ms", // Site title.
    siteTitleAlt: "Sixteen Milliseconds", // Alternative site title for SEO.
    siteLogo: "/logos/logo-512.png", // Logo used for SEO and manifest.
    siteUrl: "https://sixteenms.com", // Domain of your website without pathPrefix.
    pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
    siteDescription: "", // Website description used for RSS feeds/meta description tag.
    siteRss: "/rss.xml", // Path to the RSS file.
    siteFBAppID: "1825356251115265", // FB Application ID for using app insights
    siteGATrackingID: "UA-47311644-4", // Tracking code ID for google analytics.
    postDefaultCategoryID: "Tech", // Default category for posts.
    // Links to social profiles/projects you want to display in the author segment/navigation bar.
    copyright: "Copyright © 2017. Trystan Binkley-Jones", // Copyright string for the footer of the website and RSS feed.

    // Stores settings for the site's user.
    user: {
        name: "Trystan Binkley-Jones",
        twitter: "",
        location: "Colorado, United States of America",
        avatar: "",
        description: ""
    },

    // Stores settings for the site's global header.
    header: {
        title: "16 ms",
        pages: [
            {
                label: "Home",
                path: "/"
            },
            {
                label: "Projects",
                path: "/portfolio/"
            },
            {
                label: "Blog",
                path: "/blog/"
            },
            {
                label: "About",
                path: "/about/"
            }
        ],
        socialMedia: [
            {
                label: "GitHub",
                url: "https://github.com/Extron",
                iconClassName: "fa fa-github"
            },
            {
                label: "Twitter",
                url: "https://twitter.com/ExtronTBJ",
                iconClassName: "fa fa-twitter"
            },
            {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/extrontbj",
                iconClassName: "fa fa-linkedin"
            },
            {
                label: "Email",
                url: "mailto:tcbinkleyj@gmail.com",
                iconClassName: "fa fa-envelope"
            }
        ]
    },

    // Stores settings for the site's global footer.
    footer: {
        copyright: "Copyright © 2017 Trystan Binkley-Jones"
    },

    // Stores settings for the site's Disqus integration.
    disqus: {
        shortname: "sixteenms"
    }
};
