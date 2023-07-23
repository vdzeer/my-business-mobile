import React, { useEffect, useRef } from 'react';
import { BottomSheetProps } from './types';
import { Icon } from '../Icon';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  children,
  snapPoints = ['50%'],
  onDismiss,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  useEffect(() => {
    open ? openBottomSheet() : closeBottomSheet();
  }, [open]);
  return (
    <>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onDismiss={onDismiss}
          handleIndicatorStyle={{ display: 'none' }}
          backgroundStyle={{ backgroundColor: '#A3D5FF' }}>
          <View style={styles.sheetContainer}>{children}</View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContainer: {
    padding: 16,
    backgroundColor: '#A3D5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
