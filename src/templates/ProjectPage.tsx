import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';

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
    <div className="container font-medium text-text mb-7 sm:mb-4">
      <Helmet>
        <title>{projectName} - CodyC</title>
      </Helmet>

      <div className="flex mt-4 items-center">
        <div className="w-full">
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
              <a
                href={projectGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-50"
              >
                Project Github
              </a>
            </p>
            {uiGithub && (
              <p className="text-sm">
                <Link to={uiGithub} className="underline hover:opacity-50">
                  UI Github
                </Link>
              </p>
            )}
            <p className="text-sm">
              <Link to={projectLink} className="underline hover:opacity-50">
                Project Link
              </Link>
            </p>
          </div>
          <div className="block w-full lg:w-1/2 mt-2">
            <img src={projectImage} alt="Project Image" className="w-full" />
          </div>

          <h2 className="text-xl mt-4">About</h2>
          <p className="text-sm my-4 w-full">{projectDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
