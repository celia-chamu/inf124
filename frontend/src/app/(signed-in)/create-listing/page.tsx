import { Button } from "@/components/ui/button";

function CreateListing() {
  return (
    <div className="px-4 pt-8 md:pl-[10vw] md:pt-[10vh]">
      <div className="bg-gray-500 w-full md:w-[50vw] h-auto md:h-[75vh] p-6 md:p-12 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            className="h-40 w-40 object-cover cursor-pointer mx-auto md:mx-0"
            src="https://dummyimage.com/150x150/000/fff"
            alt="Preview"
          />
          <div className="flex flex-col w-full gap-6 md:gap-12">
            <input
              type="text"
              placeholder="Title"
              className="bg-white rounded-lg border border-black text-xl md:text-2xl pl-2 py-2"
            />
            <input
              type="text"
              placeholder="Price"
              className="bg-white rounded-lg border border-black text-xl md:text-2xl pl-2 py-2"
            />
            <select className="bg-white rounded-lg border border-black text-xl md:text-2xl pl-2 py-2">
              <option value="">Category</option>
              <option value="category1">Category1</option>
              <option value="category2">Category2</option>
              <option value="category3">Category3</option>
            </select>
            <select className="bg-white rounded-lg border border-black text-xl md:text-2xl pl-2 py-2">
              <option value="">Condition</option>
              <option value="pre-owned">Pre-Owned</option>
              <option value="like-new">Like New</option>
              <option value="new">New</option>
            </select>
          </div>
        </div>
        <textarea
          placeholder="Description"
          className="bg-white rounded-lg border border-black text-xl md:text-2xl pl-2 py-2 mt-8 w-full h-40 md:h-[20vh]"
        />
        <div className="flex justify-end">
          <Button className="rounded-xl border cursor-pointer mt-8 md:mt-12">Create New Listing</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
