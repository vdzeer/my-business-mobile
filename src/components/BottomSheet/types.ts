export type BottomSheetProps = {
  open: boolean;
  children?: any;
  snapPoints?: Array<string>;
  onDismiss?: () => void;
};
