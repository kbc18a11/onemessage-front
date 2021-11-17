// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from '@/environments/environment';

const firebaseConfig = {
  apiKey: environment.FREA_BASE_APIKEY,
  authDomain: environment.FREA_BASE_AUTH_DOMAIN,
  projectId: environment.FREA_BASE_PROJECT_ID,
  messagingSenderId: environment.FREA_BASE_MESSAGING_SENDER_ID,
  appId: environment.FREA_BASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
