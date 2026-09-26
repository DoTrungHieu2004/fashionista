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
  Login: undefined;
};

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

/**
 * Module augmentation — makes `useNavigation()` and `useRoute()`
 * infer the correct param types without explicit generics.
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
