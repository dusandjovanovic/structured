import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Room', module)
    .add('container', () => (
        <p>Hello world!</p>
    ));