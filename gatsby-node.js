const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

const postNodes = [];

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

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
    const { createNodeField } = boundActionCreators;
    let slug;
    if (node.internal.type === "MarkdownRemark") {
        const fileNode = getNode(node.parent);
        const parsedFilePath = path.parse(fileNode.relativePath);
        if (
            Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
            Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
        ) {
            slug = `/${_.kebabCase(node.frontmatter.title)}`;
        } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
            slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
        } else if (parsedFilePath.dir === "") {
            slug = `/${parsedFilePath.name}/`;
        } else {
            slug = `/${parsedFilePath.dir}/`;
        }
        if (
            Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
            Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
        ) {
            slug = `/${_.kebabCase(node.frontmatter.slug)}`;
        }
        createNodeField({ node, name: "slug", value: slug });
        postNodes.push(node);
    }
};

exports.setFieldsOnGraphQLNodeType = ({ type, boundActionCreators }) => {
    const { name } = type;
    const { createNodeField } = boundActionCreators;
    if (name === "MarkdownRemark") {
        addSiblingNodes(createNodeField);
    }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;

    return new Promise((resolve, reject) => {
        resolve(
            graphql(`{
                allMarkdownRemark {
                    edges {
                        node {
                            frontmatter {
                                dir
                                tags
                                category
                                topic
                                template
                            }
                            fields {
                                slug
                            }
                        }
                    }
                }
            }`).then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                const topics = new Set();
                const tags = {};

                result.data.allMarkdownRemark.edges.forEach(edge => {

                    if (tags[edge.node.frontmatter.dir] == undefined) {
                        tags[edge.node.frontmatter.dir] = new Set();
                    }

                    if (edge.node.frontmatter.tags) {
                        edge.node.frontmatter.tags.forEach(tag => tags[edge.node.frontmatter.dir].add(tag));
                    }

                    if (edge.node.frontmatter.topic) {
                        topics.add(edge.node.frontmatter.topic);
                    }

                    createPage({
                        path: `/${edge.node.frontmatter.dir}${edge.node.fields.slug}`,
                        component: path.resolve(`src/templates/${edge.node.frontmatter.dir}/${edge.node.frontmatter.template}`),
                        context: {
                            slug: edge.node.fields.slug
                        }
                    });
                });

                for (var dir in tags) {
                    Array.from(tags[dir]).forEach(tag => {
                        createPage({
                            path: `/${dir}/tags/${_.kebabCase(tag)}/`,
                            component: path.resolve(`src/templates/${dir}/tagTemplate.jsx`),
                            context: {
                                tag
                            }
                        });
                    });
                }

                Array.from(topics).forEach(topic => {
                    createPage({
                        path: `/topics/${_.kebabCase(topic)}/`,
                        component: path.resolve(`src/templates/blog/topicTemplate.jsx`),
                        context: {
                            topic
                        }
                    });
                });
            })
        );
    });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
    if (stage === "build-javascript") {
        config.plugin("Lodash", webpackLodashPlugin, null);
    }
};
