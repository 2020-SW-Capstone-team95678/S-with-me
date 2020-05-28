export const VIEW_WRONG_ONLY = 'filter/VIEW_WRONG_ONLY';

export function viewWrongOlny(isViewWrongOnly) {
  return {
    type: VIEW_WRONG_ONLY,
    payload: { isViewWrongOnly },
  };
}
