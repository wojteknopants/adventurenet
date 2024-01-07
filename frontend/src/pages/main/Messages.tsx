import PageTitle from "../../components/PageTitle";
import {loadUser} from "../../features/auth/authSlice";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {
  ChatMessage,
  getConversationMessages,
  getUserMessages, getUserProfileDetails,
  MessagePayload,
  sendMessage
} from "../../features/chat/chatSlice";
import {profilePlaceholder} from "../../assets";
import {useLocation, useNavigate} from "react-router-dom";

function useInterval(callback: any, delay: number) {
  const savedCallback = useRef<any>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && delay !== undefined) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      }
    }
  });
}

export const isNil = (value: any): boolean => {
    return value === null || value === undefined;
  }

const Messages = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [loggedUser, setUser] = useState<any>(null);
  const [loggedUserDetails, setLoggedUserDetails] = useState<null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatMessage | null>(null);
  const [selectedConversationMessages, setSelectedConversationMessages] = useState<ChatMessage[]>([]);
  const [typedMessage, setTypedMessage] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  useInterval(async () => {
    if (isNil(selectedConversation)) {
      return;
    }
    const updatedConversation = await dispatch(getConversationMessages(determineSenderAndReceiver(selectedConversation!)));
    setSelectedConversationMessages(updatedConversation.payload);
  }, 15000);
  useInterval(async () => {
    if (isNil(loggedUser)) {
      return;
    }
    const inbox = await dispatch(getUserMessages(loggedUser.id));
    const newMessageIndex = messages.findIndex(msg => msg.id === 0);
    if (newMessageIndex === -1) {
      setMessages(inbox.payload);
    } else {
      setMessages([messages[newMessageIndex], ...inbox.payload]);
    }
  }, 15000)

  useEffect(() => {
    dispatch(loadUser()).then(async (user) => {
      setUser(user.payload);
      const loggedUserDetails = await dispatch(getUserProfileDetails(user.payload.id));
      setLoggedUserDetails(loggedUserDetails.payload);
      const messages = await dispatch(getUserMessages(user.payload.id))
      let conversations = messages.payload;
      if (!isNil(location.state?.user)) {
          const newMessage = getNewMessage(loggedUserDetails.payload, conversations);
          conversations = [newMessage, ...conversations.filter(conversation => conversation.id !== newMessage.id)];
          setSelectedConversation(newMessage);
          if (newMessage.id !== 0) {
            const convMessages = await dispatch(getConversationMessages(({receiverId: user.payload.id, senderId: location.state.user.user})));
            setSelectedConversationMessages(convMessages.payload);
          }
      }
      setMessages(conversations);
      navigate(location.pathname, {});
    })
  }, []);

  const getNewMessage = (loggedUserDetails: any, existingConversations: ChatMessage[]): ChatMessage => {
    const targetUser = location.state.user;
    const conversationWithTargetPerson = existingConversations.find(conversation => conversation.sender === targetUser.user
        || conversation.reciever === targetUser.user);
    if (!isNil(conversationWithTargetPerson)) {
      return conversationWithTargetPerson!;
    }
    const newMessage: ChatMessage = {
      id: 0,
      user: loggedUserDetails.user,
      sender: loggedUserDetails.user,
      sender_profile: loggedUserDetails,
      reciever: targetUser.user,
      reciever_profile: targetUser,
      message: '[DRAFT]',
      is_read: true,
      date: new Date()
    }
    return newMessage;
  }

  const isToday = (dateToCompare: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareCopy = new Date(dateToCompare);
    compareCopy.setHours(0,0,0, 0);
    return compareCopy.getTime() === today.getTime();
  }

  const determineSenderAndReceiver = (message: ChatMessage): {senderId: number, receiverId: number} => {
    if (message?.sender === loggedUser?.id) {
      return {receiverId: loggedUser?.id, senderId: message?.reciever};
    }
    return {receiverId: loggedUser?.id, senderId: message?.sender};
  }

  const determineSender = (message: ChatMessage | null) => {
    if (isNil(message)) {
      return null;
    }
    if (message?.sender === loggedUser?.id) {
      return message?.reciever_profile;
    }
    return message?.sender_profile;
  }

  const determineSenderName = (message: ChatMessage | null): string | null => {
    if (isNil(message)) {
      return null;
    }
    if (message?.sender === loggedUser?.id) {
      return getSenderName(message?.reciever_profile);
    }
    return getSenderName(message?.sender_profile);
  }

  const getSenderName = (sender_profile: any): string | null => {
    if (isNil(sender_profile)) {
      return null;
    }
    if (isNil(sender_profile.username)) {
      return String(sender_profile.email);
    }
    return sender_profile.username;
  }

  const isMessageSelected = (message: ChatMessage): boolean => {
    return selectedConversation?.id === message.id;
  }

  const onInboxMessageClick = (message: ChatMessage) => {
    setSelectedConversation(message);
    downloadConversationMessages(message);
  }

  const downloadConversationMessages = (selectedConversationMessage: ChatMessage) => {
    dispatch(getConversationMessages(determineSenderAndReceiver(selectedConversationMessage)))
        .then((messages) => {
          setSelectedConversationMessages(messages.payload);
        })
  }

   const handleKeyDown = async (event: any) => {
    if (event.key !== 'Enter') {
      return;
    }
    if (isNil(typedMessage) || typedMessage === '') {
      return;
    }
    const messagePayload: MessagePayload = {
      user: loggedUser.id,
      sender: loggedUser.id,
      reciever: determineSenderAndReceiver(selectedConversation!).senderId,
      message: String(typedMessage)
    };
    const newMessage = await dispatch(sendMessage(messagePayload))
    const userInbox = await dispatch(getUserMessages(loggedUser.id));
    setMessages(userInbox.payload);
    selectedConversationMessages.push(newMessage.payload);
    setSelectedConversationMessages(selectedConversationMessages);
    setTypedMessage('');
  }

  const isMessageReceived = (message: ChatMessage) => {
    return loggedUser?.id !== message?.sender;
  }

  return (
    <div>
      <PageTitle title="Messages" />
      <div className="flex-col w-full mx-auto lg:flex shadow-md rounded-xl overflow-hidden">
        <div className="flex-1 min-w-0 bg-white xl:flex">
          <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-70 xl:border-r xl:border-gray-200 bg-white">
            <div className="h-full pl-2 pr-2 py-2 sm:pl-2 sm:pr-2 lg:pl-2 lg:pr-2 xl:pl-0 xl:pr-0">
              <div className="px-2 h-full relative">
                <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-4">
                  <div className="flex-shrink-0">
                    <img 
                    className="h-12 w-12 rounded-full"
                    src={loggedUserDetails?.profile_picture || profilePlaceholder}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" />
                      <p className="text-sm font-bold text-blue-400">
                        {getSenderName(loggedUserDetails)}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        
                      </p>
                    </a>
                  </div>
                </div>

                <div className="mb-4">
                  <div onClick={() => navigate('/search')} className={`relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 hover:cursor-pointer focus-within:ring-2 mb-3 hover:bg-gray-200 bg-white`}>
                    <span className="flex flex-row items-center justify-center w-full">
                      New Message
                    </span>
                  </div>
                      {messages?.length === 0 ? 'No messages' : messages?.map(message => {
                        return (
                            <div key={message.id} onClick={() => onInboxMessageClick(message)}
                                className={`relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 hover:cursor-pointer focus-within:ring-2 mb-3 hover:bg-gray-200 ${isMessageSelected(message) ? 'bg-mainLightGray' : 'bg-white'}`}>
                              <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={determineSender(message)?.profile_picture || profilePlaceholder}/>
                              </div>
                              <div className="flex-1 min-w-0 w-32">
                                <div className={"w-full"}>
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-blue-400">
                                      {determineSenderName(message)}
                                    </p>
                                    <div className="text-gray-400 text-xs">
                                      {isToday(message?.date) ? message.date.toLocaleTimeString() : message.date.toLocaleDateString()}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-500 truncate">
                                      {message.message}
                                    </p>
                                    {!message.is_read ? <div className="text-xs bg-blue-400 rounded-full px-1 px-0 text-blue-400">
                                      1
                                    </div> : null}

                                  </div>
                                </div>
                              </div>
                            </div>
                        )})
                      }
                </div>
              </div>
            </div>
          </div>
          

          <div className="flex-1 p:2 sm:pb-4 justify-between flex flex-col xl:flex">
            <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
              <div className="flex items-center space-x-4">
                {!isNil(selectedConversation) ?
                    <img className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor pointer" src={determineSender(selectedConversation)?.profile_picture || profilePlaceholder}/> : null}
                <div className="flex flex-col leading-tight">
                  <div className="text-1xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">
                      {!isNil(selectedConversation) ? determineSenderName(selectedConversation) : 'Choose conversation'}
                    </span>

                  </div>
                </div>
              </div>

            </div>
            <div id="messages" className=" h-screen flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
              {selectedConversationMessages?.map((message) => {
                return (
                    <div className="chat-message" key={message.id}>
                      <div className={`flex items-end ${!isMessageReceived(message) ? " justify-end" : ""}`}>
                        <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 ${isMessageReceived(message) ? " items-start" : " items-end"}`}>
                          <div>
                            <span className={`px-2 py-2 rounded-lg inline-block  ${!isMessageReceived(message) ? " bg-blue-400 rounded-br-none text-white" : " bg-mainLightGray rounded-bl-none text-mainBlack"}`}>
                              {message.message}
                            </span>
                          </div>
                        </div>
                        <img
                        className={`w-8 h-8 rounded-full ${!isMessageReceived(message) ? "order-2" : "order-1"}`}
                        src={isMessageReceived(message) ? (message.sender_profile.background_image || profilePlaceholder) : (loggedUserDetails?.profile_picture || profilePlaceholder)}
                        />
                      </div>
                </div>)
              })}
            </div>
            {!isNil(selectedConversation) ? (
              <div className="border-t-2 border-gray-200 px-2 pt-4">
                <div className="relative flex">
                  <input
                      value={typedMessage}
                      onChange={(value) => setTypedMessage(value.target.value)}
                      onKeyDown={(event) => handleKeyDown(event)}
                      placeholder="Write something"
                      className="focus:ring-blue-500 focus:border-blue-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-4 bg-gray-100 rounded-full py-2 border-gray-200"
                  />
                </div>
            </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
