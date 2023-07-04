import React from 'react';
import * as Icons from './assets';

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Icon = ({ name }: { name: string }) => {
  // @ts-ignore
  const Icon = Icons?.[capitalizeFirstLetter?.(name)] ?? <></>;

  return <Icon width={'100%'} height={'100%'} />;
};
