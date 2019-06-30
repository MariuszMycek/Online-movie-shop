import React from 'react';
import { Provider } from 'react-redux';
import store from '../client/redux/store';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';

class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   await ctx.store.dispatch(fetchLanes());

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
