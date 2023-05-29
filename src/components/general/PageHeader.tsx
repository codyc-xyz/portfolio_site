import React from 'react';
import SearchBarComponent, {
  SearchBarComponentProps,
} from './SearchBarComponent';
import LinkComponent from './LinkComponent';
import TitleComponent from './TitleComponent';

interface PageHeaderProps extends SearchBarComponentProps {
  randomMovie: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  randomMovie,
  searchValue,
  onSubmit,
  onInputChange,
  onClear,
}) => {
  return (
    <div className="w-full flex items-center">
      <LinkComponent href={randomMovie} text="Random" />
      <TitleComponent text="Movies I Love" />
      <SearchBarComponent
        searchValue={searchValue}
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        onClear={onClear}
      />
    </div>
  );
};

export default PageHeader;
