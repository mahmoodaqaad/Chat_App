import React, { useContext } from 'react'
import { chatConext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const PotentialChat = () => {
    const { user } = useContext(AuthContext)

    const { potentialChats, createChats, loadingpotentialChats, onlineUsers } = useContext(chatConext)
    console.log();

    return (
        <div>
            <div className="all-users">
                {loadingpotentialChats ? "Loaiding" : potentialChats.map((u, index) => (
                    <div className="single-user" key={index} onClick={e => { createChats(user._id, u._id) }}>
                        {u?.name}
                        {
                            onlineUsers?.some(user => user.userId === u._id) &&
                            <span className='user-online'></span>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PotentialChat
