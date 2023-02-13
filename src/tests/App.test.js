import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Verifica se o input de busca de pokémons está presente na tela', () => {
  render(<App />);
  const queryInput = screen.getByTestId('query-input');
  expect(queryInput).toBeInTheDocument();
});

test('Tenta buscar pelo "Bulbasaur"', async () => {
  const { getByTestId } = render(<App />);
  const queryInput = getByTestId('query-input');
  const searchButton = getByTestId('search-button');
  userEvent.type(queryInput, 'bulbasaur');
  userEvent.click(searchButton);
});
