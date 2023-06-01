import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/deprecated/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
  const { t } = useTranslation();

  const counterValue = useCounterValue();

  const { increment, decrement, add } = useCounterActions();

  // const increment = () => { dispatch(counterActions.increment()); };
  // const decrement = () => { dispatch(counterActions.decrement()); };

  return (
    <div data-testid="value-title">
      <h1>{counterValue}</h1>
      <Button
        data-testid="increment-btn"
        onClick={() => increment()}
      >
        {t('increment')}
      </Button>
      <Button
        data-testid="decrement-btn"
        onClick={() => decrement()}
      >
        {t('decrement')}
      </Button>
      <Button
        data-testid="5-btn"
        onClick={() => add(5)}
      >
        {t('5')}
      </Button>
    </div>
  );
};
