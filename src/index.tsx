import React, {
  lazy, Suspense, ElementType,
} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { navigations } from 'constants/navigations';
import ErrorBoundary from 'components/ErrorBoundary';

import styles from 'styles/common.less';
import './styles/fonts.less';

const AppComponents = navigations.reduce<Record<string, ElementType>>((acc, item) => {
  acc[item.page] = lazy(() => import(
    /* webpackPrefetch: true */
    `pages/${item.page}`
  ));

  return acc;
}, {});

const App = () => {
  return (
    <Router>
      <main className={styles.main}>
        <div className={styles.layoutWrapper}>
          <Switch>
            {navigations.map((navigationItem) => (
              <Route
                exact
                key={navigationItem.page}
                path={navigationItem.path}
                render={((props: Record<string, any>) => {
                  const Component = AppComponents[navigationItem.page];

                  return (
                    <Suspense
                      fallback={<div />}
                    >
                      <ErrorBoundary>
                        <Component {...props} />
                      </ErrorBoundary>
                    </Suspense>
                  );
                })}
              />
            ))}
          </Switch>
        </div>
      </main>
    </Router>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
