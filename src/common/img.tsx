import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import GImg from 'gatsby-image'

interface Props {
  className?: string
  imgStyle?: Record<string, string>
  alt: string
  filename: string
}
export function Img({ className, imgStyle, alt, filename }: Props) {
  const { edges } = useStaticQuery(graphql`
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
  `).images
  const image = edges.find((edge: any) => edge.node.filename === filename).node
  return <GImg fluid={image.childImageSharp.fluid} className={className} alt={alt} imgStyle={imgStyle} />
}
