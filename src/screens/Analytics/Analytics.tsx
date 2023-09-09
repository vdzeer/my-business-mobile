import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  ActionButton,
  BottomSheet,
  Button,
  Divider,
  Header,
  Icon,
  ImageInput,
  Input,
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { AnalyticsProps } from './types';
import { getAnalyticts } from '../../store/api';
import { useSelector } from 'react-redux';
import { BarChart, StackedBarChart } from 'react-native-chart-kit';
import i18next from 'i18next';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

export const Analytics: React.FC<AnalyticsProps> = () => {
  const { t } = useTranslation();
  const { currentBusiness } = useSelector((store: any) => store.business);
  const currentLanguage = i18n.language;

  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date().toISOString());

  const dates = [
    { eng: 'SU', ru: 'ВС', uk: 'НД' },
    { eng: 'MO', ru: 'ПН', uk: 'ПН' },
    { eng: 'TU', ru: 'ВТ', uk: 'ВТ' },
    { eng: 'WE', ru: 'СР', uk: 'СР' },
    { eng: 'TH', ru: 'ЧТ', uk: 'ЧТ' },
    { eng: 'FR', ru: 'ПТ', uk: 'ПТ' },
    { eng: 'SA', ru: 'СБ', uk: 'СБ' },
  ];

  useEffect(() => {
    getAnalyticts(date, currentBusiness?.id ?? '').then(data => {
      const parsedData = Object.entries(data.data.data);

      const newData = parsedData.map(el => ({
        date: el[0],
        self: el[1]?.self ?? 0,
        total: el[1]?.total ?? 0,
      }));

      setData(newData);
    });
  }, [currentBusiness, date]);

  const self = {
    labels: data.map(el => dates[new Date(el.date).getDay()][currentLanguage]),
    datasets: [
      {
        data: data.map(el => el?.self ?? 0),
      },
    ],
  };

  const total = {
    labels: data.map(el => dates[new Date(el.date).getDay()][currentLanguage]),
    datasets: [
      {
        data: data.map(el => el?.total ?? 0),
      },
    ],
  };

  console.log(self, total.datasets);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header />
        <Divider height={20} />
        <View style={styles.headerWrapper}>
          <Text style={styles.titleText}>{t('analytic')}</Text>
        </View>
        <Divider height={50} />

        <Text style={styles.headingText}>{t('analyticInc')}</Text>

        {total.labels?.length ? (
          <BarChart
            data={total}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel={currentBusiness?.currency ?? ''}
            chartConfig={{
              backgroundColor: '#D9F0FF',
              backgroundGradientFrom: '#D9F0FF',
              backgroundGradientTo: '#D9F0FF',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text style={styles.noText}>{t('noData')}</Text>
        )}

        <Divider height={30} />

        <Text style={styles.headingText}>{t('analyticCon')}</Text>

        {self.labels?.length ? (
          <BarChart
            yAxisSuffix=""
            data={self}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel={currentBusiness?.currency ?? ''}
            chartConfig={{
              backgroundColor: '#D9F0FF',
              backgroundGradientFrom: '#D9F0FF',
              backgroundGradientTo: '#D9F0FF',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text style={styles.noText}>{t('noData')}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  area: { flex: 1 },
  container: { paddingHorizontal: 15 },

  list: {
    marginTop: 20,
    height: '77%',
  },

  titleText: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',

    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
    width: '80%',
  },

  headingText: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    width: '80%',
  },

  noText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    width: '80%',
  },
});
