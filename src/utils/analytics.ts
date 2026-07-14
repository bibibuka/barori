const YANDEX_METRIKA_COUNTER_ID = 108174506;

type GoalParams = Record<string, string | number | boolean | null | undefined>;

export const trackGoal = (goalName: string, params?: GoalParams) => {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') {
    return;
  }

  window.ym(YANDEX_METRIKA_COUNTER_ID, 'reachGoal', goalName, params);
};