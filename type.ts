import admin from "firebase-admin";
import { FieldValue } from "firebase/firestore";

export interface Message {
  text: string;
  createdAt: admin.firestore.Timestamp | FieldValue;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
