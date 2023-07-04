export type ButtonProps = {
  text: string;
  onPress: () => void;
  withIcon?: boolean;
  mode?: 'small' | 'large' | 'lite';
};
