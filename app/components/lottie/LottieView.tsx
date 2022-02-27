import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import DefaultLottieView, {AnimatedLottieViewProps} from 'lottie-react-native';

const LottieView = (props: AnimatedLottieViewProps): JSX.Element => {
  const [animationContent, setAnimationContent] = useState<any>();
  const lottieRef = useRef<DefaultLottieView>(null);
  
  const initializeContent = useCallback(async () => {
    if (props.source.uri) {
      try {
        const response = await fetch(props.source.uri);
        const data = await response.json();
        setAnimationContent(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setAnimationContent(props.source);
    }
  }, [setAnimationContent]);

  //Autoplay doesn't work properly on Android, so this just plays it manually
  useEffect(() => {
    if (props.autoPlay) {
      lottieRef.current?.play();
    }
  }, [animationContent]);

  useEffect(() => {
    initializeContent();
  }, [initializeContent]);

  return (
    <>
      {animationContent ? (
        <DefaultLottieView 
          {...props}
          ref={lottieRef}
          source={animationContent} />
      ) : (
        <View style={props.style} />
      )}
    </>
  );
};

export default LottieView;
