import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import Overlay from '../src/components/user-interface/spinner-overlay/spinnerOverlay';

storiesOf('User-interface', module)
    .add('overlay', () => <Overlay />);

storiesOf('Architecture', module)
    .add('module', () => <div />);
