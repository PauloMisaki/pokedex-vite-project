import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da tela de detalhes: ', () => {
  test('Acessa a tela de um pokémon e verifica se todos os elementos estão presentes', () => {
    render(<App />);
    const queryInput = screen.getByTestId('query-input');
    const searchButton = screen.getByTestId('search-button');
    userEvent.type(queryInput, 'bulbasaur');
    userEvent.click(searchButton);
    // setTimeout usado para 'mockar' de forma simples a assincronissidade
    setTimeout(() => {
      expect(screen.getByTestId('bulbasaur')).toBeInTheDocument();
      expect(screen.getByTestId('pkd-stats')).toBeInTheDocument();
      expect(screen.getByTestId('pkd-weight')).toBeInTheDocument();
      expect(screen.getByTestId('pkd-abilities')).toBeInTheDocument();
      expect(screen.getByTestId('pkd-height')).toBeInTheDocument();
    }, 10000);
    // expect(screen.getByTestId('bulbasaur')).toBeInTheDocument();
  });
});
