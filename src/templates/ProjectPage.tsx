import React from 'react';
import { Link } from 'gatsby';

interface ProjectPageProps {
  pageContext: {
    projectUid: string;
    projectName: string;
    projectDescription: string;
    dateStarted: string;
    projectImage: string;
    technologies: string[];
    projectStatus: string;
    projectSize: string;
    projectLink: string;
    projectGithub: string;
    uiGithub: string;
  };
}

const ProjectPage: React.FC<ProjectPageProps> = ({ pageContext }) => {
  const {
    projectName,
    projectDescription,
    dateStarted,
    projectImage,
    technologies,
    projectStatus,
    projectSize,
    projectLink,
    projectGithub,
    uiGithub,
  } = pageContext;
  return (
    <div className="container font-medium text-text mb-4">
      <div className="flex mt-4 items-center">
        <div className="w-2/3 pr-4">
          <h1 className="text-2xl">{projectName}</h1>
          <div className="mt-2">
            <p className="text-sm">
              <strong>Date Started:</strong> {dateStarted}
            </p>
            <p className="text-sm">
              <strong>Size:</strong> {projectSize}
            </p>
            <p className="text-sm">
              <strong>Status: </strong> {projectStatus}
            </p>
            <p className="text-sm">
              <strong>Technologies:</strong> {technologies.join(`, `)}
            </p>

            <p className="text-sm">
              <strong>Project Github: </strong>
              <Link to={projectGithub} className="hover:opacity-50">
                {projectGithub}
              </Link>
            </p>
            {uiGithub && (
              <p className="text-sm">
                <strong>UI Github: </strong>
                <Link to={uiGithub} className="hover:opacity-50">
                  {uiGithub}
                </Link>
              </p>
            )}
            <p className="text-sm">
              <strong>Link to Project: </strong>
              <Link to={projectLink} className="hover:opacity-50">
                {projectLink}
              </Link>
            </p>
          </div>
          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm my-4">{projectDescription}</p>
        </div>
        <div className="w-1/2 h-1/4 pl-4 flex justify-end items-center">
          {` `}
          <div className="text-center">
            <img src={projectImage} alt="Project Image" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
