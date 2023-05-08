import { Colors } from '../theme/Variables';

export const noHeader = {
  headerShown: false,
};

export const customHeader = (title: string) => ({
  headerTitle: title,
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  headerTintColor: Colors.white,
  animation: 'fade',
});
