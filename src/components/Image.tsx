import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const basePath = process.env.REACT_APP_BASE_PATH || '';

const Image: React.FC<ImageProps> = ({ src, alt, ...rest }) => {
  return <img src={`${basePath}${src}`} alt={alt} {...rest} />;
};

export default Image;
