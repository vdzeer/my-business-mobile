import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const KeyboardAware: React.FC<any> = ({ children }) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      {children}
    </KeyboardAwareScrollView>
  );
};
