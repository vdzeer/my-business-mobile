export type ActionButtonProps = {
  iconName: string;
  onPress: () => void;
  size: 'small' | 'large';
  disabled?: boolean;
};
