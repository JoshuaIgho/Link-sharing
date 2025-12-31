import React from 'react';
import { Helmet } from 'react-helmet-async';

const Head = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title || 'LinkShare - One Link for Everything'}</title>
      <meta 
        name="description" 
        content={description || 'Share all your important links with a single customizable page'} 
      />
    </Helmet>
  );
};

export default Head;