export interface UserData {
  name: string;
  age: string;
}

export type MessageType = 'text' | 'image' | 'audio' | 'video' | 'system';

export interface Message {
  id: string;
  sender: 'bot' | 'user' | 'system';
  type: MessageType;
  content?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  timestamp: Date;
}

export enum ChatStep {
  INTRO = 0,
  AUDIO_1 = 1,
  INTRO_REPORT = 2,
  ASK_NAME = 3,
  WAIT_NAME = 4,
  ASK_AGE = 5,
  WAIT_AGE = 6,
  EXPLAIN_AUDIO = 7,
  AUDIO_2 = 8,
  INDUSTRY_SECRET = 9,
  AUDIO_3 = 10,
  ASK_SYMPTOMS = 11,
  WAIT_SYMPTOMS = 12,
  EXPLAIN_SYMPTOMS = 13,
  ASK_CONTINUE = 14,
  WAIT_CONTINUE = 15,
  AUDIOS_SERIES_1 = 16, // 4 audios
  ASK_TREATMENT = 17,
  WAIT_TREATMENT = 18,
  CASES_INTRO = 19,
  CASES_MEDIA = 20,
  ASK_RESULTS = 21,
  WAIT_RESULTS = 22,
  EXPLAIN_PROTOCOL = 23,
  PROTOCOL_AUDIOS = 24, // 2 audios
  PROTOCOL_BENEFITS = 25,
  AUDIO_BENEFITS = 26,
  ASK_WANT_BENEFITS = 27,
  WAIT_WANT_BENEFITS = 28,
  CONGRATS_DECISION = 29,
  AUDIOS_SERIES_2 = 30, // 6 audios
  PROPOSAL_INTRO = 31,
  PROPOSAL_AUDIOS = 32, // 4 audios
  FINAL_CTA = 33,
}