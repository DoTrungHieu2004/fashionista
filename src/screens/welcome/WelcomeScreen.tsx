import { Text, View } from 'react-native';

import { type RootStackScreenProps } from '@/navigation/types';

type Props = RootStackScreenProps<'Welcome'>;

export function WelcomeScreen(_props: Props) {
  return (
    <View>
      <Text>Welcome Screen</Text>
    </View>
  );
}
