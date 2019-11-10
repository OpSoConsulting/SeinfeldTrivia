import React from 'react';
import { 
  Text, 
  TouchableOpacity,
  ViewProps,
  View,
} from 'react-native';
import styles from './styles';
import STButton, { Props as STButtonProps } from '../STButton';


interface Props extends STButtonProps {
  handlePress: () => void;
  children?: any;
  size?: 'small' | 'medium' | 'large';
}

export default function STTextButton(props: Props) {

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
      <STButton
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
      </STButton>
    </View>
  )
}
