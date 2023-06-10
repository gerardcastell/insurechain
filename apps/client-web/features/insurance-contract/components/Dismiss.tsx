import Lottie from 'lottie-react';
import React, { useRef, useState } from 'react';
import checkedAnimation from '../../../public/lottie/93122-dismiss.json';

const DismissAnimation = () => {
  const animationRef = useRef();
  const [completed, setCompleted] = useState(false);
  return (
    <Lottie
      style={{
        height: '70px',
        width: '70px',
        opacity: completed ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out',
      }}
      animationData={checkedAnimation}
      lottieRef={animationRef}
      autoPlay={false}
      loop={false}
      onComplete={() => setCompleted(true)}
    />
  );
};

export default DismissAnimation;
