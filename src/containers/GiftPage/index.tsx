/* tslint:disable:max-line-length */
import React from 'react';
import { View, SafeAreaView, Text, Image, Platform, EmitterSubscription, ScrollView } from 'react-native';
import styles from './styles';
import assets from './assets';
import STTextButton from '../../components/CTTextButton';
import { NavigationFunction } from '../../../App';
import RNIap, * as RNIapOther from 'react-native-iap';
import constants from '../../constants';
import * as giftService from '../../services/gift';


interface Props  {
  navigate: NavigationFunction;
}

interface State {
  products: RNIapOther.Product[];
  giftsMade: string[];
}


class GiftPage extends React.Component<Props, State> {
  purchaseUpdateSubscription: null | EmitterSubscription = null
  purchaseErrorSubscription: null | EmitterSubscription = null

  constructor(props: any) {
    super(props);

    this.state = {
      products: [],
      giftsMade: [],
    };
  }

  async componentDidMount() {

    const giftsMade = await giftService.getGiftsMade();
    this.setState({ giftsMade });

    try {
      const products: RNIapOther.Product[] = await RNIap.getProducts([constants.ONE_DOLLAR_GIFT_PRODUCT_ID]);
      this.setState({ products });
    } catch(err) {
      console.warn(err); // standardized err.code and err.message available
    }

    this.purchaseUpdateSubscription = RNIapOther
      .purchaseUpdatedListener(async (purchase: RNIapOther.InAppPurchase | RNIapOther.SubscriptionPurchase | any ) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        await giftService.addGiftMade(constants.ONE_DOLLAR_GIFT_PRODUCT_ID);
        this.setState({ giftsMade: [constants.ONE_DOLLAR_GIFT_PRODUCT_ID] })

        // Tell the store that you have delivered what has been paid for.
        // Failure to do this will result in the purchase being refunded on Android and
        // the purchase event will reappear on every relaunch of the app until you succeed
        // in doing the below. It will also be impossible for the user to purchase consumables
        // again until you do this.
        if (Platform.OS === 'ios') {
          RNIap.finishTransactionIOS(purchase.transactionId);
        } else if (Platform.OS === 'android') {
          // If consumable (can be purchased again)
          // RNIap.consumePurchaseAndroid(purchase.purchaseToken);
          // If not consumable
          // RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
        }

          // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
          RNIap.finishTransaction(purchase);
      } else {
        // Retry / conclude the purchase is fraudulent, etc...
      }
    });

    this.purchaseErrorSubscription = RNIapOther.purchaseErrorListener((error: RNIapOther.PurchaseError) => {
      console.warn('purchaseErrorListener', error);
    });
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  requestPurchase = async (sku: string) => {
    try {
      await RNIap.requestPurchase(sku, false);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  public render() {

    const {
      giftsMade,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View 
          style={styles.padding}
        >
          {
            giftsMade.length > 0 ? (
              <Text style={styles.header}>
                Thanks for helping!
              </Text>
            ) : (
              <Text style={styles.header}>
                Help keep Christmas Trivia free!
              </Text>

            )
          }
          <View style={styles.imageContainer}>
            <Image
              source={assets.gift}
              style={styles.homeImage}
            />
          </View>
          {
            giftsMade.length > 0 ? (
              <Text style={styles.subheader}>
                We appreciate your gift. It helps keep Christmas Trivia free.
              </Text>
            ) : (
              <Text style={styles.subheader}>
                Make a gift to help keep Christmas Trivia running and free for all.
              </Text>
            )
          }
          <View style={styles.padder} />
          <View style={styles.buttonContainer}>
            <STTextButton
              handlePress={() => this.props.navigate('home', {})}
              size="small"
              color="white"
            >
              Main Menu
            </STTextButton>
          </View>
          {
            giftsMade.length === 0 && (
              <View style={styles.buttonContainer}>
                <STTextButton
                  handlePress={() => this.requestPurchase(constants.ONE_DOLLAR_GIFT_PRODUCT_ID)}
                  size="large"
                >
                  Gift $1
                </STTextButton>
              </View>
            )
          }
        </View>
      </SafeAreaView>
    );
  }
}

export default GiftPage;
