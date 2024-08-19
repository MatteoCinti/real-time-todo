import { beforeEach, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import InputWithLabel from '../input-with-label';

const id = 'title';
const label = 'Title';
const type = 'text';
const placeholder = 'Enter title';

describe('Input With Label', () => {
  beforeEach(() => {
    render(
      <InputWithLabel
        name={id}
        type={type}
        title={label}
        placeholder={placeholder}
      />
    );
  });
  it('should render on the page', ({ expect }) => {
    const input = screen.getByRole('textbox');
    expect(input).toBeTruthy();
  });
  it('should render a label', ({ expect }) => {
    const input = screen.getByLabelText(label);
    expect(input).toBeTruthy();
  });
  it('should render a placeholder text', ({ expect }) => {
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeTruthy();
  });
});
