import React from "react";
import Loader from "./Loader";
import Icon from "./Icon";
import { Link } from "./Link";
import styled, { css, useTheme } from "styled-components";
import { rgba } from "../utils/style";

const ButtonContent = ({
  iconRight,
  icon,
  children,
  secondary,
  iconOnly,
  isLoading,
  loadingText,
  iconHoverShift,
}) => {
  const theme = useTheme();

  return (
    <>
      {icon && (
        <ButtonIcon
          left
          isLoading={isLoading}
          secondary={secondary}
          iconHoverShift={iconHoverShift}
          icon={icon}
          iconOnly={iconOnly}
        />
      )}
      {children && (
        <ButtonText
          isLoading={isLoading}
          secondary={secondary}
          iconOnly={iconOnly}
        >
          {children}
        </ButtonText>
      )}
      {iconRight && (
        <ButtonIcon
          isLoading={isLoading}
          secondary={secondary}
          iconHoverShift={iconHoverShift}
          icon={iconRight}
          iconOnly={iconOnly}
        />
      )}
      {!!isLoading && (
        <ButtonLoader
          size={32}
          text={loadingText}
          color={theme.colorBackground}
        />
      )}
    </>
  );
};

export const Button = (props) => {
  const { className, style, loading, ...otherProps } = props;

  return (
    <ButtonContainer className={className} style={style} {...otherProps}>
      <ButtonContent isLoading={loading ? 1 : 0} {...otherProps} />
    </ButtonContainer>
  );
};

export const LinkButton = (props) => {
  const { className, style, href, rel, target, ...rest } = props;

  return (
    <ButtonContainer
      as="a"
      className={className}
      style={style}
      href={href}
      rel={rel || target === "_blank" ? "noopener noreferrer" : null}
      target={target}
      {...rest}
    >
      <ButtonContent {...props} />
    </ButtonContainer>
  );
};

export const RouterButton = (props) => {
  const { className, style, to, secondary, ...rest } = props;

  return (
    <ButtonContainer
      as={ButtonLink}
      className={className}
      style={style}
      to={to}
      secondary={secondary ? 1 : 0}
    >
      <ButtonContent secondary={secondary} {...rest} />
    </ButtonContainer>
  );
};

const ButtonLink = ({ secondary, ...rest }) => <Link {...rest} />;

const ButtonLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ButtonContainer = styled.button`
  background: none;
  height: 46px;
  padding: ${(props) => (props.iconOnly ? 0 : " 0 24px")};
  border: 0;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ${(props) => props.theme.curveFastoutSlowin};
  display: flex;
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.theme.backgroundColor};
  text-decoration: none;
  font-family: inherit;
  position: relative;
  z-index: 1;

  &::-moz-focus-inner {
    border: 0;
  }

  ${(props) =>
    !props.secondary &&
    css`
      &::before {
        content: "";
        transition: all 0.4s ${props.theme.curveFastoutSlowin};
        background: ${rgba(props.theme.colorWhite, 0.4)};
        clip-path: ${props.theme.clipPath(10)};
        position: absolute;
        top: -5px;
        right: -5px;
        bottom: -5px;
        left: -5px;
        z-index: -1;
        opacity: 0;
      }

      &::after {
        content: "";
        transition: all 0.4s ${props.theme.curveFastoutSlowin};
        background: ${props.theme.backgroundColor};
        clip-path: ${props.theme.clipPath(8)};
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
      }
    `}

  ${(props) =>
    props.iconOnly &&
    css`
      width: 46px;
      align-items: center;
      justify-content: center;

      &::after {
        background: ${rgba(props.theme.headingColor, 0)};
      }

      &:hover::after,
      &:focus::after {
        background: ${rgba(props.theme.headingColor, 0.05)};
      }

      &::before {
        background: ${rgba(props.theme.headingColor, 0.1)};
        top: -4px;
        right: -4px;
        bottom: -4px;
        left: -4px;
        clip-path: circle(50% at 50% 50%);
      }
    `}

  ${(props) =>
    !props.disabled &&
    !props.secondary &&
    css`
      &:hover,
      &:focus {
        outline: none;
        transform: ${props.iconOnly ? "none" : "scale(1.05)"};
      }

      &:focus:before {
        opacity: 1;
      }
    `}

  &:active {
    transform: scale(1);
    transition-duration: 0.1s;
  }

  ${(props) =>
    props.secondary &&
    css`
      background: none;
      position: relative;
      transition: transform 0.8s ease;

      &:before {
        content: "";
        position: absolute;
        width: 46px;
        height: 46px;
        background: ${(props) => props.theme.accentColor};
        border-radius: 40px;
        left: 0px;
        z-index: -1;
        transition: width 250ms ${(props) => props.theme.curveFastoutSlowin};
      }

      &:hover {
        &:before {
          width: 100%;
        }
        svg {
          transform: translateX(5px);
        }
      }
    `}

  ${(props) =>
    props.icon &&
    !props.secondary &&
    !props.iconOnly &&
    css`
      padding-right: 32px;
    `}
`;

const ButtonText = styled.span`
  font-size: ${(props) => props.theme.fontSize};
  font-weight: 400;
  position: relative;
  line-height: 1;
  flex: 1 1 auto;
  text-transform: uppercase;
  letter-spacing: ${(props) => props.theme.letterSpacing};
  opacity: .85;

  ${(props) =>
    props.isLoading &&
    css`
      visibility: hidden;
    `}

  ${(props) =>
    props.secondary
      ? `color: ${props.theme.headingColor};`
      : `color: ${props.theme.backgroundColor};
  `}

  ${(props) =>
    props.iconOnly &&
    `
    color: ${props.theme.textColor};
  `}
`;

const ButtonIcon = styled(Icon)`
  margin-left: ${(props) => (props.left ? "-10px" : "32px")};
  margin-right: ${(props) => (props.left ? "32px" : "0")};
  transition: all 0.3s ${(props) => props.theme.curveFastoutSlowin};
  fill: ${(props) => props.theme.backgroundColor};

  ${(props) =>
    props.secondary &&
    css`
      fill: ${props.theme.headingColor};
    `}

  ${(props) =>
    props.iconOnly &&
    css`
      fill: ${props.theme.textColor};
      margin: 0;
    `}

  ${/* sc-selector */ ButtonContainer}:hover &,
  ${/* sc-selector */ ButtonContainer}:focus & {
    ${(props) =>
      props.iconHoverShift &&
      css`
        transform: translate3d(4px, 0, 0);
      `}
  }

  ${(props) =>
    props.isLoading &&
    css`
      opacity: 0;
    `}
`;

export default Button;
