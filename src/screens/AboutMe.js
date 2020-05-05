import React, { memo } from "react";
import styled, { css, keyframes } from "styled-components/macro";
import { Transition } from "react-transition-group";
import Anchor from "../components/Anchor";
import { Link } from "../components/Link";
import { RouterButton } from "../components/Button";
import ProgressiveImage from "react-progressive-graceful-image";
import ProfileImgLarge from "../assets/img/profile-large.jpg";
import ProfileImgPlaceholder from "../assets/img/profile-placeholder.jpg";
import JSImg from "../assets/img/tech/js.png";
import ReactImg from "../assets/img/tech/react.png";
import ReduxImg from "../assets/img/tech/redux.png";
import NodeImg from "../assets/img/tech/node.png";
import GitImg from "../assets/img/tech/git.png";
import HTMLCSSImg from "../assets/img/tech/HTMLCSS.png";
import AdobeXDImg from "../assets/img/tech/adobexd.png";
import FigmaImg from "../assets/img/tech/figma.png";
import { rgba, AnimTextSlide } from "../utils/style";

const ProfileText = ({ status, titleId }) => (
  <>
    <ProfileTitle status={status} id={titleId}>
      <TextReveal>
        <TextRevealInner status={status}>
          Hi there! I'm Sander, a passionate front-end developer and designer.
        </TextRevealInner>
      </TextReveal>
    </ProfileTitle>
    <ProfileDescription status={status}>
      Currently based in Breda, the Netherlands, working as a designer and
      developer at{" "}
      <Anchor as={Link} to="/projects/dtt">
        Fujifilm
      </Anchor>
      . I'm specialized in JavaScript with over 5 years of professional
      experience in building the web and working with technologies like NodeJS.
    </ProfileDescription>
    <ProfileTech status={status}>
      Favorite technologies:
      <ProfileTechList>
        <ProfileTechImg src={JSImg} alt="JS" />
        <ProfileTechImg src={ReactImg} alt="React" />
        <ProfileTechImg src={ReduxImg} alt="Redux" />
        <ProfileTechImg src={NodeImg} alt="Node" />
        <ProfileTechImg src={GitImg} alt="Git" />
        <ProfileTechImg src={HTMLCSSImg} alt="HTML and CSS" />
        <ProfileTechImg src={AdobeXDImg} alt="Adobe XD" />
        <ProfileTechImg src={FigmaImg} alt="Figma" />
      </ProfileTechList>
    </ProfileTech>
    <ProfileDescription status={status}>
      In my spare time I like to go for a run, have a workout or{" "}
      <Anchor href="https://dev.to/sanderdebr" target="_blank">
        write tech tutorials
      </Anchor>
      . I’m always interested in new projects, so feel free to drop me a line.
    </ProfileDescription>
  </>
);

function AboutMe(props) {
  const { id, visible, sectionRef } = props;
  const titleId = `${id}-title`;

  return (
    <ProfileSection id={id} ref={sectionRef}>
      <Transition in={visible} timeout={0}>
        {(status) => (
          <ProfileContent>
            <ProfileColumn>
              <ProfileText status={status} titleId={titleId} />
              <ProfileButton
                left
                secondary
                status={status}
                icon="rightArrow"
                to="/contact"
              >
                Send me a message
              </ProfileButton>
            </ProfileColumn>
            <ProfileColumn>
              <ProfileImageWrapper status={status}>
                <ProgressiveImage
                  src={ProfileImgLarge}
                  placeholder={ProfileImgPlaceholder}
                >
                  {(src) => (
                    <ProfileImage src={src} alt="Profile of Sander de Bruijn" />
                  )}
                </ProgressiveImage>
              </ProfileImageWrapper>
            </ProfileColumn>
          </ProfileContent>
        )}
      </Transition>
    </ProfileSection>
  );
}

