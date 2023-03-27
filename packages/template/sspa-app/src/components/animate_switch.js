import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
const AnimatedSwitch = (props) => {
  const { children } = props;
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page-fade" timeout={1000}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
export default AnimatedSwitch;
