import React from 'react';
import { expectToMatchSnapshot } from '../../utils/tests';
import DefaultLayout from '../DefaultLayout';

it('renders', () => {
  expectToMatchSnapshot(<DefaultLayout><div /></DefaultLayout>);
});