const ProfileSection = styled.section`
  width: 100vw;
  /* min-height: 100vh; */
  margin-top: 60px;
  margin-bottom: 40px;
  padding-top: 60px;
  padding-right: 0px;
  padding-bottom: 40px;
  padding-left: 0px;
  display: flex;
  justify-content: center;

  &:focus {
    outline: none;
  }

  @media (min-width: ${(props) => props.theme.desktop}px) {
    padding-left: 260px;
  }

  @media (max-width: ${(props) => props.theme.tablet}px) {
    padding-top: 50px;
    padding-right: 80px;
    padding-left: 160px;
    height: auto;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  @media (max-width: ${(props) => props.theme.mobile}px) {
    margin-top: 0;
    padding-top: 90px;
    padding-left: 25px;
    padding-right: 25px;
    overflow-x: hidden;
  }

  @media (max-width: ${(props) => props.theme.mobile}px),
    (max-height: ${(props) => props.theme.mobile}px) {
    padding-right: ${(props) => props.theme.spacingOuter.mobile}px;
    padding-left: ${(props) => props.theme.spacingOuter.mobile}px;
  }

  @media ${(props) => props.theme.mobileLS} {
    padding-right: 100px;
    padding-left: 100px;
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 52% 40%;
  grid-column-gap: 8%;
  max-width: ${(props) => props.theme.maxWidthLaptop}px;
  width: 100%;

  @media (min-width: ${(props) => props.theme.desktop}px) {
    max-width: ${(props) => props.theme.maxWidthDesktop}px;
    grid-template-columns: 40% 40%;
    grid-column-gap: 10%;
  }

  @media (max-width: ${(props) => props.theme.tablet}px) {
    max-width: 600px;
  }

  @media (max-width: ${(props) => props.theme.tablet}px) {
    grid-template-columns: 100%;
  }
`;

const ProfileColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
  transform: translate3d(0, 0, 0);
`;

const ProfileTitle = styled.h2`
  margin-top: 0;
  font-size: 38px;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 2.7rem;
  opacity: ${(props) => (props.status === "entered" ? 1 : 0)};
  transition: opacity 0.8s ease 0.6s;
  color: ${(props) => props.theme.headingColor};
  letter-spacing: ${(props) => props.theme.letterSpacing};

  @media (max-width: 1600px) {
    font-size: 36px;
  }

  @media (max-width: ${(props) => props.theme.mobile}px) {
    line-height: 2rem;
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const TextReveal = styled.span`
  overflow: hidden;
  display: inline-block;
`;

const TextRevealInner = styled.span`
  display: inline-block;
  transform: translateY(100px);
  ${(props) =>
    props.status === "entered" &&
    css`
      animation: ${AnimTextSlide} 1.6s forwards ${props.theme.easeOutExpo};
      animation-delay: 600ms;
    `};
`;

const ProfileDescription = styled.p`
  margin: 0;
  margin: 1.5em 0;
  margin-top: 0;
  opacity: 0;
  transition: opacity 1.2s ease 0.6s;
  font-size: ${(props) => props.theme.fontSize};
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};
    ${(props) =>
      props.status === "entered" &&
      css`
        opacity: 0.85;
      `}
    @media (max-width: ${(props) => props.theme.mobile}px) {
    font-size: 18px;
  }
`;

const ProfileTech = styled.div`
  margin: 0;
  opacity: 0;
  transition: opacity 1.2s ease 0.6s;
  font-size: ${(props) => props.theme.fontSize};
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};
  margin: .6em 0 2em 0;

  ${(props) =>
    props.status === "entered" &&
    css`
      opacity: 0.85;
    `}

  @media (max-width: ${(props) => props.theme.mobile}px) {
    font-size: 18px;
  }
`;

const ProfileTechList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProfileTechImg = styled.img`
  width: auto;
  height: auto;
  margin-right: 15px;
  margin-top: 15px;
  max-height: 40px;
  transition: all ease 250ms;
  filter: grayscale();
  opacity: 0.5;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    filter: none;
    opacity: 1;
  }
`;

const ProfileButton = styled(RouterButton)`
  margin-top: 2em;
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;
  ${(props) =>
    props.status === "entered" &&
    css`
      opacity: 1;
    `}
`;

const AnimImageReveal = keyframes`
  0% {
    transform: scale3d(0, 1, 1);
    transform-origin: left;
  }
  49% {
    transform: scale3d(1, 1, 1);
    transform-origin: left;
  }
  50% {
    transform: scale3d(1, 1, 1);
    transform-origin: right;
  }
  100% {
    transform: scale3d(0, 1, 1);
    transform-origin: right;
  }
`;

const ProfileImageWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  height: auto;
  background: transparent;
  position: relative;
  opacity: 0;
  transition: opacity 1.2s ease 600ms;

  ${(props) =>
    props.status === "entered" &&
    css`
      opacity: 1;
      img {
        opacity: 1;
      }
      &::before {
        content: "";
        background: ${(props) => props.theme.accentColor};
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: scale3d(0, 1, 1);
        transform-origin: left;
        z-index: 16;
        animation: ${AnimImageReveal} 1.8s ${props.theme.curveFastoutSlowin};
        animation-delay: 600ms;
      }
    `}
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 1.2s ease 1.2s;
`;

export default memo(AboutMe);
