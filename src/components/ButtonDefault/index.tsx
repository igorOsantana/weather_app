import React, { ReactNode } from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text } from 'react-native';

import { styles } from './styles';

type Props = RectButtonProps & {
  children: ReactNode;
};

export const ButtonDefault = ({ children, ...rest }: Props) => {
  return (
    <RectButton {...rest} style={styles.container}>
      <Text style={styles.textButton}>{children}</Text>
    </RectButton>
  );
};
