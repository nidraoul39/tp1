import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { GlobalStyles } from '../assets/global_style'; 

interface TextMainProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  label?: string;
  unit?: string;
}

export default function TextMain({ children, style, label = '', unit = '' }: TextMainProps) {
  return (
    <Text style={[GlobalStyles.globalText, style]}>
      {label}{children}{unit}
    </Text>
  );
}