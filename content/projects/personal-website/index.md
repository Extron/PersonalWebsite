---
title: "My Personal Website"
date: "03/07/2018"
category: "Software Development"
previewCopy: "I developed this website in GatsbyJS, using Bootstrap, Markdown, Styled-Components, and other various plugins and tools."
previewImage: "./16ms-cover.png"
tags:
    - programming
    - web development
    - React.js
    - Gatsby.js
    - Bootstrap
dir: "projects"
template: "projectTemplate.jsx"
status: "active"
---
Source: [Extron/PersonalWebsite](https://github.com/Extron/PersonalWebsite)

Why is my personal website called _16ms_? Well, at 60 frames per second, that is the amount of time a video game has to update all physics, graphics, AI, particles, input, and gameplay. A desire to develop video games led me to computer science, and to this day I have a deep passion for video game development.

I had a series of goals for my personal website when I set out (for the third time) to develop it. Firstly, I wanted a site for my public-facing Internet persona, something I could direct people to if they needed to know about me, especially in a professional manner. Secondly, I wanted a hub for all of the projects I have and am currently working on, a portfolio of sorts, though perhaps a little more robust than that. Thirdly, I wanted a blog, somewhere that I could write thoughts down that wasn't restricted to a social media platform. Finally, I wanted to vastly improve my web development skills, especially with modern web tools. Each of these goals had their own specific requirements that shaped much of the decisions I made for this side.

#### An Internet Persona
Like almost everyone, I have a relatively wide presence on the Internet, with a variety of accounts on social platforms. Prior to this website, I didn't have a way to consolidate this presence into a single nexus. I wanted my site to point people to a professional subset of this presence, so that I could direct interested parties to this site, and they could themselves choose to visit my Github, LinkedIn, or Twitter. I also wanted to have a basic amount of personal information available, to give a human context behind this presence.

#### A Project Hub
I work on some cool stuff. I wanted a place to share some of that stuff with others. In addition, I wanted to maintain a project hub for my own sanity. I often forget or lose track of various projects that I have worked on in the past, and having a central location that functions as a living document of projects is very appealing to me. I also wanted a space to use to provide explanations, context, and examples for my projects, so that others could easily understand them and perhaps learn from them.

#### A Blog
I like writing about a variety of topics, from mathematics and physics to politics to movies and music. I wanted a functional blog, with comment support, to facilitate this, but I didn't want the blog to be bloated, rely on a heavy database, or result in a lot of administration on my part. Boiling the blog as down to writing as much as possible was key. In addition, whatever platform I chose had to support a wide variety of content, from mathematical notation to embedded images and videos.

#### Practice
Prior to developing this website, my skills in web development were relatively limited. I hadn't had much experience with it other than some HTML and Javascript I did for college. As a developer, it is important to continue improving and learning, especially for the sake of finding a good job. I wanted a project that was complex enough to hold my interest without being too challenging for a hobby project, all while teaching me useful knowledge about modern web development.

## Choosing a Platform
I have to be honest, I hate almost everything about web development. Designing sites in HTML feels incredibly clunky, CSS feels incredibly "slippery" to me, and I want to drown Javascript in a bathtub. My first priority when looking at platforms is figuring out how to eliminate the things I hate from the project. Naturally I started by looking at [Angular](https://angular.io/), [ReactJS](https://reactjs.org/), [VueJS](https://vuejs.org/), and [Ruby on Rails](http://rubyonrails.org/). Angular had the benefit of TypeScript (as a primarily C# developer, TypeScript is my ideal version of JS), but there still existed a separation of HTML and TS that I found unappealing. VueJS has a lot of nice concepts, but is mostly still in HTML and JS land, which I didn't want. ReactJS appealled to me most, because it is modular, component-based, and allows me to combine HTML and Javascript into a single file. Ruby on Rails, while incredible, felt a little too niche for a project meant to bring me up to speed with modern web tech.

I quickly realized that I didn't really have a need for any of the above platforms. My personal website wasn't meant to be complex or data-driven. I also wanted to eliminate as much as possible any complicated build pipelines and server setup. To that end, I turned to static site generators to solve this problem. I looked at [Jekyll](https://jekyllrb.com/), and almost decided to work in it, but it wasn't made to run on Windows, which is my primary development platform, and I couldn't get the latest release to run well. After some hunting, I discovered [GatsbyJS](https://www.gatsbyjs.org/). A static site generator built on React that incorporates things like Markdown, built with Node.js so that deployment on a Windows box became almost trivial. So far, I don't have any major qualms with GatsbyJS, though I do find its use of GraphQL a little weird and uncomfortable.

## GatsbyJS: The Basics
[Installing GatsbyJS](https://www.gatsbyjs.org/docs/) was pretty simple with Node. The developers suggest that you begin a project by basing it off of one of their [premade templates](https://www.gatsbyjs.org/docs/gatsby-starters/). I opted to try the [React Material Design template](https://github.com/Vagr9K/gatsby-material-starter), since as a mobile developer [Material Design](https://material.io/) is my favorite UI language. However, I decided to switch to [Bootstrap](https://getbootstrap.com/). GatsbyJS has a [starter](https://github.com/jaxx2104/gatsby-starter-bootstrap) for that too, but the Material Design one has a lot of additional plugins set up that I wanted to use, such as SEO, Disqus for blog comments, SCSS styling, and a variety of pre-built components that I wanted to expand. So I opted to strip out the React-MD and replace it with Bootstrap, which provided a great way of learning GatsbyJS and ReactJS without diving too deep.