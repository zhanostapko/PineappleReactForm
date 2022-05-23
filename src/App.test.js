import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
const setup = () => {
  const input = screen.getByRole('input');
  return {
    input,
  };
};

test('renders input', () => {
  render(<App />);
  const { input } = setup();

  expect(input).toBeInTheDocument();
});

test('has email validation', () => {
  render(<App />);
  const { input } = setup();

  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.submit(input);

  expect(
    screen.getByText('Please provide a valid e-mail address')
  ).toBeInTheDocument();
});

test('has empty email validation', () => {
  render(<App />);
  const { input } = setup();

  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.change(input, { target: { value: '' } });
  fireEvent.submit(input);

  expect(screen.getByText('Email address is required')).toBeInTheDocument();
});

test('has colombia email validation', () => {
  render(<App />);
  const { input } = setup();

  fireEvent.change(input, { target: { value: 'test@email.co' } });
  fireEvent.submit(input);

  expect(
    screen.getByText('We are not accepting subscriptions from Colombia emails')
  ).toBeInTheDocument();
});

test('has error message clearing', () => {
  render(<App />);
  const { input } = setup();

  fireEvent.change(input, { target: { value: 'test@email.co' } });
  fireEvent.submit(input);
  fireEvent.change(input, { target: { value: 'test@email.com' } });
  fireEvent.submit(input);

  expect(() =>
    screen.getByText('We are not accepting subscriptions from Colombia emails')
  ).toThrow();
});
