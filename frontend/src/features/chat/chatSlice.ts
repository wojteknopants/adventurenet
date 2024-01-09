import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ChatMessage {
  id: number;
  user: any;
  sender: any;
  sender_profile: any;
  reciever: any;
  reciever_profile: any;
  message: string;
  is_read: boolean;
  date: Date;
}

export interface MessagePayload {
  user: number;
  sender: number;
  reciever: number;
  message: string;
}

export const getUserMessages = createAsyncThunk(
  "my-messages/",
  async (loggedUserId: number) => {
    const url = `/my-messages/${loggedUserId}/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
      config
    );
    return response.data.map((message: any) => ({
      ...message,
      date: new Date(message?.date),
    }));
  }
);

export const getConversationMessages = createAsyncThunk(
  "conversation/",
  async ({
    receiverId,
    senderId,
  }: {
    receiverId: number;
    senderId: number;
  }) => {
    const url = `/get-messages/${senderId}/${receiverId}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
      config
    );
    return response.data.map((message: any) => ({
      ...message,
      date: new Date(message?.date),
    }));
  }
);

export const sendMessage = createAsyncThunk(
  "send-message/",
  async (payload: MessagePayload) => {
    const url = `/send-messages/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
      payload,
      config
    );
    return response.data;
  }
);

export const searchUser = createAsyncThunk(
  "search-user/",
  async (username: string) => {
    const url = `/search/${username}/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
      config
    );
    return response.data;
  }
);

export const getUserProfileDetails = createAsyncThunk(
  "search-user/",
  async (userId: number) => {
    const url = `/profile/${userId}/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}${url}`,
      config
    );
    return response.data;
  }
);
