export const increaseProgress = (amount: number) => ({
  type: "INCREASE_PROGRESS",
  payload: amount,
});

export const decreaseProgress = (amount: number) => ({
  type: "DECREASE_PROGRESS",
  payload: amount,
});

export const resetProgress = () => ({
  type: "RESET_PROGRESS",
});
