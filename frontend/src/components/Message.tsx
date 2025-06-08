function Message({ username, textMessage, profilePicture}: propTypes) {
    return (
        <div className="bg-primary xl:h-auto w-full rounded-full pl-2 mb-4 flex items-center">
            {/* Profile picture  changed to user session later*/}
            <img
                className="h-10 w-10 rounded-full inline-block mr-4"
                src={profilePicture || "https://i.fbcd.co/products/original/l010e-6-e02-mainpreview-3720591835ee8456a0067e9828c79295abd5810e798a532e1c013a3114580b44.jpg"}
            />
            <div className="inline-block">
                <p className="text-white">{username}</p>
                <p className="text-white">{textMessage}</p>
            </div>
        </div>
    )
}

type propTypes = {
    username: string
    textMessage: string
    profilePicture?: string
}

export default Message
