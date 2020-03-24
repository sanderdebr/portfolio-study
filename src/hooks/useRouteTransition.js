import { useContext } from "react";
import { TransitionContext } from "../app";

const useRouteTransition = () => useContext(TransitionContext);

export default useRouteTransition;
