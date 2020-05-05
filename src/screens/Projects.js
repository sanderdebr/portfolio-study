import React from "react";
import styled from "styled-components";
import { projectList } from "../data/projects";
import DragSlider from "../components/DragSlider";
import ProjectItem from "../components/ProjectItem";

// Project section as container without overflow
// DragSlider is width auto

export default function Projects(props) {
  const { id, sectionRef } = props;
  return (
    <ProjectSection id={id} ref={sectionRef}>
      <DragSlider>
        {projectList.map(({ title, description }) => (
          <ProjectItem title={title} description={description} />
        ))}
      </DragSlider>
    </ProjectSection>
  );
}

const ProjectSection = styled.section`
  width: auto;
  height: 100vh;
  border: 1px solid green;
  overflow: visible;
  position: relative;
`;
