import React from 'react';

import { storiesOf } from '@storybook/react';
import Overlay from '../src/components/user-interface/spinner-overlay/spinnerOverlay';

storiesOf('Structured', module)
    .add('meta-data', () => <div> testing components here.. </div>);

storiesOf('User-interface', module)
  .add('overlay', () => <Overlay />);
