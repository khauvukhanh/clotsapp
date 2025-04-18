import { CommonActions, NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';

class NavigationService {
  private static navigationRef: NavigationContainerRef<RootStackParamList> | null = null;

  static setNavigationRef(ref: NavigationContainerRef<RootStackParamList> | null) {
    this.navigationRef = ref;
  }

  static navigateToLogin() {
    if (this.navigationRef) {
      this.navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        })
      );
    }
  }

  static navigateToHome() {
    if (this.navigationRef) {
      this.navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        })
      );
    }
  }

  static navigateToOrder() {
    if (this.navigationRef) {
      this.navigationRef.dispatch(
        CommonActions.navigate({
          name: 'Main',
          params: {
            screen: 'MainTabs',
            params: {
              screen: 'Order',
            },
          },
        })
      );
    }
  }

  static navigateToProfile() {
    if (this.navigationRef) {
      this.navigationRef.dispatch(
        CommonActions.navigate({
          name: 'Main',
          params: {
            screen: 'MainTabs',
            params: {
              screen: 'Profile',
            },
          },
        })
      );
    }
  }

  static navigateToCart() {
    if (this.navigationRef) {
      this.navigationRef.dispatch(
        CommonActions.navigate({
          name: 'Main',
          params: {
            screen: 'MainTabs',
            params: {
              screen: 'HomeStack',
              params: {
                screen: 'Cart',
              },
            },
          },
        })
      );
    }
  }

  static goBack() {
    if (this.navigationRef) {
      this.navigationRef.dispatch(CommonActions.goBack());
    }
  }
}

export default NavigationService; 