import React from 'react'
import { Helmet } from 'react-helmet'


const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
      <title>EliteOutfits | {title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
    </Helmet>
  )
}


Meta.defaultProps = {
  title: 'EliteOutfits',
  keywords: 'men clothing, women clothing, kids clothing',
  description: 'best outfits, best prices'
}


export default Meta
