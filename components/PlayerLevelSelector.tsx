import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

interface PlayerLevelSelectorProps {
  level: number;
  onLevelChange: (level: number) => void;
}

export function PlayerLevelSelector({ level, onLevelChange }: Readonly<PlayerLevelSelectorProps>) {
  const levels = [
    { icon: 'volleyball', color: '#9CA3AF' }, // Bola normal - Nível 1
    { icon: 'volleyball', color: '#60A5FA' }, // Bola azul - Nível 2
    { icon: 'volleyball', color: '#34D399' }, // Bola verde - Nível 3
    { icon: 'fire', color: '#F87171' }, // Bola em chamas - Nível 4
  ];

  return (
    <View className="flex-row gap-2">
      {levels.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => onLevelChange(index + 1)}
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
