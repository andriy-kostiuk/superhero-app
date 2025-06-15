import styles from './styles.module.scss';
import { SharedSvg } from '../SharedSvg';
import type { FC } from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const Loading: FC<Props> = ({ className }) => {
  return (
    <div className={classNames(className, styles.loading)}>
      <SharedSvg type='loading' />
    </div>
  );
};
