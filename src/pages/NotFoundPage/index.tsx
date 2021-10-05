import React from 'react';
import styles from './styles.less';

const NotFoundPage = () => (
  <div className={styles.wrapper}>
    <div className="">
      404 Страница не найдена
    </div>
    <div className="">В адресе возможна ошибка или страница удалена</div>
  </div>
);

export default NotFoundPage;
