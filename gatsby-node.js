const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");
const config = require("./data/SiteConfig");

const postNodes = [];




exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
    const { createNodeField } = boundActionCreators;

    if (node.internal.type === "MarkdownRemark") {
        createNodeField({ node, name: "slug", value: createSlug(node, getNode) });
        createNodeField({ node, name: "dir", value: createDir(node, getNode) });
        createNodeField({ node, name: "template", value: createTemplate(node, getNode)});

        postNodes.push(node);
    }
};

/**
 * Creates a slug for a Markdown node.
 * @param {*} node The Markdown node to create the slug for.
 */
function createSlug(node, getNode) {
    
    // First, check the Markdown's frontmatter for a user-defined slug.
    if (node.hasOwnProperty("frontmatter") && node.frontmatter.hasOwnProperty("slug")) {
        return `/${_.kebabCase(node.frontmatter.slug)}`;
    }

    // Otherwise, check the Markdown's frontmatter for a title, and if one is found, use that as the slug.
    if (node.hasOwnProperty("frontmatter") && node.frontmatter.hasOwnProperty("title")) {
        return `/${_.kebabCase(node.frontmatter.title)}`;
    }

    // If there is no title to form the slug from, use the file path of the Markdown file.
    const filePath = path.parse(getNode(node.parent).relativePath);

    if (filePath.dir !== "") {
        // If the file name is not "index", combine the directory and file name. Otherwise, just use the directory name.
        if (filePath.name !== "index") {
            return `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
        }
        else {
            `/${parsedFilePath.dir}/`;
        }
    } else {
        // If there is no directory, simply return the file's name.
        return `/${parsedFilePath.name}/`;
    }

    return "";
}

/**
 * Creates a dir for a Markdown node which is the directory under which the Markdown node will exist on the website.
 * @param {*} node The Markdown node to create the dir for.
 */
function createDir(node, getNode) {
    // First, check the Markdown's frontmatter for a user-defined dir.
    if (node.hasOwnProperty("frontmatter") && node.frontmatter.hasOwnProperty("dir")) {
        return `${_.kebabCase(node.frontmatter.dir)}`;
    }

    // Otherwise, use the top directory that the Markdown file is in.
    const filePath = path.parse(getNode(node.parent).relativePath);
    const dirs = filePath.dir.split("/");

    return dirs[0];
}

/**
 * Creates a template for a Markdown node which is the React template to render the Markdown with.
 * @param {*} node The Markdown node to create the template for.
 */
function createTemplate(node, getNode) {
    // First, check the Markdown's frontmatter for a user-defined template.
    if (node.hasOwnProperty("frontmatter") && node.frontmatter.hasOwnProperty("template")) {
        return `${node.frontmatter.template}`;
    }

    // Otherwise, see if there exists a default template in the site's config file for the node's directory.
    const dir = createDir(node, getNode);

    if (config.hasOwnProperty(dir) && config[dir].hasOwnProperty("template")) {
        return config[dir].template;
    }

    return "";
}



exports.setFieldsOnGraphQLNodeType = ({ type, boundActionCreators }) => {
    const { name } = type;
    const { createNodeField } = boundActionCreators;
    if (name === "MarkdownRemark") {
        addSiblingNodes(createNodeField);
    }
};

function addSiblingNodes(createNodeField) {
    postNodes.sort(
        ({ frontmatter: { date: date1 } }, { frontmatter: { date: date2 } }) =>
            new Date(date1) - new Date(date2)
    );
    for (let i = 0; i < postNodes.length; i += 1) {
        const nextID = i + 1 < postNodes.length ? i + 1 : 0;
        const prevID = i - 1 > 0 ? i - 1 : postNodes.length - 1;
        const currNode = postNodes[i];
        const nextNode = postNodes[nextID];
        const prevNode = postNodes[prevID];
        createNodeField({
            node: currNode,
            name: "nextTitle",
            value: nextNode.frontmatter.title
        });
        createNodeField({
            node: currNode,
            name: "nextSlug",
            value: nextNode.fields.slug
        });
        createNodeField({
            node: currNode,
            name: "prevTitle",
            value: prevNode.frontmatter.title
        });
        createNodeField({
            node: currNode,
            name: "prevSlug",
            value: prevNode.fields.slug
        });
    }
}


exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;

    return new Promise((resolve, reject) => {
        resolve(
            graphql(`{
                allMarkdownRemark {
                    edges {
                        node {
                            frontmatter {
                                tags
                                category
                                topic
                            }
                            fields {
                                slug
                                dir
                                template
                            }
                        }
                    }
                }
            }`).then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                const edges = result.data.allMarkdownRemark.edges;

                createPages(edges, "projects", createPage);
                createPages(edges, "blog", createPage);
                createTags(edges, "projects", createPage);
                createTags(edges, "blog", createPage);
                createTopics(edges, "blog", createPage);
                createPagination(edges, "blog", config.blog.maxPostsPerPage, true, createPage);
                
            })
        );
    });
};

/**
 * Creates pages for each Markdown node.
 * @param {*} edges The Markdown edges.
 * @param {*} dir The directory to create pages for.
 * @param {*} createPage The createPage action.
 */
function createPages(edges, dir, createPage) {
    edges.forEach(edge => {
        createPage({
            path: `/${edge.node.fields.dir}${edge.node.fields.slug}`,
            component: path.resolve(`src/templates/${edge.node.fields.dir}/${edge.node.fields.template}`),
            context: {
                slug: edge.node.fields.slug
            }
        });
    });
}

/**
 * Creates a set of pages where each page has a subset of Markdown elements.
 * @param {*} edges The Markdown edges.
 * @param {*} dir The directory to create pages for.
 * @param {*} limit The number of elements to display per page.
 * @param {*} numberlessPage A boolean that indicates a numberless page should be created that mirrors the first page.
 * @param {*} createPage The createPage action.
 */
function createPagination(edges, dir, limit, numberlessPage, createPage) {
    const dirEdges = edges.filter(edge => edge.node.fields.dir === dir);
    const total = Math.ceil(dirEdges.length / limit);

    if (numberlessPage) {
        createPage({
            path: `${dir}`,
            component: path.resolve(`src/templates/${dir}/pageTemplate.jsx`),
            context: {
                page: 1,
                totalPages: total,
                limit: limit,
                skip: 0
            }
        });
    }

    for (let i = 0; i * limit < dirEdges.length; i++) {
        createPage({
            path: `${dir}/${i + 1}/`,
            component: path.resolve(`src/templates/${dir}/pageTemplate.jsx`),
            context: {
                page: i + 1,
                totalPages: total,
                limit: limit,
                skip: i * limit
            }
        });
    }
}

/**
 * Creates pages for each topic in the specified dir, which will display a list of pages filed under that topic.
 * @param {*} edges The Markdown edges.
 * @param {*} dir The directory to create topic pages for.
 * @param {*} createPage The createPage action.
 */
function createTopics(edges, dir, createPage) {
    const topics = Array.from(new Set(
        edges
            .filter(edge => edge.node.fields.dir === dir && edge.node.frontmatter.topic !== undefined)
            .map(edge => edge.node.frontmatter.topic)
    ));

    topics.forEach(topic => {
        createPage({
            path: `${dir}/topics/${_.kebabCase(topic)}/`,
            component: path.resolve(`src/templates/${dir}/topicTemplate.jsx`),
            context: {
                topic
            }
        });
    });
}

/**
 * Creates pages for each tag in the specified dir, which will display a list of pages with that tag.
 * @param {*} edges The Markdown edges.
 * @param {*} dir The directory to create tag pages for.
 * @param {*} createPage The createPage action.
 */
function createTags(edges, dir, createPage) {
    const tags = Array.from(new Set(
        edges
            .filter(edge => edge.node.fields.dir === dir && edge.node.frontmatter.tags !== undefined)
            .map(edge => edge.node.frontmatter.tags)
            .reduce((acc, val) => acc.concat(val), [])
    ));

    tags.forEach(tag => {
        createPage({
            path: `/${dir}/tags/${_.kebabCase(tag)}/`,
            component: path.resolve(`src/templates/${dir}/tagTemplate.jsx`),
            context: {
                tag
            }
        });
    });
}


exports.modifyWebpackConfig = ({ config, stage }) => {
    if (stage === "build-javascript") {
        config.plugin("Lodash", webpackLodashPlugin, null);
    }
};
