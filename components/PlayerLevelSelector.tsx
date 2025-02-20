import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface PlayerLevelSelectorProps {
  level: number;
  onLevelChange: (level: number) => void;
}

type AnimatedIconProps = React.ComponentProps<typeof FontAwesome6> & {
  style?: any;
};

const AnimatedIcon = Animated.createAnimatedComponent<AnimatedIconProps>(FontAwesome6);

export function PlayerLevelSelector({ level, onLevelChange }: Readonly<PlayerLevelSelectorProps>) {
  const levels = [
    { icon: 'volleyball', color: '#9CA3AF', isFireIcon: false },
    { icon: 'volleyball', color: '#60A5FA', isFireIcon: false },
    { icon: 'volleyball', color: '#34D399', isFireIcon: false },
    { icon: 'fire', color: '#F87171', isFireIcon: true },
  ];

  const rotations = [useSharedValue(0), useSharedValue(0), useSharedValue(0), useSharedValue(0)];
  const fireScale = useSharedValue(1);

  const volleyballStyle0 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotations[0].value}deg` }],
  }));
  const volleyballStyle1 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotations[1].value}deg` }],
  }));
  const volleyballStyle2 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotations[2].value}deg` }],
  }));
  const fireStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fireScale.value }],
  }));

  const animatedStyles = [volleyballStyle0, volleyballStyle1, volleyballStyle2, fireStyle];

  const handlePress = (index: number) => {
    if (!levels[index].isFireIcon) {
      rotations[index].value = withSequence(
        withTiming(360, {
          duration: 600,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        withTiming(0, { duration: 0 })
      );
    }

    if (level === index + 1) {
      onLevelChange(0);
    } else {
      onLevelChange(index + 1);
    }
  };

  useEffect(() => {
    if (level === 4) {
      fireScale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        true
      );
    } else {
      fireScale.value = 1;
    }
  }, [level, fireScale]);

  return (
    <View className="flex-row gap-2">
      {levels.map((item, index) => {
        return (
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
        );
      })}
    </View>
  );
}
