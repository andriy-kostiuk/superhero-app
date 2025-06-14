import cn from 'classnames';
import styles from './styles.module.scss';

interface Props {
  page?: number;
  onPageChange?: (page: number) => void;
  isActive?: boolean;
  className?: string;
}

export const PaginationItem: React.FC<Props> = ({
  page,
  onPageChange,
  isActive = false,
  className,
}) => {
  const handleClick = () => {
    if (page && onPageChange && !isActive) {
      onPageChange(page);
    }
  };

  return (
    <button
      className={cn(styles['pagination-item'], className, {
        [styles['pagination-item--active']]: isActive,
      })}
      onClick={handleClick}
    >
      {page}
    </button>
  );
};
