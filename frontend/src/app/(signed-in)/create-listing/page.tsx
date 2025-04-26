import {Button} from "@/components/ui/button"

function CreateListing() {
    return (
        <div className="pl-[10vw] pt-[10vh]">
            <div className="bg-gray-500 w-[50vw] h-[75vh] p-12">
                <div className="flex gap-8">
                    <img className="h-75 cursor-pointer" src="https://dummyimage.com/150x150/000/fff"/>
                    <div className="flex flex-col w-full gap-12">
                        <input type="text" placeholder="Title" className="bg-white rounded-lg border-1 border-black cursor-pointer text-2xl pl-2"/>
                        <input type="text" placeholder="Price" className="bg-white rounded-lg border-1 border-black cursor-pointer text-2xl pl-2"/>
                        <select className="bg-white rounded-lg border-1 border-black cursor-pointer text-2xl pl-2">
                            <option value="">Category</option>
                            <option value="category1">Category1</option>
                            <option value="category2">Category2</option>
                            <option value="category3">Category3</option>
                        </select>
                        <select className="bg-white rounded-lg border-1 border-black cursor-pointer text-2xl pl-2">
                            <option value="">Condition</option>
                            <option value="pre-owned">Pre-Owned</option>
                            <option value="like-new">Like New</option>
                            <option value="new">New</option>
                        </select>
                    </div>
                </div>
                <textarea placeholder="Description" className="bg-white rounded-lg border-1 border-black cursor-pointer text-2xl pl-2 mt-8 w-full h-[20vh]"/>
                <div className="flex justify-end">
                    <Button className="rounded-2x1 border-1 cursor-pointer mt-12">Create New Listing</Button>
                </div>
            </div>
        </div>
    );
}

export default CreateListing