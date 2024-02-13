import React from 'react';
import { Helmet } from 'react-helmet';

function Head({ title, description, siteContent }) {
  return (
    <Helmet>
    <title>{title}</title>

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="https://images.unsplash.com/photo-1421622548261-c45bfe178854?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    <meta property="og:url" content="https://integral-hold-411309.oa.r.appspot.com" /> 
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={siteContent} />
    </Helmet>
  );
}

export default Head;