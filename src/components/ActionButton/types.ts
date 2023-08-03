export type ActionButtonProps = {
  iconName: string;
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;

  size: 'small' | 'large';
  disabled?: boolean;
};
