module.exports = {
  blogPostDir: "projects", // The name of directory that contains your posts.
  siteTitle: "16 ms", // Site title.
  siteTitleAlt: "Sixteen Milliseconds", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://sixteenms.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  siteGATrackingID: "UA-47311644-4", // Tracking code ID for google analytics.
  disqusShortname: "https-sixteenms-com", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "Trystan Binkley-Jones", // Username to display in the author segment.
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Colorado, United States of America", // User location to display in the author segment.
  userAvatar: "", // User avatar to display in the author segment.
  userDescription: "",// User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
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
      label: "Email",
      url: "mailto:tcbinkleyj@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2017. Trystan Binkley-Jones", // Copyright string for the footer of the website and RSS feed.

  // Stores settings for the site's global header.
  header: {
    title: "16 ms",
    pages: [
      {
        label: "Home",
        path: "/"
      },
      {
        label: "Portfolio",
        path: "/portfolio/"
      },
      {
        label: "Blog",
        path: "/blog/"
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

  footer: {
    copyright: "Copyright © 2017 Trystan Binkley-Jones"
  }
};
