import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { cancelAnimation, useSharedValue } from 'react-native-reanimated';

import { useFireStyle, useVolleyballStyle } from '@/animations/styles/playerLevel';
import { handleFireAnimation, handleRotationAnimation, levels } from '@/functions/playerLevel';
import { AnimatedIconProps, PlayerLevelSelectorProps } from '@/types/playerLevel';

const AnimatedIcon = Animated.createAnimatedComponent<AnimatedIconProps>(FontAwesome6);

export function PlayerLevelSelector({ level, onLevelChange }: Readonly<PlayerLevelSelectorProps>) {
  const rotations = [useSharedValue(0), useSharedValue(0), useSharedValue(0), useSharedValue(0)];
  const fireScale = useSharedValue(1);

  const volleyballStyle0 = useVolleyballStyle(rotations[0]);
  const volleyballStyle1 = useVolleyballStyle(rotations[1]);
  const volleyballStyle2 = useVolleyballStyle(rotations[2]);
  const fireStyle = useFireStyle(fireScale);

  const animatedStyles = [volleyballStyle0, volleyballStyle1, volleyballStyle2, fireStyle];

  const handlePress = (index: number) => {
    if (!levels[index].isFireIcon) {
      handleRotationAnimation(rotations[index]);
    }

    if (level === index + 1) {
      onLevelChange(0);
    } else {
      onLevelChange(index + 1);
    }
  };

  useEffect(() => {
    handleFireAnimation(fireScale, level);
    return () => cancelAnimation(fireScale);
  }, [level]);

  return (
    <View className="flex-row gap-2">
      {levels.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => handlePress(index)}
          className={`rounded-full p-1 ${level === index + 1 ? 'bg-gray-100' : ''}`}>
          <AnimatedIcon
            name={item.icon as any}
            size={20}
            color={level >= index + 1 ? item.color : '#E5E7EB'}
            style={animatedStyles[index]}
          />
        </Pressable>
      ))}
    </View>
  );
}
