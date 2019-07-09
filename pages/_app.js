import React from 'react';
import { Provider } from 'react-redux';
import store from '../client/redux/store';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';

import 'bootstrap-scss/bootstrap-grid.scss';
import '../client/styles/styles.scss';

import Router from 'next/router';

// Temporary solution for Next.js bug when styles for components are not loaded 
// after page change in dev mode - problem does not occur in production mode
Router.events.on('routeChangeComplete', () => {
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]'
    );
    const timestamp = new Date().valueOf();
    els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
  }
});

class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   const pageProps = Component.getInitialProps
  //     ? await Component.getInitialProps(ctx)
  //     : {};

  //   return { pageProps };
  // }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(store)(MyApp);
