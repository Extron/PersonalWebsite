export function normalizeProjectQuery(edges) {
    const projects = [];

    edges.forEach(edge => {
        projects.push({
            path: `/${edge.node.fields.dir}${edge.node.fields.slug}`,
            title: edge.node.frontmatter.title,
            category: edge.node.frontmatter.category,
            status: edge.node.frontmatter.status,
            tags: edge.node.frontmatter.tags,
            previewCopy: edge.node.frontmatter.previewCopy,
            previewImage: edge.node.frontmatter.previewImage ? edge.node.frontmatter.previewImage.childImageSharp.original.src : ""
        });
    });

    return projects;
}

export function normalizePostQuery(edges) {
    const posts = [];

    edges.forEach(edge => {
        posts.push({
            path: `/${edge.node.fields.dir}${edge.node.fields.slug}`,
            title: edge.node.frontmatter.title,
            date: edge.node.frontmatter.date,
            topic: edge.node.frontmatter.topic,
            excerpt: edge.node.excerpt
        });
    });

    return posts;
}