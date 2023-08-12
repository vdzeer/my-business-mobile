import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
// import * as ImagePicker from 'react-native-image-picker';

import { ImageInputProps } from './types';
import { Icon } from '../Icon';
import { Divider } from '../Divider';
import ImageCropPicker from 'react-native-image-crop-picker';
import { image_url } from '../../store/config';
import { useTranslation } from 'react-i18next';

export const ImageInput: React.FC<ImageInputProps> = ({
  onSelect,
  imageUrl,
}) => {
  const { t } = useTranslation();
  const [image, setImage] = useState('');
  const onSelectPhoto = async () => {
    setTimeout(() => {
      ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(res => {
        onSelect({
          ...res,
          filename:
            Platform.OS === 'ios'
              ? res.filename
              : res.path.substring(res.path.lastIndexOf('/') + 1),
        });
        setImage(res.path);
      });
    }, 500);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.touchableWrapper}
        onPress={() => {
          onSelectPhoto();
        }}>
        <View
          style={[styles.iconWrapper, { padding: image || imageUrl ? 0 : 10 }]}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imageStyles} />
          ) : imageUrl ? (
            <Image
              source={{ uri: image_url + imageUrl }}
              style={styles.imageStyles}
            />
          ) : (
            <Icon name="addPhoto" />
          )}
        </View>
        <Divider width={15} />

        <Text style={styles.text}>
          {image || imageUrl ? t('changeImage') : t('attachImage')}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyles: { width: 40, height: 40, borderRadius: 30 },
  iconWrapper: {
    backgroundColor: '#D9F0FF',
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
  },
  text: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
    opacity: 0.4,
  },
  touchableWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
});
