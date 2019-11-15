/* tslint:disable:max-line-length */
import React from 'react';
import { View, SafeAreaView, Text, Image, Switch } from 'react-native';
import styles from './styles';
import assets from './assets';
import STTextButton from '../../components/CTTextButton';
import { NavigationFunction } from '../../../App';
import * as topicsService from '../../services/topics';


interface Props  {
  navigate: NavigationFunction;
}

interface State {
  kidsMode: boolean;
}

class Settings extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      kidsMode: topicsService.getKidsMode(),
    };

    this.toggleKidsMode = this.toggleKidsMode.bind(this);
  }

  toggleKidsMode() {
    topicsService.toggleKidsMode();

    this.setState({
      kidsMode: topicsService.getKidsMode(),
    })
  }

  public render() {

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.padding}>
          <Text style={styles.header}>
            Settings
          </Text>
          <View style={styles.kidsModeRow}>
            <Text style={styles.kidsText}>
              Kids Mode
            </Text>
            <View style={styles.padder} />
            <Switch 
              value={topicsService.getKidsMode()}
              onValueChange={this.toggleKidsMode}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={assets.christmasWreath}
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

export default Settings;
