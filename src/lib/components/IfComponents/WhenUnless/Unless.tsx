import type { FC } from 'react';
import { getConditionResult } from '../getConditionResults';
import { render } from '../render';
import type { ComponentWithConditionPropsWithFunctionChildren } from '../types';

/**
 * <Unless condition={condition}>rendering condtion false</Unless>
 */
const Unless: FC<ComponentWithConditionPropsWithFunctionChildren> = ({
  condition,
  children = null,
}) => {
  const conditionResult = Boolean(getConditionResult(condition));

  return !conditionResult && children ? render({ children }) : null;
};

export default Unless;
