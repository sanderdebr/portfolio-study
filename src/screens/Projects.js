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
  const amount = projectList.length;

  return (
    <ProjectSection id={id} ref={sectionRef}>
      <DragSlider amount={amount}>
        <Transition in={visible} timeout={0}>
          {(status) => (
            <>
              {projectList.map(({ title, description }, index) => (
                <ProjectItem
                  status={status}
                  title={title}
                  description={description}
                  index={index}
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
