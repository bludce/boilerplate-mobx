import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import styles from './styles.less';

type State = {
  hasError: boolean
}

type Props = {
  children: any;
} & RouteComponentProps;

class ErrorBoundary extends React.Component<Props, State> {
  state: { hasError: boolean; };
  props: { children: any; };

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  setState(arg0: { hasError: boolean; }) {
    throw new Error('Method not implemented.');
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className={styles.errorPageWrapper}>
          <div className={styles.title}>Упс, что-то пошло не так</div>
          <div className={styles.title}>Попробуйте обновить страницу позже</div>
        </div>
      );
    }

    return children;
  }
}

export default withRouter(ErrorBoundary);
