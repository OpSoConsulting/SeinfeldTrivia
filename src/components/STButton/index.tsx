import React from 'react';
import { 
  Text, 
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import styles from './styles';


export interface Props extends ViewProps {
  handlePress: () => void;
  children?: any;
  color?: 'white' | 'yellow' | 'green' | 'red';
}

const STButton = (props: Props) => {

  let colorStyle = styles.yellow;

  switch (props.color) {
    case 'white':
      colorStyle = styles.white;
      break;
    case 'yellow':
      colorStyle = styles.yellow;
      break;
    case 'green':
      colorStyle = styles.green;
      break;
    case 'red':
      colorStyle = styles.red;
      break;
  }

  return (
    <TouchableOpacity 
      onPress={() => props.handlePress()}
      style={{
        ...styles.container,
        ...colorStyle,
      }}
    >
      {props.children}
    </TouchableOpacity>
  )
}

export default STButton;