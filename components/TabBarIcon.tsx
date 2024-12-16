import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { StyleSheet } from 'react-native';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  return <FontAwesome size={24} style={styles.tabBarIcon} {...props} />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    paddingBottom: 10,
  },
});
