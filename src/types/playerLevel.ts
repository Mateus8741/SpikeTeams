import { FontAwesome6 } from '@expo/vector-icons';

export interface PlayerLevelSelectorProps {
  level: number;
  onLevelChange: (level: number) => void;
}

export type AnimatedIconProps = React.ComponentProps<typeof FontAwesome6> & {
  style?: any;
};

export interface Level {
  icon: string;
  color: string;
  isFireIcon: boolean;
}
