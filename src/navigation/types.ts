import { ImageSourcePropType } from 'react-native';

export type EventItem = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  date: string;
  time: string;
  location: string;
  fee: number;
  prize: string;
  prizeLabel: string;
  about: string;
  rules: string[];
  note: string;
};

export type RootStackParamList = {
  SpalshScreen:undefined;
  Login: undefined;
  Home: undefined;
  Register:undefined;
  Events: undefined;
  EventRegister: {
  event: EventItem;
  };
  RegistrationSuccess:{event:EventItem};
  Profile: undefined;
  Reference: undefined;
  Schedule: undefined;
  AddRef: undefined;
  NewMeetingScreen: undefined;

};