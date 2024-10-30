import React, { AnchorHTMLAttributes } from 'react';

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, ...rest }) => {
  const isInternalLink = href.startsWith('/');
  const isAnchorLink = href.startsWith('#');

  if (isInternalLink) {
    return <a className="break-words" href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />;
  }

  return (
    <a
      className="break-words"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    />
  );
};

export default CustomLink;
