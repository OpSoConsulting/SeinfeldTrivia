/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import screens from './src/containers';

type Screen = 'home' | 'quiz-controller' | 'end-quiz' | 'error' | 'settings' | 'gift';

interface Props {}
interface State {
  screen: Screen;
  props: any;
}

export type NavigationFunction = (screen: Screen, props: any) => void;

export default class App extends React.Component<Props, State>  {

  constructor(props: Props) {
    super(props);

    this.state = {
      screen: 'home',
      props: {
        questions: 10,
        correct: 8,
        longestStreak: 5,
      },
    }
  }

  navigate(screen: Screen, props: any) {
    this.setState({ screen, props });
  }

  render () {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        {
          (
            () => {
              switch (this.state.screen) {
                case 'home':
                  return <screens.Home 
                    navigate={(screen, props) => this.navigate(screen, props)}
                    {...this.state.props}
                  />;
                case 'quiz-controller':
                  return <screens.QuizController
                    navigate={(screen, props) => this.navigate(screen, props)}
                    {...this.state.props}
                  />
                case 'end-quiz':
                  return <screens.EndQuiz
                    navigate={(screen, props) => this.navigate(screen, props)}
                    {...this.state.props}
                  />
                case 'error':
                  return <screens.ErrorPage
                    navigate={(screen, props) => this.navigate(screen, props)}
                    {...this.state.props}
                  />
                case 'settings':
                  return <screens.Settings
                    navigate={(screen, props) => this.navigate(screen, props)}
                    {...this.state.props}
                  />
                case 'gift':
                  return <screens.GiftPage
                    navigate={(screen, props) => this.navigate(screen, props)}
                    {...this.state.props}
                  />


              }
            }
          )()
        }
      </>
    );

  }
};


