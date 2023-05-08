import { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Detail: { storeId: string };
  Home: undefined;
  Main: undefined;
  Error: undefined;
  OrderError: undefined;
  Maps: { storeId: string };
  Welcome: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
