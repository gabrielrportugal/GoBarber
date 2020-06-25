import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Input from '../../components/Input';

// Mockando a função useField de dentro do Unform/Core usada no componente Input
jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

// Testa se o componente é renderizado em tela
describe('InputComponent', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  // Testa o resultado visual de clicar no input
  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');

    // Necessário inserir data-testid="input-conatiner" no container do component
    // pois é ele quem sofre alteração no estilo ao receber o foco
    const containerElement = getByTestId('input-conatiner');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElement).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');

    // Necessário inserir data-testid="input-conatiner" no container do component
    // pois é ele quem sofre alteração no estilo ao receber o foco
    const containerElement = getByTestId('input-conatiner');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com.br' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });
});
