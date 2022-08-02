export const actions = {
  setSlot(
    space: string,
    registerNumber: string,
    timeIn: number,
    timeOut: number
  ) {
    return {
      type: "SET_SLOT",
      payload: {
        space,
        data: {
          registerNumber,
          timeIn,
          timeOut,
        },
      },
    };
  },
};
