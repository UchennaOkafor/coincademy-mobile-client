import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import DefaultLottieView, { AnimatedLottieViewProps } from 'lottie-react-native';

const LottieView = (props: AnimatedLottieViewProps): JSX.Element => {
	const [lottieAnimation, setLottieAnimation] = useState();

  useEffect(() => {
    const initializeContent = async () => {
      if (props.source.uri) {
        try {
          const response = await fetch(props.source.uri);
          const data = await response.json();
          setLottieAnimation(data)
        } catch (error) {
          console.log(error);
        }
      }
    };

    initializeContent();
  }, []);

  return (
    <>
      {lottieAnimation ? (
        <DefaultLottieView
          {...props}
          source={lottieAnimation}
        />
      ) : (
        <View style={props.style} />
      )}
		</>
  );
};

export default LottieView;
