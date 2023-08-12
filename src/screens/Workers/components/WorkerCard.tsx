import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { ActionButton, Divider, Icon } from '../../../components';
import { WorkerCardProps } from './types';
import { image_url } from '../../../store/config';

export const WorkerCard = ({ name, email, onDelete }: WorkerCardProps) => {
  return (
    <View style={styles.cardWrapper}>
      <Divider width={20} />

      <View style={styles.contentWrapper}>
        <Text style={styles.cardText}>{name}</Text>
        <Divider height={10} />

        <Text style={styles.cardDesc}>{email}</Text>
      </View>
      <View style={styles.contentWrapper2}>
        <Divider width={10} />
        <ActionButton onPress={onDelete} iconName="delete" size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#6F73D2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  contentWrapper: {
    width: '70%',
  },
  contentWrapper2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
  },
  cardText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',
    fontWeight: '500',
  },
  cardDesc: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontWeight: '500',
    fontSize: 12,
    opacity: 0.4,
    width: '100%',
  },

  cardWrapper: {
    height: 80,
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
});
