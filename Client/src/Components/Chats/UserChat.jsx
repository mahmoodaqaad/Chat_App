import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { useContext } from "react";
import { chatConext } from "../../context/chatContext";
import { unReadNotificationFun } from "../../utils/unReadNotifications";
import { UseFetchLatestMessages } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {

  const { recipientUser } = useFetchRecipientUser(chat, user)
  const { onlineUsers, Notifications, MarkThisNotificationAsRead } = useContext(chatConext)

  const { latestMessage } = UseFetchLatestMessages(chat)




  const unReadNotification = unReadNotificationFun(Notifications)


  const thisUserNotif = unReadNotification?.filter(n => n?.senderId === recipientUser?._id)


  const isOnline = onlineUsers?.some(item => item?.userId === recipientUser?._id)


  const truncateText = (text) => {
    let shortText = text?.slice(0, 20)
    if ((text?.length > 20)) {
      shortText = shortText + "..."
    }
    return shortText
  }
  return (
    <Stack direction="horizontal" gap={3} role="button" onClick={() => {
      if (thisUserNotif?.length > 0)
        MarkThisNotificationAsRead(thisUserNotif, Notifications)
    }} className="user-card align-items-center justify-content-between">
      <div className="d-flex">
        <div className="me-2">
          <FontAwesomeIcon icon={faUserCircle} color="#ed1" fontSize={"21px"} />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>


          <div className="text">{
            latestMessage ? (

              latestMessage?.senderId == user._id ? "You : " +
                truncateText(latestMessage?.text) :
                truncateText(latestMessage?.text)
            ) : "Send Massage ?"
          }</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="data">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div className="data">
          {
            thisUserNotif.length > 0 ?
              <div className="this-user-notifications">{thisUserNotif?.length}</div> :
              ""
          }
          {

            isOnline &&

            <span className='user-online'></span>

          }
        </div>
      </div>
    </Stack>
  )
}

export default UserChat
