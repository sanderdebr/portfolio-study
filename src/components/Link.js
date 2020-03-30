import React, { Fragment, useRef, forwardRef } from "react";
import { Link as RouterLink, NavLink as RouterNavLink } from "react-router-dom";

export const Link = forwardRef(({ to, as: Component, ...props }, ref) => {
  const linkRef = useRef(ref ? ref.current : null);

  return (
    <Fragment>
      <Component ref={linkRef} to={to} {...props} />
    </Fragment>
  );
});

Link.defaultProps = {
  as: RouterLink
};

export const NavLink = forwardRef((props, ref) => (
  <Link as={RouterNavLink} ref={ref} {...props} />
));

export default Link;
