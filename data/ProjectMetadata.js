const theme = require("./SiteTheme.js");

module.exports = {
    categories: [
        "Software Development",
        "Costumes",
        "Music/Composition"
    ],

    statuses: [
        {
            name: "active",
            get color() { return theme.colors.palette.green; }
        },
        {
            name: "completed",
            get color() { return theme.colors.palette.blue; }
        },
        {
            name: "backburner",
            get color() { return theme.colors.palette.orange; }
        },
        {
            name: "archived",
            get color() { return theme.colors.palette.gray700; }
        }
    ]
}