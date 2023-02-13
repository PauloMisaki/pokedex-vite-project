import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da tela principal: ', () => {
  test('Verifica se o input de busca de pokémons está presente na tela', () => {
    render(<App />);
    const queryInput = screen.getByTestId('query-input');
    expect(queryInput).toBeInTheDocument();
  });

  test('Tenta buscar pelo "Bulbasaur"', () => {
    const { getByTestId } = render(<App />);
    const queryInput = getByTestId('query-input');
    const searchButton = getByTestId('search-button');
    userEvent.type(queryInput, 'bulbasaur');
    userEvent.click(searchButton);
    // setTimeout usado para 'mockar' de forma simples a assincronissidade
    setTimeout(() => {
      expect(screen.getByTestId('bulbasaur')).toBeInTheDocument();
    }, 10000);
  });
  
  test('Tenta mudar a região da Pokédex', async () => {
    render(<App />);
    expect(screen.getByTestId('region-select')).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBe(9);
    userEvent.selectOptions(
      screen.getByTestId('region-select'),
      screen.getByTestId('Hoenn'),
    )
    // setTimeout usado para 'mockar' de forma simples a assincronissidade
    setTimeout(() => {
      expect(screen.getByTestId('treecko')).toBeInTheDocument();
    }, 10000);
  })
});