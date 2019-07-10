import React from 'react';
import { connect } from 'react-redux';

import Layout from '../client/components/Layout/Layout';
import Container from 'react-bootstrap/Container';

const Contact = () => (
  <Layout>
    <main>
      <Container>
        <ul>
          <li>
            Morbi in sem quis dui placerat ornare. Pellentesque odio nisi,
            euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
            consequat.
          </li>
          <li>
            Praesent dapibus, neque id cursus faucibus, tortor neque egestas
            augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam
            dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
          </li>
          <li>
            Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
            consectetuer ligula vulputate sem tristique cursus. Nam nulla quam,
            gravida non, commodo a, sodales sit amet, nisi.
          </li>
          <li>
            Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor,
            ultrices ut, elementum vulputate, nunc.
          </li>
        </ul>
      </Container>
    </main>
  </Layout>
);

// export default connect(state => state)(Home);
export default Contact;
