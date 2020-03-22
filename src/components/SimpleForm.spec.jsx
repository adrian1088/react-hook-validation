import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SimpleForm from './SimpleForm';

describe('<SimpleForm />', () => {
  it('should render a name input', () => {
    const { getByLabelText } = render(<SimpleForm />);

    const nameInput = getByLabelText('name');

    expect(nameInput).toBeInTheDocument();
  });

  it('should render an error message', async () => {
    const { getByLabelText, findByText } = render(<SimpleForm />);

    const nameInput = getByLabelText('name');

    // fires a change event in the input with value 'ab'
    fireEvent.change(nameInput, {
      target: { value: 'ab' }
    });

    // expects the input to have the value 'ab'
    expect(nameInput).toHaveValue('ab');

    // looks up on the DOM an element with the 'invalid name' text
    const error = await findByText('invalid name');

    // expects the element to exits
    expect(error).toBeInTheDocument();
  });

  it('should render an erro message for the birthDate field', async () => {
    const { getByLabelText, findByText } = render(<SimpleForm />);
    const input = getByLabelText('birth date');

    fireEvent.change(input, {
      target: { value: '11' }
    });

    expect(input).toHaveValue('11');

    const error = await findByText('invalid date format (dd/mm/yyyy)');

    expect(error).toBeInTheDocument();
  });
});
