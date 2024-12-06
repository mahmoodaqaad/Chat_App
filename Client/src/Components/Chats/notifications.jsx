import { useContext, useState } from "react"
import { chatConext } from "../../context/chatContext"
import { AuthContext } from "../../context/AuthContext"
import { unReadNotificationFun } from "../../utils/unReadNotifications"
import moment from 'moment'

const Notifications = () => {
    const [isOpen, setIsopen] = useState(false)
    const { userChats, Notifications, allUsers, markAllNotificationsRead, MarkNotificationAsRead } = useContext(chatConext)
    const { user } = useContext(AuthContext)

    const unReadNotifications = unReadNotificationFun(Notifications)
    const modifiedNotifications = Notifications.map(n => {
        const sender = allUsers.find(user => user._id === n?.senderId)
        return ({
            ...n,
            senderName: sender?.name
        })
    })


    return (
        <div className='notification border-0 position-relative'>
            <div className="notifications-icon" onClick={() => setIsopen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                </svg>
                {
                    unReadNotifications?.length === 0 ? null : (
                        <span className="notification-count">
                            <span>{unReadNotifications.length}</span>
                        </span>
                    )
                }
            </div>
            {
                isOpen &&
                <div className="notifications-box">
                    <div className="notifications-header">
                        <h3>notifications</h3>
                        <div className="mark-as-read " onClick={() => { markAllNotificationsRead(Notifications) }}>Mark all read</div>
                    </div>
                    {
                        modifiedNotifications.length === 0 ? <span>No Notifications yet ...</span> : ""
                    }
                    {

                        modifiedNotifications?.map(n => (
                            <div key={n} className={n.isread ? "notification" : "notification not-read"} onClick={() => {
                                MarkNotificationAsRead(n, userChats, user, Notifications)
                                setIsopen(false)
                            }}>                                <span>{n?.senderName} Sent You Message</span>
                                <span>{moment(n.date).calendar()} </span>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Notifications 
