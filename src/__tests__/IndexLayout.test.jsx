import React from 'react';
import { expectToMatchSnapshot } from '../utils/tests';
import IndexLayout from '../IndexLayout';

it('renders css file', () => {
  expectToMatchSnapshot(<IndexLayout />);
});

it('renders without file', () => {
  expectToMatchSnapshot(<IndexLayout showCSS={false} />);
});
