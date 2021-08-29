// import dependencies
import React from 'react'

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

// the component to test

import App from './App';



test('loads and displays app', async () => {
  // Arrange
  render(<App />)

  // Assert

  // assert that the amount  is correct using
  // toBeDisabled, a custom matcher from jest-dom.
  expect(screen.getByPlaceholderText('amount')).not.toBeDisabled('Oops, failed to fetch!')

  // assert that the calculate button is not disabled using
  // toBeDisabled, a custom matcher from jest-dom.
  expect(screen.getByText('Calculate')).not.toBeDisabled('Oops, failed to fetch!')
})


test('loads and displays assets', async () => {
  // Arrange
  render(<App />)

  // Act
  fireEvent.select(screen.getByPlaceholderText('from'))

  // wait until the `get` request promise resolves and
  // the component calls setState and re-renders.
  // `waitFor` waits until the callback doesn't throw an error

  await waitFor(() =>

    screen.getAllByText('EUR'),
    screen.getAllByText('USD'),
    screen.getAllByText('GBP'),
    screen.getByText('JPY'),
    screen.getByText('XCD'),
    screen.getAllByText('LKR')

  )

})

test('calculate and show response', async () => {
  // Arrange
  render(<App />)

  // Act
  fireEvent.click(screen.getByText('Calculate'))

  // wait until the `get` request promise resolves and
  // the component calls setState and re-renders.
  // `waitFor` waits until the callback doesn't throw an error

  await waitFor(() =>
    // getByRole throws an error if it cannot find an element
    screen.getByText('calculatedAmount').value,
  )

})

test('enter amount', async () => {
  // Arrange
  render(<App />)

  // Act
  //const {input} = screen.getByPlaceholderText('amount')
  fireEvent.change(screen.getByPlaceholderText('amount'), { target: { value: '23' } })
  expect(screen.getByPlaceholderText('amount').value).toBe('23')


})