import SearchBar from "@/components/SearchBar"
import {Button} from "@/components/ui/button"
import Link from "next/link"

interface paramTypes {
    params: {
        listingID: string
    };
};

export default async function Page({params}: paramTypes) {
    return (
        <div className="w-full">
            <SearchBar/>
            <div className="flex mt-4">
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-500 h-140 w-[55vw]"/>
                    <div className="bg-gray-500 h-30 w-[55vw]"/>
                    <div className="flex gap-4">
                        <Button className="text-xl border-1 cursor-pointer h-8 w-[8vw]">Save</Button>
                        <Button className="text-xl border-1 cursor-pointer h-8 w-[8vw]">Report</Button>
                        <Button className="text-xl border-1 cursor-pointer h-8 w-[8vw]">Share</Button>
                    </div>
                </div>

                <div className="bg-gray-500 ml-8 p-8 h-197 w-full flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Item Name</h1>
                        <p className="text-2xl font-bold">$$$</p>
                        <p className="text-2xl">Posted 1 hr ago</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-bold">Details</p>
                        <p className="text-2xl">Category: Lorem Ipsum</p>
                        <p className="text-2xl">Condition: New</p>
                        <div className="bg-gray-300 rounded-lg text-2xl pl-2 h-60 w-full mt-2 mb-2">
                            Lorem Ipsum
                        </div>
                        <p className="text-2xl font-bold">Seller</p>
                        <p className="text-2xl">Seller Name</p>
                    </div>

                    <Link href="/inbox">
                        <Button className="text-2xl border-1 cursor-pointer h-16 w-full font-bold">Message</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
