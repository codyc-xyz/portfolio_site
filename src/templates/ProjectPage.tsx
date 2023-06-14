import React from 'react';

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
    <div className="container font-medium text-text">
      <div className="flex mt-4">
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
              <strong>Project Github:</strong> {projectGithub}
            </p>
            {uiGithub && (
              <p className="text-sm">
                <strong>UI Github:</strong>
                {uiGithub}
              </p>
            )}
            <p className="text-sm">
              <strong>Link to Project:</strong>
              <a href={projectLink} className="hover:opacity-50">
                {projectLink}
              </a>
            </p>
          </div>
          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm my-4">{projectDescription}</p>
        </div>
        <div className="w-1/3 pl-4 flex justify-end">
          <img src={projectImage} alt="Project Image" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
