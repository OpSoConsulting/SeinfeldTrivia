/* tslint:disable:max-line-length */
import React from 'react';
import { View, SafeAreaView, Text, Image, Switch, ActivityIndicator, ScrollView } from 'react-native';
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
  topics: string[];
  excludedTopics: string[]
}

class Settings extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      kidsMode: topicsService.getKidsMode(),
      topics: [],
      excludedTopics: [],
    };

    this.toggleKidsMode = this.toggleKidsMode.bind(this);
  }

  async componentDidMount() {
    const topics = await topicsService.getAllTopics();
    const excludedTopics = await topicsService.getExcludedTopics();

    this.setState({
      topics,
      excludedTopics,
    })
  }

  toggleKidsMode() {
    topicsService.toggleKidsMode();

    this.setState({
      kidsMode: topicsService.getKidsMode(),
    })
  }

  toggleTopic(topic: string) {
    const {
      topics,
      excludedTopics,
    } = this.state;

    if (excludedTopics.includes(topic)) {
      // topic is currently excluded, remove it from list
      topicsService.removeExcludedTopic(topic);
      this.setState({ excludedTopics: excludedTopics.filter(t => t !== topic) })
    } else {
      topicsService.addExcludedTopic(topic);
      this.setState({ excludedTopics: [...excludedTopics, topic ]});
    }
  }

  public render() {

    const {
      topics,
      excludedTopics,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.padding}>
          <ScrollView style={styles.scrollView}>
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
            <Text style={styles.header}>
              Topics
            </Text>
            {
              (topics.length === 0) ? (
                <View>
                  <Text style={styles.loadingText}>
                    Loading Topics
                  </Text>
                  <ActivityIndicator />
                </View>
              ) : (
                <View style={styles.topicsContainer}>
                  {
                    topics.filter(t => t !== 'kids').map(t => (
                      <View 
                        style={styles.topicsRow}
                        key={t}
                      >
                        <View style={styles.topicTextContainer}>
                          <Text 
                            style={styles.topicText}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {t}
                          </Text>
                        </View>
                        <View style={styles.topicSwitchContainer}>
                          <Switch 
                            value={!excludedTopics.includes(t)}
                            onValueChange={() => this.toggleTopic(t)}
                          />
                        </View>
                      </View>
                    ))
                  }
                </View>
              )
            }
            <View style={styles.imageContainer}>
              <Image
                source={assets.christmasWreath}
                style={styles.homeImage}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <STTextButton
              handlePress={() => this.props.navigate('home', {})}
              size="large"
            >
              Main Menu
            </STTextButton>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Settings;
