import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ActionButton, Divider, Icon } from '../../../components';
import { WorkerCardProps } from './types';

export const WorkerCard = ({ name, image }: WorkerCardProps) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.contentWrapper}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 20,
            backgroundColor: 'black',
          }}></View>
        <Divider width={20} />
        <Text style={styles.cardText}>{name}</Text>
      </View>
      <View style={styles.contentWrapper2}>
        <Divider width={10} />
        <ActionButton onPress={() => {}} iconName="delete" size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '50%',
  },
  contentWrapper2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%',
  },
  cardText: { fontFamily: 'Montserrat', fontWeight: '500' },
  cardDesc: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 12,
    opacity: 0.4,
  },

  cardWrapper: {
    height: 60,
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
