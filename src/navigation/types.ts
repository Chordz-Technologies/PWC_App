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
  Login: undefined;
  Home: undefined;
  Events: undefined;
  EventRegister: {
  event: EventItem;
  };
  Profile: undefined;
  Reference: undefined;
  Schedule: undefined;
  AddRef: undefined;
  ScheduleNewMeeting: undefined;
};