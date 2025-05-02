function AccountSettings() {
    return (
        <div className="w-full ml-[22vw]">
            <div className="bg-white h-50 mt-20">
                <img className="rounded-full h-50 inline-block" src="https://dummyimage.com/150x150/000/fff"/>
                <p className="inline-block text-xl ml-4">First Name</p>
            </div>

            <h1 className="bg-white text-4xl font-bold pt-8 mb-8">Account</h1>

            <div className="flex">
                <div className="bg-white h-40 inline-block w-[25vw]">
                    <p className="text-lg">Name</p>
                    <div className="bg-gray-400 h-1"/>
                    <p className="pt-4 text-lg">Email</p>
                    <div className="bg-gray-400 h-1"/>
                    <p className="pt-4 text-lg">Password</p>
                    <div className="bg-gray-400 h-1"/>
                </div>

                <div className="bg-white h-40 inline-block w-[2vw]">
                    <button className="text-lg font-bold cursor-pointer">Edit</button>
                    <div className="bg-gray-400 h-1"/>
                    <button className="pt-4 text-lg font-bold cursor-pointer">Edit</button>
                    <div className="bg-gray-400 h-1"/>
                    <button className="pt-4 text-lg font-bold cursor-pointer">Edit</button>
                    <div className="bg-gray-400 h-1"/>
                </div>
            </div>

            <h1 className="bg-white text-4xl font-bold pt-8 mb-8">Notifications</h1>

            <div className="flex">
                <div className="bg-white h-40 inline-block w-[25vw]">
                    <p className="text-lg">Notification Preference</p>
                    <div className="bg-gray-400 h-1"/>
                </div>

                <div className="bg-white h-40 inline-block w-[2vw]">
                    <button className="text-lg font-bold cursor-pointer">Edit</button>
                    <div className="bg-gray-400 h-1"/>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings