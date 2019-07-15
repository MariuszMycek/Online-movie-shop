import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

function ActiveLink({ children, router, href, className }) {
  const styleClass =
    router.pathname === href ? `${className} ${className}--active` : className;

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <a href={href} onClick={handleClick} className={styleClass}>
      {children}
    </a>
  );
}

ActiveLink.propTypes = {
  children: PropTypes.node,
  router: PropTypes.object,
  href: PropTypes.string,
  className: PropTypes.string,
};

export default withRouter(ActiveLink);
