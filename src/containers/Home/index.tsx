/* tslint:disable:max-line-length */
import React from 'react';
import { View, SafeAreaView, Text, Image } from 'react-native';
import styles from './styles';
import assets from './assets';
import STButton from '../../components/STButton';
import STTextButton from '../../components/STTextButton';
import { NavigationFunction } from '../../../App';


interface Props  {
  navigate: NavigationFunction;
}

interface State {
}

class Home extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  public render() {

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headline}>
          Seinfeld {'\n'} Trivia
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={assets.festivusPole}
            style={styles.festivusPole}
          />
        </View>
        <View style={styles.buttonContainer}>
          <STTextButton
            handlePress={() => this.props.navigate('quiz-controller', {})}
            size="large"
          >
            Play Now
          </STTextButton>
        </View>
        <View style={styles.bottomPadder} />
      </SafeAreaView>
    );
  }
}

export default Home;
