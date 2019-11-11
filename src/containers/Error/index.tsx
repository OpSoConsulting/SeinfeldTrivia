/* tslint:disable:max-line-length */
import React from 'react';
import { View, SafeAreaView, Text, Image } from 'react-native';
import styles from './styles';
import assets from './assets';
import STTextButton from '../../components/CTTextButton';
import { NavigationFunction } from '../../../App';


interface Props  {
  navigate: NavigationFunction;
}

interface State {
}

class ErrorPage extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  public render() {

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.padding}>
          <Text style={styles.header}>
            Oh no! We have an Error.
          </Text>
          <Text style={styles.subheader}>
            The issue has been reported to our team of engineers. For any questions, please email xmastrivia@gmail.com
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={assets.surprisedGingerbreadMan}
              style={styles.homeImage}
            />
          </View>
          <View style={styles.buttonContainer}>
            <STTextButton
              handlePress={() => this.props.navigate('home', {})}
              size="large"
            >
              Main Menu
            </STTextButton>
          </View>
          <View style={styles.bottomPadder} />
        </View>
      </SafeAreaView>
    );
  }
}

export default ErrorPage;
