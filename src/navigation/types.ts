import { type CompositeScreenProps, type NavigatorScreenParams } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root stack routes and their params.
 *
 * Every screen in the root navigator must be declared here. Params are
 * strongly typed at both `navigation.navigate(...)` and `route.params`
 * call sites.
 *
 * Keep screens param-less (`undefined`) unless they genuinely need input.
 * Prefer reading state from context or a data layer over route params.
 */
export type RootStackParamList = {
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: undefined;
};

/* -------------------------------------------------------------------------- */
/*  Modules                                                                   */
/* -------------------------------------------------------------------------- */

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  CompleteProfile: { userId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Mall: undefined;
  Wishlist: undefined;
  Orders: undefined;
  Profile: undefined;
};

/* -------------------------------------------------------------------------- */
/*  Screen-prop helpers                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Convenience alias for a screen component's props.
 *
 * @example
 * type Props = RootStackScreenProps<'Login'>;
 * export function LoginScreen({ navigation }: Props) { ... }
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type MainTabKey = keyof MainTabParamList;

/**
 * Use when an auth screen needs to reach a **root** route as well
 * (e.g. `CompleteProfile` calls `navigation.replace('Main')`).
 */
export type AuthStackCompositeScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<AuthStackScreenProps<T>, RootStackScreenProps<'Auth'>>;

/**
 * Module augmentation — makes `useNavigation()` and `useRoute()`
 * infer the correct param types without explicit generics.
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
