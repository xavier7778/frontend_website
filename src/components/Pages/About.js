import React from "react";
import "./About.css";

export const About = () => {
  return (
    <div className="about-section">
      <h2>About Me</h2>
      <p>
        I am a Software Engineer with experience in Machine Learning, Large Language Models (LLMs), 
        and Agile methodologies. Currently, I work as a Development Engineer at AVIZVA, where I build and 
        optimize intelligent systems.
      </p>
      <p>
        My academic journey includes a B.Tech in Computer Engineering from Delhi Technological University (DTU), 
        where I was an active member of YUVAAN DTU.
      </p>
      
      <h3>Skills</h3>
      <ul className="skills-list">
        <li>Machine Learning</li>
        <li>Deep Learning</li>
        <li>Large Language Models (LLMs)</li>
        <li>Prompt Engineering</li>
        <li>Natural Language Processing</li>
        <li>Full Stack Web Development</li>
        <li>Agile Methodologies</li>
      </ul>
    </div>
  );
};
