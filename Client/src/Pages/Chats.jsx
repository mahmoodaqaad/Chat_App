/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { chatConext } from "../context/chatContext"
import { Stack } from "react-bootstrap"
import UserChat from "../Components/Chats/UserChat"
import PotentialChat from "../Components/Chats/potentialChats"
import ChatBox from "../Components/Chats/ChatBox"

const Chats = () => {

  const { user } = useContext(AuthContext)


  const { userChats,
    isUserChatslineoading, updateCurrentChat } = useContext(chatConext)

  return (
    <div >

      <PotentialChat />

      {
        userChats?.length < 1 ? null :
          <Stack gap={4} className="align-items-start  " >
            <Stack className="flex-grow-0 message-box pe-3" gap={3}>
              {
                isUserChatslineoading ? <p>
                  Loading Chats...
                </p>
                  : userChats &&
                  userChats?.map((chat, index) => (
                    <div className="pointer" key={index} onClick={(_) => updateCurrentChat(chat)}>
                      <UserChat chat={chat} user={user} />
                    </div>
                  ))
              }

            </Stack>
            <ChatBox />


          </Stack>}
    </div>
  )
}

export default Chats
