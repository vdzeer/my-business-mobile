import DropDownPicker from 'react-native-dropdown-picker';

import { StyleSheet, TextInput } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { LanguagePickerProps } from './types';
import { useSelector } from 'react-redux';

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  language,
  onChangeLanguage,
}) => {
  const { profile } = useSelector((store: any) => store.auth);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(profile?.language ?? language ?? null);
  const [items, setItems] = useState([
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
    { label: 'Українська', value: 'uk' },
  ]);
  return (
    <>
      <DropDownPicker
        open={open}
        listMode="SCROLLVIEW"
        showArrowIcon={false}
        style={{ backgroundColor: '#D9F0FF', borderWidth: 0 }}
        textStyle={{ fontFamily: 'Montserrat', paddingLeft: 10 }}
        listItemContainerStyle={{ backgroundColor: '#D9F0FF', borderWidth: 0 }}
        dropDownContainerStyle={{ borderWidth: 0 }}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={val => {
          setValue(val);
          onChangeLanguage(val);
        }}
        setItems={setItems}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    fontFamily: 'Montserrat',
    paddingLeft: 20,
  },
});
