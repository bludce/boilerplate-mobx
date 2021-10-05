import React from 'react';
import { ReactComponent as EmptyIcon } from 'icons/empty.svg';

import styles from './styles.less';

type Props = {
  title: string
}

export const NoData = ({ title }: Props) => (
  <div className={styles.container}>
    <EmptyIcon className={styles.emptyIcon} />
    {title}
  </div>
);
