import { fireEvent, screen } from '@testing-library/react';
import { ComponentRender } from '@/shared/config/tests/ComponentRender/ComponentRender';
import { Counter } from './Counter';

describe('Counter test', () => {
  it('Test render', () => {
    ComponentRender(
      <Counter />,
      {
        initialState: {
          counter: {
            value: 10,
          },
        },
      },
    );
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  it('Test increment', () => {
    ComponentRender(
      <Counter />,
      {
        initialState: {
          counter: {
            value: 10,
          },
        },
      },
    );

    fireEvent.click(screen.getByTestId('increment-btn'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });

  it('Test decrement', () => {
    ComponentRender(
      <Counter />,
      {
        initialState: {
          counter: {
            value: 10,
          },
        },
      },
    );

    fireEvent.click(screen.getByTestId('decrement-btn'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
});
