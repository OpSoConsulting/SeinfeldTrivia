/* tslint:disable:max-line-length */
import React from 'react';
import { View, SafeAreaView, Text, Image, Button, Linking } from 'react-native';
import styles from './styles';
import assets from './assets';
import STTextButton from '../../components/CTTextButton';
import { NavigationFunction } from '../../../App';
import constants from '../../constants';


interface Props  {
  navigate: NavigationFunction;
}

interface State {
}

class Home extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {};

    this.rate = this.rate.bind(this);
  }

  async rate() {
    try {
      await Linking.openURL(`itms-apps://itunes.apple.com/us/app/id${constants.APP_STORE_LINK_ID}?mt=8`)
    } catch (err) {
      this.props.navigate('error', {});
    }
  }

  public render() {

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.padding}>
          <Text style={styles.headline}>
            Christmas {'\n'} Trivia
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={assets.christmasStocking}
              style={styles.homeImage}
            />
          </View>
          <View style={styles.buttonContainer}>
            <STTextButton
              handlePress={this.rate}
              size="small"
              color="white"
            >
              Rate Us!
            </STTextButton>
          </View>
          <View style={styles.buttonContainer}>
            <STTextButton
              handlePress={() => this.props.navigate('quiz-controller', {})}
              size="large"
            >
              Play Now
            </STTextButton>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
