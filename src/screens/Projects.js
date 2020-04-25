import React from "react";
import styled from "styled-components";

export default function Projects(props) {
  const { id, sectionRef } = props;
  return (
    <ProjectSection id={id} ref={sectionRef}>
      <ProjectContent>content</ProjectContent>
    </ProjectSection>
  );
}

const ProjectSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  margin-top: 60px;
  margin-bottom: 40px;
  padding-top: 60px;
  padding-right: 80px;
  padding-bottom: 40px;
  padding-left: 150px;
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

const ProjectContent = styled.div`
  display: grid;
  grid-template-columns: 50% 40%;
  grid-column-gap: 6%;
  max-width: ${(props) => props.theme.maxWidthLaptop}px;
  width: 100%;

  @media (min-width: ${(props) => props.theme.desktop}px) {
    max-width: ${(props) => props.theme.maxWidthDesktop}px;
  }

  @media (max-width: ${(props) => props.theme.tablet}px) {
    max-width: 600px;
  }

  @media (max-width: ${(props) => props.theme.tablet}px) {
    grid-template-columns: 100%;
  }
`;
