import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MapParamsList = {
  Map: string;
};

export type ApplicationStackParamList = {
  Home: NavigatorScreenParams<null>;
  Map: NavigatorScreenParams<MapParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
