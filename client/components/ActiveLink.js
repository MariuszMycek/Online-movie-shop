import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

function ActiveLink({ children, router, href, className }) {
  // Setting style classes for active and not active links based on pathname
  const styleClass =
    router.pathname === href ? `${className} ${className}--active` : className;

  const handleClick = e => {
    // Preventing page reload
    e.preventDefault();
    // Redirecting to proper page
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
