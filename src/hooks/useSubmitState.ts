import { useEffect, useState } from "react";

export enum SubmitState {
  Initial,
  Loading,
  Success,
  Fail,
}

export default function useSubmitState(
  handleStateChange: (state: SubmitState) => void = () => {},
): [SubmitState, (newState: SubmitState) => void] {
  const [state, setState] = useState<SubmitState>(SubmitState.Initial);
  const switchState = (nextState: SubmitState) => {
    setState(nextState);
  };

  useEffect(() => {
    handleStateChange(state);
  }, [state, setState, handleStateChange]);

  return [state, switchState];
}
