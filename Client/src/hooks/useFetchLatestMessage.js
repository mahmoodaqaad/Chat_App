import { useContext, useEffect, useState } from "react"
import { chatConext } from "../context/chatContext"
import { getRequest } from "../utils/services"

export const UseFetchLatestMessages = (chat) => {

    const { newMessage, Notifications } = useContext(chatConext)
    const [latestMessage, setLatestMessage] = useState(null)

    useEffect(() => {
        const getMessages = async () => {
            try {

                const response = await getRequest(`messages/${chat?._id}`);
                const lastMessage = response[response?.length - 1]
                setLatestMessage(lastMessage)
            } catch (e) {
                console.log(e);

            }
        }
        getMessages()
    }, [newMessage, Notifications, chat])

    return { latestMessage }
}