import React from 'react';
import SearchBarComponent, {
  SearchBarComponentProps,
} from './SearchBarComponent';
import LinkComponent from './LinkComponent';
import TitleComponent from './TitleComponent';

interface PageHeaderProps extends SearchBarComponentProps {
  randomItem: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  randomItem,
  searchValue,
  onSubmit,
  onInputChange,
  onClear,
}) => {
  return (
    <div className="w-full flex items-center">
      <LinkComponent href={randomItem} text="Random" />
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
