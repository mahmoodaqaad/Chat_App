/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client"
export const chatConext = createContext()


// eslint-disable-next-line react/prop-types
const ChatContextPrvider = ({ children, user }) => {

    const [userChats, setUserChats] = useState(null)
    const [isUserChatslineoading, setisUserChatslineoading] = useState(false)
    const [userChatError, setUserChatError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])
    const [loadingpotentialChats, setLoadingpotentialChats] = useState(false)
    const [currentChat, setCuurentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [messagesLoading, setMessagesLoading] = useState(false)
    const [messageError, setMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [Notifications, setNotifications] = useState([])
    const [allUsers, setAllusers] = useState([])
    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_SOCKET_URL)
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [user])

    // add online user 
    useEffect(() => {
        if (socket === null) return
        if (user?._id) {

            socket.emit("addNewUser", user?._id);
            socket.on("getOnlineUsers", (res) => {
                setOnlineUsers(res);

            })
        }
        return () => {
            socket.off("getOnlineUsers")
        }


    }, [socket])


    // sned message


    useEffect(() => {
        if (socket === null || newMessage === null) return
        const recipientId = currentChat?.members?.find((id) => id !== user?._id)

        socket.emit("sendMessage", { ...newMessage, recipientId })


    }, [currentChat, newMessage, socket, user])



    // Reseve message and nofifications


    useEffect(() => {
        if (socket === null) return
        socket.on("getMessage", res => {
            if (currentChat?._id !== res.chatId) return

            setMessages(prev => [...prev, res])
        })


        socket.on("getNoification", (res) => {


            const isChatOpen = currentChat?.members?.some(id => id === res.senderId)

            if (isChatOpen) {
                setNotifications(prev => [{ ...res, isread: true }, ...prev])
                console.log("is read");


            } else {
                setNotifications(prev => [res, ...prev])
            }

        })


        return () => {
            socket.off("getMessage")
            socket.off("getNoification")
        }

    }, [currentChat, socket])




    useEffect(() => {
        const getUsers = async () => {
            setLoadingpotentialChats(true)

            setisUserChatslineoading(true)
            const res = await getRequest(`users`)
            setisUserChatslineoading(false)

            if (res.error) {
                return setUserChatError(res)
            }
            const pChat = res.filter(u => {
                let isChatCreated = false
                if (u?._id === user?._id) return false

                if (userChats) {
                    isChatCreated = userChats?.some(chat => {
                        return chat.members[0] === u._id || chat.members[1] == u._id
                    })
                }
                return !isChatCreated
            })
            setPotentialChats(pChat)
            setAllusers(res)
            setLoadingpotentialChats(false)
        }
        getUsers()
    }, [user, userChats])



    useEffect(() => {
        const getUserChats = async () => {
            setUserChatError(null)
            if (user?._id) {

                setisUserChatslineoading(true)
                const res = await getRequest(`chats/${user._id}`)
                setisUserChatslineoading(false)

                if (res.error) {
                    return setUserChatError(res)
                }
                setUserChats(res)
            }
        }
        getUserChats()
    }, [user, Notifications])





    useEffect(() => {
        const getMessages = async () => {
            try {

                setMessageError(null)

                setMessagesLoading(true)
                const res = await getRequest(`messages/${currentChat?._id}`)
                setMessagesLoading(false)


                if (res.error) {
                    return setMessageError(res)
                }
                setMessages(res)
            } catch (e) {
                console.log(e);

            }
        }
        getMessages()
    }, [currentChat])




    const updateCurrentChat = useCallback((chat) => {
        setCuurentChat(chat)
    }, [])


    const createChats = useCallback(async (firstId, secondId) => {
        try {

            const res = await postRequest(`chats`, { firstId, secondId })
            setUserChats((prev) => [...prev, res.data])

        } catch (e) {
            console.log(e);

        }

    }, [])


    const sendTextMessage = useCallback(async (text, senderId, chatId, setTextMessage) => {
        if (!text) return console.log("You must Type something...");
        try {


            const res = await postRequest("messages", { text, senderId, chatId })
            setTextMessage("")
            setNewMessage(res.data)
            setMessages(prev => [...prev, res.data])
        } catch (e) {
            console.log(e);

        }

    }, [])

    const markAllNotificationsRead = useCallback((notif) => {
        const MNotifications = notif.map(n => { return { ...n, isread: true } })
        setNotifications(MNotifications)
    }, [])

    const MarkNotificationAsRead = useCallback((n, userChats, user, nofifications) => {
        const desireadChat = userChats.find(chat => {
            const chatMembers = [user._id, n.senderId]
            const isDesireadChat = chat?.members?.every(member => {
                return chatMembers.includes(member)
            })
            return isDesireadChat
        })
        // mark nofifications as  read 
        const mNotifications = nofifications.map(el => {
            if (n.senderId === el?.senderId) {
                return { ...n, isread: true }
            }
            else el
        })
        updateCurrentChat(desireadChat)
        setNotifications(mNotifications)
    }, [updateCurrentChat])

    const MarkThisNotificationAsRead = useCallback((ThisNotification, notifications) => {
        const mNotifications = notifications.map(el => {
            let notification;
            ThisNotification.forEach(n => {
                if (n.senderId === el.senderId) {
                    notification = { ...n, isread: true }
                }
                else {
                    notification = el
                }
            })
            return notification
        })
        setNotifications(mNotifications)
    }, [])
    return (
        <chatConext.Provider value={{
            createChats,
            sendTextMessage,
            updateCurrentChat,
            MarkNotificationAsRead,
            markAllNotificationsRead,
            MarkThisNotificationAsRead,
            allUsers,
            messages,
            userChats,
            newMessage,
            currentChat,
            onlineUsers,
            messageError,
            Notifications,
            userChatError,
            potentialChats,
            messagesLoading,
            isUserChatslineoading,
            loadingpotentialChats,

        }}>
            {children}
        </chatConext.Provider >
    )
}

export default ChatContextPrvider
