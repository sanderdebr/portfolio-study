import React from "react";
import Loader from "./Loader";
import Icon from "./Icon";
import styled, { css, useTheme } from "styled-components";
import rgba from "../helpers/rgba";

const ButtonContent = ({
  iconRight,
  icon,
  children,
  secondary,
  iconOnly,
  isLoading,
  loadingText,
  iconHoverShift
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

const Button = props => {
  const { className, style, loading, ...otherProps } = props;

  return (
    <ButtonContainer className={className} style={style} {...otherProps}>
      <ButtonContent isLoading={loading ? 1 : 0} {...otherProps} />
    </ButtonContainer>
  );
};

const ButtonLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ButtonContainer = styled.button`
  background: none;
  height: 56px;
  padding: ${props => (props.iconOnly ? 0 : " 0 26px")};
  border: 0;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};
  display: flex;
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.backgroundColor};
  text-decoration: none;
  font-family: inherit;
  position: relative;
  z-index: 1;

  &::-moz-focus-inner {
    border: 0;
  }

  ${props =>
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

  ${props =>
    props.iconOnly &&
    css`
      width: 56px;
      align-items: center;
      justify-content: center;

      &::after {
        background: ${rgba(props.theme.colorWhite, 0)};
      }

      &:hover::after,
      &:focus::after {
        background: ${rgba(props.theme.colorWhite, 0.1)};
      }

      &::before {
        background: ${rgba(props.theme.colorWhite, 0.4)};
        top: -4px;
        right: -4px;
        bottom: -4px;
        left: -4px;
        clip-path: polygon(
          0% 0%,
          0% 100%,
          4px 100%,
          4px 4px,
          calc(100% - 4px) 4px,
          calc(100% - 4px) calc(100% - 13px),
          calc(100% - 13px) calc(100% - 4px),
          4px calc(100% - 4px),
          4px 100%,
          calc(100% - 11px) 100%,
          100% calc(100% - 11px),
          100% 0%
        );
      }
    `}

  ${props =>
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

  ${props =>
    props.secondary &&
    css`
      background: none;
      color: ${props.theme.accentColor};
      padding-left: 10px;
      padding-right: 10px;
      position: relative;
      left: -10px;

      &::after {
        content: "";
        height: 30px;
        position: absolute;
        top: 50%;
        right: 0;
        bottom: 0;
        left: 0;
        background: ${rgba(props.theme.accentColor, 0.2)};
        transform: scale3d(0, 1, 1) translateY(-50%);
        transform-origin: right;
        transition: transform 0.4s ${props.theme.curveFastoutSlowin};
      }

      &:hover,
      &:focus,
      &:active {
        outline: none;
        transform: none;
        background: transparent;
      }

      &:hover::after,
      &:focus::after,
      &:active::after {
        transform: scale3d(1, 1, 1) translateY(-50%);
        transform-origin: left;
      }

      &::before {
        content: "";
        transition: box-shadow 0.4s ${props.theme.curveFastoutSlowin};
        transform: translateY(-50%);
        height: 30px;
        position: absolute;
        top: 50%;
        right: 0;
        bottom: 0;
        left: 0;
      }

      &:focus::before {
        box-shadow: 0 0 0 4px ${props => rgba(props.theme.accentColor, 0.4)};
      }
    `}

  ${props =>
    props.icon &&
    !props.secondary &&
    !props.iconOnly &&
    css`
      padding-right: 32px;
    `}
`;

const ButtonText = styled.span`
  font-size: 18px;
  font-weight: 500;
  position: relative;
  line-height: 1;
  flex: 1 1 auto;

  ${props =>
    props.isLoading &&
    css`
      visibility: hidden;
    `}

  ${props =>
    props.secondary
      ? `color: ${props.theme.accentColor};`
      : `color: ${props.theme.colorBackground};
  `}

  ${props =>
    props.iconOnly &&
    `
    color: ${props.theme.textColor};
  `}
`;

const ButtonIcon = styled(Icon)`
  margin-left: ${props => (props.left ? "0" : "6px")};
  margin-right: ${props => (props.left ? "6px" : "0")};
  transition: all 0.3s ${props => props.theme.curveFastoutSlowin};
  fill: ${props => props.theme.colorBackground};

  ${props =>
    props.secondary &&
    css`
      fill: ${props.theme.accentColor};
    `}

  ${props =>
    props.iconOnly &&
    css`
      fill: ${props.theme.textColor};
      margin: 0;
    `}

  ${/* sc-selector */ ButtonContainer}:hover &,
  ${/* sc-selector */ ButtonContainer}:focus & {
    ${props =>
      props.iconHoverShift &&
      css`
        transform: translate3d(4px, 0, 0);
      `}
  }

  ${props =>
    props.isLoading &&
    css`
      opacity: 0;
    `}
`;

export default Button;