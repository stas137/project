import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button test', () => {
  it('Test render', () => {
    render(<Button>test</Button>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('Test clear theme', () => {
    render(<Button variant="outline">test</Button>);
    expect(screen.getByText('test')).toHaveClass('clear');
    screen.debug();
  });
});
