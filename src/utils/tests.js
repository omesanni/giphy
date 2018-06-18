import renderer from 'react-test-renderer';

/**
 * Checks if component matches snapshot created by jest
 * @param  {ReactElement} component
 */
export function expectToMatchSnapshot(component) {
  expect(renderer.create(component).toJSON()).toMatchSnapshot();
}
