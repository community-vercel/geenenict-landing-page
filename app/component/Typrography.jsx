import React from "react";
import clsx from "clsx";
// import "../assets/scss/common/typography.scss"; // Import the CSS or SCSS file
// import '../assets/scss/common/typography.scss';
export const H1 = ({ children, className, ellipsis, textTransform, ...props }) => (
  <h1
    className={clsx("h1", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className, ellipsis, textTransform, ...props }) => (
  <h2
    className={clsx("h2", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </h2>
);

export const H3 = ({ children, className, ellipsis, textTransform, ...props }) => (
  <h3
    className={clsx("h3", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </h3>
);

export const H4 = ({ children, className, ellipsis, textTransform, ...props }) => (
  <h4
    className={clsx("h4", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </h4>
);

export const H5 = ({ children, className, ellipsis, textTransform, ...props }) => (
  <h5
    className={clsx("h5", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </h5>
);

export const H6 = ({ children, className, ellipsis, textTransform, ...props }) => (
  <h6
    className={clsx("h6", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </h6>
);

export const Paragraph = ({ children, className, ellipsis, textTransform, ...props }) => (
  <p
    className={clsx("paragraph", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </p>
);

export const Small = ({ children, className, ellipsis, textTransform, ...props }) => (
  <small
    className={clsx("small", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </small>
);

export const Span = ({ children, className, ellipsis, textTransform, ...props }) => (
  <span
    className={clsx("span", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </span>
);

export const Tiny = ({ children, className, ellipsis, textTransform, ...props }) => (
  <small
    className={clsx("tiny", className, {
      ellipsis: ellipsis,
      [`text-transform-${textTransform}`]: textTransform,
    })}
    {...props}
  >
    {children}
  </small>
);