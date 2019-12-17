import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import GImg from 'gatsby-image'

import { config } from '@/config'

export const Avatar = () => {
  const img = useStaticQuery(graphql`
    query ImgQuery {
      images: allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
        edges {
          node {
            filename: relativePath
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `).images.edges.find((edge: any) => edge.node.filename === config.site.avatar)
  return img ? <GImg fluid={img.node.childImageSharp.fluid} alt='Avatar' itemProp='image' /> : null
}
