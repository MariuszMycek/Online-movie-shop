import { withRouter } from 'next/router';

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

export default withRouter(ActiveLink);
