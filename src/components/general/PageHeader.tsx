import React from 'react';
import SearchBarComponent, {
  SearchBarComponentProps,
} from './SearchBarComponent';
import LinkComponent from './LinkComponent';
import TitleComponent from './TitleComponent';

interface PageHeaderProps extends SearchBarComponentProps {
  randomItem: string;
  titleText: string;
  onClick?: () => void;
  titleClassName?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  randomItem,
  searchValue,
  onSubmit,
  onInputChange,
  onClear,
  titleText,
  onClick,
  titleClassName = ``,
}) => {
  return (
    <div className="w-full flex items-center">
      <LinkComponent href={randomItem} text="Random" onClick={onClick} />
      <TitleComponent text={titleText} className={titleClassName} />
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
