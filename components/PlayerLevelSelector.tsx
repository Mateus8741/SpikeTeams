import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

interface PlayerLevelSelectorProps {
  level: number;
  onLevelChange: (level: number) => void;
}

export function PlayerLevelSelector({ level, onLevelChange }: Readonly<PlayerLevelSelectorProps>) {
  const levels = [
    { icon: 'volleyball', color: '#9CA3AF' },
    { icon: 'volleyball', color: '#60A5FA' },
    { icon: 'volleyball', color: '#34D399' },
    { icon: 'fire', color: '#F87171' },
  ];

  const handlePress = (index: number) => {
    if (level === index + 1) {
      onLevelChange(0);
    } else {
      onLevelChange(index + 1);
    }
  };

  return (
    <View className="flex-row gap-2">
      {levels.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => handlePress(index)}
          className={`rounded-full p-1 ${level === index + 1 ? 'bg-gray-100' : ''}`}>
          <FontAwesome6
            name={item.icon as any}
            size={20}
            color={level >= index + 1 ? item.color : '#E5E7EB'}
          />
        </Pressable>
      ))}
    </View>
  );
}
