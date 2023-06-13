import { MutableRefObject, ReactNode, UIEvent, memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';

import { getScrollSaveByPath, scrollSaveActions } from '@/features/ScrollSave';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';

import { TestProps } from '@/shared/types/tests';

import cls from './Page.module.scss';

interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;

  const dispatch = useAppDispatch();
  const location = useLocation();

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const scrollPosition = useSelector((state: StateSchema) =>
    getScrollSaveByPath(state, location.pathname),
  );

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.PageRedesigned,
    off: () => cls.Page,
  });

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => undefined,
      off: () => wrapperRef,
    }),
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    console.log({ position: e.currentTarget.scrollTop });

    dispatch(
      scrollSaveActions.setScrollPosition({
        path: location.pathname,
        position: e.currentTarget.scrollTop,
      }),
    );
  }, 500);

  return (
    <main
      className={classNames(mainClass, {}, [className])}
      ref={wrapperRef}
      onScroll={onScroll}
      id={PAGE_ID}
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {children}

      {onScrollEnd && (
        <div
          className={cls.trigger}
          ref={triggerRef}
        />
      )}
    </main>
  );
});
