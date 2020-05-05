import React from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import { projectList } from "../data/projects";
import DragSlider from "../components/DragSlider";
import ProjectItem from "../components/ProjectItem";

// Project section as container without overflow
// DragSlider is width auto

export default function Projects(props) {
  const { id, sectionRef, visible } = props;
  return (
    <ProjectSection id={id} ref={sectionRef}>
      <DragSlider>
        <Transition in={visible} timeout={0}>
          {(status) => (
            <>
              {projectList.map(({ title, description }) => (
                <ProjectItem
                  status={status}
                  title={title}
                  description={description}
                />
              ))}
            </>
          )}
        </Transition>
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
