import React from 'react';
import { 
  Text, 
  View,
} from 'react-native';
import styles from './styles';
import CTButton, { Props as CTButtonProps } from '../CTButton';


interface Props extends CTButtonProps {
  handlePress: () => void;
  children?: any;
  size?: 'small' | 'medium' | 'large';
}

export default function CTTextButton(props: Props) {

  let buttonSizeStyle = {};
  let textSizeStyle = {};
  let textColorStyle = {};

  switch (props.size) {
    case 'large':
      buttonSizeStyle = styles.largeButton;
      textSizeStyle = styles.largeText;
      break;
    case 'medium':
      buttonSizeStyle = styles.mediumButton;
      textSizeStyle = styles.mediumText;
      break;
    case 'small':
      buttonSizeStyle = styles.smallButton;
      textSizeStyle = styles.smallText;
      break;
  }

  switch (props.color) {
    case 'green':
    case 'red':
      textColorStyle = styles.whiteText;
      break;
    case 'white':
      textColorStyle = styles.blackText;
      break;
  }


  return (
    <View
      style={{
        ...buttonSizeStyle,
        ...styles.container,
      }}
    >
      <CTButton
        handlePress={props.handlePress}
        color={props.color}
      >
        <Text style={{
          ...styles.text,
          ...textSizeStyle,
          ...textColorStyle,
        }}>
          {props.children}
        </Text>
      </CTButton>
    </View>
  )
}
