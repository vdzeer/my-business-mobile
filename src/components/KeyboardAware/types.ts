import { TextInputProps } from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'onChangeText'> {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onChange?: (text: string) => void;
  inBottomSheet?: boolean;
}
