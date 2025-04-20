import NavMenu from "@/components/NavMenu"

function AccountSettings() {
    return (
        <>
            <NavMenu/>
            <div className="bg-white ml-82 w-340 h-50 mt-30">
                <img className="rounded-full h-50 w-50 inline-block" src="https://dummyimage.com/150x150/000/fff"></img>
                <p className="inline-block text-xl ml-4">First Name</p>
            </div>

            <h1 className="text-4xl font-bold pt-8 ml-82 mb-8">Account</h1>

            <div className="flex">
                <div className="bg-white ml-82 w-100 h-40 inline-block">
                    <p className="text-lg">Name</p>
                    <div className="bg-gray-400 h-1 w-100"/>
                    <p className="pt-4 text-lg">Email</p>
                    <div className="bg-gray-400 h-1 w-100"/>
                    <p className="pt-4 text-lg">Password</p>
                    <div className="bg-gray-400 h-1 w-100"/>
                </div>

                <div className="bg-white w-240 h-40 inline-block">
                    <button className="text-lg font-bold cursor-pointer">Edit</button>
                    <div className="bg-gray-400 h-1 w-10"/>
                    <button className="pt-4 text-lg font-bold cursor-pointer">Edit</button>
                    <div className="bg-gray-400 h-1 w-10"/>
                    <button className="pt-4 text-lg font-bold cursor-pointer">Edit</button>
                    <div className="bg-gray-400 h-1 w-10"/>
                </div>
            </div>

            <h1 className="text-4xl font-bold pt-8 ml-82 mb-8">Notifications</h1>

            <div className="flex">
                <div className="bg-white ml-82 w-100 h-40 inline-block">
                    <p className="text-lg">Notification Preference</p>
                    <div className="bg-gray-400 h-1 w-100"/>
                </div>

                <div className="bg-white w-240 h-40 inline-block">
                    <button className="text-lg font-bold cursor-pointer">Edit</button>
                    <div className="bg-gray-400 h-1 w-10"/>
                </div>
            </div>
        </>
    );
}

export default AccountSettings