import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Sass from 'gatsby-plugin-sass'

import '../css/core.scss'; // add some style if you want!

export default function Index({data}) {
  const {edges: posts} = data.allMarkdownRemark;
  return (
    <div className="blog-posts">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({node: post}) => {
          return (
            <Link
              to={post.frontmatter.path}
              style={{
                textDecoration: 'none',
                fontFamily: 'Raleway',
              }}  
            >
            <div className="blog-post-preview" key={post.id}>
              <h1
                style={{
                  display: 'block',
                  
                  fontWeight: '600',
                  lineHeight: '100%',
                  fontSize: '130%',
                  color: '#464646'
                }}
              >
                  {post.frontmatter.title}
              </h1>
              <h2
                style={{
                  fontSize: '70%',
                  color: '#505050',
                  marginTop: '-10px'
                }}
              >
                {post.frontmatter.date}
              </h2>
              <p
                style={{
                  fontSize: '90%',
                  color: '#505050',
                  marginTop: '-5px',
                  fontWeight: 400
                }}
              >
                {post.excerpt}
              </p>
            </div>
            </Link>
          );
       })}
    </div>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
         }
       }
     }
   }
 }
`;
