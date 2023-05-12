import type { ComponentPropsWithRef, ElementType } from 'react';

type COMBINE<T, K> = Omit<T, keyof K> & K;

// T가 사용자, K가 react 제공 props
type COMBINE_ELEMENT_PROPS<T extends ElementType, K = unknown> = COMBINE<
  ComponentPropsWithRef<T>,
  K
>;

// 자동으로 as 타입 추가
type OVER_RIDABLE_PROPS<T extends ElementType, K = unknown> = {
  as?: T;
} & COMBINE_ELEMENT_PROPS<T, K>;

export type { OVER_RIDABLE_PROPS, COMBINE_ELEMENT_PROPS, COMBINE };
