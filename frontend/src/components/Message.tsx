function Message({username, textMessage}: propTypes) {
    return (
        <div className="bg-gray-800 h-20 w-304 rounded-full pl-2 mb-4 flex items-center">
            <img className="border-1 h-16 w-16 rounded-full inline-block mr-4" src="https://dummyimage.com/150x150/000/fff"/>
            <div className="inline-block">
                <p className="text-white">{username}</p>
                <p className="text-white">{textMessage}</p>
            </div>
        </div>
    );
}

type propTypes = {
    username: string,
    textMessage: string
};

export default Message