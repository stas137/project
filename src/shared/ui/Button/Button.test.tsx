import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from './Button';

describe('Button test', () => {
  it('Test render', () => {
    render(<Button>test</Button>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('Test clear theme', () => {
    render(<Button theme={ThemeButton.CLEAR}>test</Button>);
    expect(screen.getByText('test')).toHaveClass('clear');
    screen.debug();
  });
});
