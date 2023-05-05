import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type HomeParamsList = {
  Home: undefined;
};

export type ApplicationStackParamList = {
  Home: NavigatorScreenParams<null>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
