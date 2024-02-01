import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ProjectAttributes } from '../types/ProjectAttributes';
import ButtonWithDropdown from '../components/general/ButtonWithDropdown';
import Dropdown from '../components/general/Dropdown';
import Filter from '../components/general/Filter';
import { OptionType } from '../components/general/FilterSection';
import Card from '../components/general/Card';
import PageHeader from '../components/general/PageHeader';
import LoadingOrError from '../components/general/LoadingOrError';
import TitleComponent from '../components/general/TitleComponent';
import { useSessionStorage } from '../../functions/useSessionStorage';
import { sanitizeName } from '../../functions/sanitizeName';
import { useYScrollPositionSessionStorage } from '../../functions/useYScrollPositionSessionStorage';

import { Helmet } from 'react-helmet';

export const GET_PROJECTS = gql`
  {
    allProjects {
      project_uid
      project_name
      project_description
      project_status
      date_started
      technologies
      project_image
      project_size
      project_link
      github_project_link
      github_ui_link
    }
  }
`;

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectAttributes[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectAttributes[]>(
    [],
  );

  const [isSortExpanded, setSortExpanded] = useSessionStorage(
    `/projects/IsSortExpanded`,
    false,
  );
  const [isFilterExpanded, setFilterExpanded] = useSessionStorage(
    `/projects/IsFilterExpanded`,
    false,
  );
  const [isTechnologyExpanded, setTechnologyExpanded] = useSessionStorage(
    `/projects/IsTechnologyExpanded`,
    false,
  );
  const [isSizeExpanded, setSizeExpanded] = useSessionStorage(
    `/projects/IsSizeExpanded`,
    false,
  );
  const [isStatusExpanded, setStatusExpanded] = useSessionStorage(
    `/projects/IsStatusExpanded`,
    false,
  );
  const [selectedTechnologies, setSelectedTechnologies] = useSessionStorage(
    `/projects/SelectedTechnologies`,
    [],
  );
  const [availableSizes, setAvailableSizes] = useSessionStorage(
    `/projects/AvailableSizes`,
    [],
  );
  const [selectedStatus, setSelectedStatus] = useSessionStorage(
    `/projects/SelectedStatus`,
    null,
  );
  const [availableTechnologies, setAvailableTechnologies] = useSessionStorage(
    `/projects/AvailableTechnologies`,
    [],
  );
  const [selectedSize, setSelectedSize] = useSessionStorage(
    `/projects/SelectedSize`,
    null,
  );
  const [availableStatuses, setAvailableStatuses] = useSessionStorage(
    `/projects/AvailableStatuses`,
    [],
  );
  const [searchValue, setSearchValue] = useSessionStorage(
    `/projects/SearchValue`,
    ``,
  );
  const [selectedSortOption, setSelectedSortOption] = useSessionStorage(
    `/projects/SelectedSortOption`,
    `Project Name (A-Z)`,
  );

  const [randomProjectIndex, setRandomProjectIndex] = useState(0);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
  };

  const { loading, error, data } = useQuery(GET_PROJECTS);
  useYScrollPositionSessionStorage();

  const handleSortOptionClick = (option: string) => {
    setSortExpanded(!isSortExpanded);
    setSelectedSortOption(option);
  };

  const handleFilterClear = () => {
    setFilteredProjects(
      projects.filter((project) =>
        project.project_name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );

    setSelectedTechnologies([]);
    setSelectedSize(null);
    setSelectedStatus(null);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filteredResults = projects.filter((project) => {
      const projectSize = project.project_size;
      const projectStatus = project.project_status;
      return (
        (selectedTechnologies.length === 0 ||
          selectedTechnologies.every((tech: string) =>
            project.technologies.includes(tech),
          )) &&
        (selectedSize === null || projectSize === selectedSize) &&
        (selectedStatus === null || selectedStatus === projectStatus) &&
        project.project_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    const sortedFilteredResults = sortProjects(
      filteredResults,
      selectedSortOption,
    );
    setFilteredProjects(sortedFilteredResults);
  };

  const handleClearSearch = () => {
    setSearchValue(``);
    const filteredResults = projects.filter((project) => {
      const projectSize = project.project_size;
      const projectStatus = project.project_status;
      return (
        (selectedTechnologies.length === 0 ||
          selectedTechnologies.every((tech: string) =>
            project.technologies.includes(tech),
          )) &&
        (selectedSize === null || projectSize === selectedSize) &&
        (selectedStatus === null || selectedStatus === projectStatus)
      );
    });
    const sortedFilteredResults = sortProjects(
      filteredResults,
      selectedSortOption,
    );
    setFilteredProjects(sortedFilteredResults);
  };

  const sortProjects = (projects: ProjectAttributes[], sortOption: string) => {
    const projectsCopy = [...projects];
    switch (sortOption) {
      case `Project Name (A-Z)`:
        return projectsCopy.sort((a, b) =>
          a.project_name.localeCompare(b.project_name),
        );
      case `Date Started Ascending`:
        return projectsCopy.sort(
          (a, b) =>
            new Date(a.date_started).getTime() -
            new Date(b.date_started).getTime(),
        );
      case `Date Started Descending`:
        return projectsCopy.sort(
          (a, b) =>
            new Date(b.date_started).getTime() -
            new Date(a.date_started).getTime(),
        );
      case `Project Size Ascending`:
        return projectsCopy.sort((a, b) => {
          const sizeToNum = { Small: 1, Medium: 2, Large: 3 };
          return sizeToNum[a.project_size] - sizeToNum[b.project_size];
        });

      case `Project Size Descending`:
        return projectsCopy.sort((a, b) => {
          const sizeToNum = { Small: 1, Medium: 2, Large: 3 };
          return sizeToNum[b.project_size] - sizeToNum[a.project_size];
        });
      default:
        return projectsCopy;
    }
  };

  const handleTechnologyClick = (tech: string) => {
    let updatedTech: string[];

    if (selectedTechnologies.includes(tech)) {
      updatedTech = selectedTechnologies.filter((t) => t !== tech);
      setFilteredProjects(
        projects.filter((project) => {
          const projectSize = project.project_size;
          const projectStatus = project.project_status;

          return (
            (selectedSize === null || projectSize === selectedSize) &&
            updatedTech.every((tech) => project.technologies.includes(tech)) &&
            (selectedStatus === null || selectedStatus === projectStatus) &&
            (searchValue === `` ||
              project.project_name
                .toLowerCase()
                .includes(searchValue.toLowerCase()))
          );
        }),
      );
    } else {
      updatedTech = [...selectedTechnologies, tech];
      setFilteredProjects(
        filteredProjects.filter((project) =>
          updatedTech.every((tech) => project.technologies.includes(tech)),
        ),
      );
    }
    setSelectedTechnologies(updatedTech);
  };

  const handleSizeClick = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize(null);

      setFilteredProjects(
        projects.filter((project) => {
          const projectStatus = project.project_status;
          return (
            selectedTechnologies.every((tech: string) =>
              project.technologies.includes(tech),
            ) &&
            (selectedStatus === null || selectedStatus === projectStatus) &&
            (searchValue === `` ||
              project.project_name
                .toLowerCase()
                .includes(searchValue.toLowerCase()))
          );
        }),
      );
    } else {
      setSelectedSize(size);

      setFilteredProjects(
        filteredProjects.filter((project) => {
          const projectSize = project.project_size;
          return projectSize === size;
        }),
      );
    }
  };

  const handleStatusClick = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
      setFilteredProjects(
        projects.filter((project) => {
          const projectSize = project.project_size;
          return (
            selectedTechnologies.every((tech: string) =>
              project.technologies.includes(tech),
            ) &&
            (selectedSize === null || selectedSize === projectSize) &&
            (searchValue === `` ||
              project.project_name
                .toLowerCase()
                .includes(searchValue.toLowerCase()))
          );
        }),
      );
    } else {
      setSelectedStatus(status);
      setFilteredProjects(
        filteredProjects.filter((project) => {
          const projectStatus = project.project_status;
          return projectStatus === status;
        }),
      );
    }
  };

  const handleRandomClick = () => {
    if (filteredProjects.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredProjects.length);
      setRandomProjectIndex(newIndex);
    }
  };

  const countTech = (projects: ProjectAttributes[]) => {
    return projects.reduce((counts: Record<string, number>, project) => {
      project.technologies.forEach((tech) => {
        if (!counts[tech]) {
          counts[tech] = 0;
        }
        counts[tech]++;
      });
      return counts;
    }, {});
  };

  useEffect(() => {
    if (!loading && !error && data) {
      const fetchedProjects = data.allProjects;
      const sortedFetchedProjects = sortProjects(
        fetchedProjects,
        selectedSortOption,
      );
      setProjects(sortedFetchedProjects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, data]);

  useEffect(() => {
    const techCounts = countTech(filteredProjects);
    const uniqueTech = Object.keys(techCounts).sort((a, b) => {
      if (
        selectedTechnologies.includes(a) &&
        !selectedTechnologies.includes(b)
      ) {
        return -1;
      } else if (
        !selectedTechnologies.includes(a) &&
        selectedTechnologies.includes(b)
      ) {
        return 1;
      }
      return techCounts[b] - techCounts[a];
    });
    setAvailableTechnologies(uniqueTech);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProjects, selectedTechnologies]);

  useEffect(() => {
    const uniqueSizes = filteredProjects.reduce((sizes: string[], project) => {
      const projectSize = project.project_size;
      if (!sizes.includes(projectSize)) {
        sizes.push(projectSize);
      }
      return sizes;
    }, []);

    const sizeToNum: { [key: string]: number } = {
      Small: 1,
      Medium: 2,
      Large: 3,
    };

    const sortedSizes = uniqueSizes.sort((a, b) => {
      return sizeToNum[a] - sizeToNum[b];
    });

    setAvailableSizes(sortedSizes);
  }, [filteredProjects]);

  useEffect(() => {
    const uniqueStatuses = filteredProjects.reduce(
      (statuses: string[], project) => {
        const projectStatus = project.project_status;
        if (!statuses.includes(projectStatus)) {
          statuses.push(projectStatus);
        }
        return statuses;
      },
      [],
    );
    const statusToNum: { [key: string]: number } = {
      Active: 1,
      Completed: 2,
    };

    const sortedStatuses = uniqueStatuses.sort((a, b) => {
      return statusToNum[a] - statusToNum[b];
    });

    setAvailableStatuses(sortedStatuses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProjects]);

  useEffect(() => {
    if (filteredProjects.length > 0) {
      const newIndex = Math.floor(Math.random() * filteredProjects.length);
      setRandomProjectIndex(newIndex);
    }
  }, [filteredProjects]);

  useEffect(() => {
    let filteredResults = projects;

    if (
      selectedTechnologies.length > 0 ||
      selectedSize ||
      selectedStatus ||
      searchValue
    ) {
      filteredResults = projects.filter((project) => {
        const projectSize = project.project_size;
        const projectStatus = project.project_status;
        return (
          (selectedTechnologies.length === 0 ||
            selectedTechnologies.every((tech: string) =>
              project.technologies.includes(tech),
            )) &&
          (selectedSize === null || projectSize === selectedSize) &&
          (selectedStatus === null || selectedStatus === projectStatus) &&
          (searchValue === `` ||
            project.project_name
              .toLowerCase()
              .includes(searchValue.toLowerCase()))
        );
      });
    }
    const sortedFilteredResults = sortProjects(
      filteredResults,
      selectedSortOption,
    );
    setFilteredProjects(sortedFilteredResults);
  }, [
    projects,
    selectedSortOption,
    selectedTechnologies,
    selectedSize,
    selectedStatus,
    searchValue,
  ]);

  const filterSections = [
    {
      label: `Technology`,
      isExpanded: isTechnologyExpanded,
      onButtonClick: () => setTechnologyExpanded(!isTechnologyExpanded),
      options: availableTechnologies,
      selectedOption: selectedTechnologies,
      onOptionClickString: handleTechnologyClick,
    },
    {
      label: `Project Size`,
      isExpanded: isSizeExpanded,
      onButtonClick: () => setSizeExpanded(!isSizeExpanded),
      options: availableSizes,
      selectedOption: selectedSize,
      onOptionClickString: handleSizeClick,
      displayOption: (option: OptionType) => `${option}`,
    },
    {
      label: `Project Status`,
      isExpanded: isStatusExpanded,
      onButtonClick: () => setStatusExpanded(!isStatusExpanded),
      options: availableStatuses,
      selectedOption: selectedStatus,
      onOptionClickString: handleStatusClick,
      displayOption: (option: OptionType) => `${option}`,
    },
  ];

  const sortOptions = [
    `Project Name (A-Z)`,
    `Date Started Ascending`,
    `Date Started Descending`,
    `Project Size Ascending`,
    `Project Size Descending`,
  ];

  const dropdown = (
    <Dropdown
      options={sortOptions}
      selectedOption={selectedSortOption}
      onOptionClick={handleSortOptionClick}
    />
  );

  const randomProject = sanitizeName(
    filteredProjects[randomProjectIndex]?.project_name,
  );

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error}></LoadingOrError>;
  }
  return (
    <div className="container pb-4">
      <Helmet>
        <title>Projects | CodyC</title>
      </Helmet>

      <div className="flex flex-col gap-2">
        <TitleComponent
          text={`Personal Projects`}
          className="block md:hidden mx-auto"
        />

        <div className="flex gap-2 md:gap-3">
          <ButtonWithDropdown
            widthClass="w-1/3 md:w-1/4"
            paddingClass="w-full py-2 px-2"
            label="Sort"
            isExpanded={isSortExpanded}
            onButtonClick={() => setSortExpanded(!isSortExpanded)}
            dropdown={dropdown}
          />
          <Filter
            isFilterExpanded={isFilterExpanded}
            onFilterClick={() => setFilterExpanded(!isFilterExpanded)}
            filterSections={filterSections}
            onClear={handleFilterClear}
            filteredItemsLength={filteredProjects.length}
            itemsLength={projects.length}
          />
        </div>

        <div>
          <div>
            <PageHeader
              randomItem={randomProject}
              searchValue={searchValue}
              onSubmit={handleSearchSubmit}
              onInputChange={handleSearchInputChange}
              onClear={handleClearSearch}
              titleText="Personal Projects"
              onClick={handleRandomClick}
              titleClassName="hidden md:block md:w-1/3 mx-auto"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {filteredProjects.map((project) => (
                <Card
                  key={project.project_uid}
                  pageUrl={`/projects/${sanitizeName(project.project_name)}`}
                  altText={project.project_name}
                  title={project.project_name}
                  imageUrl={project.project_image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
