import { Text, View } from 'react-native';

import { type RootStackScreenProps } from '@/navigation/types';

type Props = RootStackScreenProps<'Login'>;

export function LoginScreen(_props: Props) {
  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
}
