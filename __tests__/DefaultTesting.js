import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { toHaveTextContent } from '@testing-library/jest-native';

expect.extend({ toHaveTextContent });

test('renders correctly', async () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('check if homepage text is correct', async () => {
  // in your test:
  const { queryByTestId } = render(<App />,)
  expect(queryByTestId('homepage-text')).toHaveTextContent('Open up App.js to start working on your app!');
})

