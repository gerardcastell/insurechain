import React from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const canvasStyles = {
  position: 'fixed' as const,
  pointerEvents: 'none' as const,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

type Props = {
  getInstance: (instance) => void;
};
const Confetti = ({ getInstance }: Props) => {
  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />;
};

export default Confetti;
