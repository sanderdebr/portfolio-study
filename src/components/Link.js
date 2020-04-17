import React, {
  Fragment,
  useRef,
  forwardRef,
  useEffect,
  useState,
} from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useLocation,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const Link = forwardRef(
  ({ to, prefetch, as: Component, ...props }, ref) => {
    const linkRef = useRef(ref ? ref.current : null);
    const animationFrameRef = useRef();
    const location = useLocation();
    const toPathname = to.pathname || to;
    const prefetchable = prefetch || location.pathname !== toPathname;
    const [shouldPrefetch, setShouldPrefetch] = useState(false);
    const fullUrl = `${window.location.origin}${toPathname}`;

    useEffect(() => {
      const linkElement = linkRef.current;

      const linkObserver = new IntersectionObserver(([entry], observer) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          animationFrameRef.current = requestAnimationFrame(() => {
            setShouldPrefetch(true);
          });
        }
      });

      if (prefetchable) {
        linkObserver.observe(linkElement);
      }

      return () => {
        cancelAnimationFrame(animationFrameRef.current);
        linkObserver.disconnect();
      };
    }, [prefetchable, to]);

    return (
      <Fragment>
        <Helmet>
          {shouldPrefetch && (
            <link rel="prefetch" href={fullUrl} as="document" />
          )}
        </Helmet>
        <Component ref={linkRef} to={to} {...props} />
      </Fragment>
    );
  }
);

Link.defaultProps = {
  as: RouterLink,
};

export const NavLink = forwardRef((props, ref) => {
  return <Link as={RouterNavLink} ref={ref} {...props} />;
});

export default Link;
