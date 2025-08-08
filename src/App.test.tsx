import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders preloader initially', () => {
  render(<App />);
  const preloaderElement = document.querySelector('.preloader');
  expect(preloaderElement).toBeInTheDocument();
});

test('renders app with navigation after loading', async () => {
  render(<App />);
  
  // Wait for preloader to disappear
  await waitFor(() => {
    expect(document.querySelector('.preloader')).not.toBeInTheDocument();
  }, { timeout: 3000 });
  
  const navElement = screen.getByText('Home');
  expect(navElement).toBeInTheDocument();
});

test('renders main heading after loading', async () => {
  render(<App />);
  
  await waitFor(() => {
    expect(document.querySelector('.preloader')).not.toBeInTheDocument();
  }, { timeout: 3000 });
  
  const headingElement = screen.getByText('THIS');
  expect(headingElement).toBeInTheDocument();
});

test('renders name after loading', async () => {
  render(<App />);
  
  await waitFor(() => {
    expect(document.querySelector('.preloader')).not.toBeInTheDocument();
  }, { timeout: 3000 });
  
  const nameElement = screen.getByText('TIDAE');
  expect(nameElement).toBeInTheDocument();
});
