import React from 'react';
import SearchBarComponent, {
  SearchBarComponentProps,
} from './SearchBarComponent';
import LinkComponent from './LinkComponent';
import TitleComponent from './TitleComponent';

interface PageHeaderProps extends SearchBarComponentProps {
  randomItem: string;
  titleText: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  randomItem,
  searchValue,
  onSubmit,
  onInputChange,
  onClear,
  titleText,
}) => {
  return (
    <div className="w-full flex items-center">
      <LinkComponent href={randomItem} text="Random" />
      <TitleComponent text={titleText} />
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
