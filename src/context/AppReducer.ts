type State = {
  slots: any;
};

type Action = {
  type: string;
  payload: {
    space: string;
    data: any;
  };
};

export default function appReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_SLOT":
      return {
        slots: {
          ...state.slots,
          [action.payload.space]: action.payload.data,
        },
      };
    default:
      throw new Error();
  }
}
