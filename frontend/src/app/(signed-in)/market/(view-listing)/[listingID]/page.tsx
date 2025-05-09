"use client"

import ListingCard from "@/components/ListingCard"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {useState} from "react"
import { fetchListing } from "@/mockDatabase"
import { useParams } from 'next/navigation'

export default function Page() {
    const [viewSeller, setViewSeller] = useState(false);
    const pageparams = useParams<{listingID: string}>();
    const listing = fetchListing(pageparams.listingID);

    return (
        <div className="w-full">
            <div className="flex">
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-500 h-140 w-[55vw]"/>
                    <div className="bg-gray-500 h-30 w-[55vw]"/>
                    <div className="flex gap-4">
                        <Button className="text-xl cursor-pointer h-8 w-[8vw]">Save</Button>
                        <Button className="text-xl cursor-pointer h-8 w-[8vw]">Report</Button>
                        <Button className="text-xl cursor-pointer h-8 w-[8vw]">Share</Button>
                    </div>
                </div>

                <div className="bg-gray-500 ml-8 p-8 h-197 w-full flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{listing?.title}</h1>
                        <p className="text-2xl font-bold">${listing?.price}</p>
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
                        <p className="text-2xl text-blue-500 underline cursor-pointer w-fit" onClick={() => setViewSeller(true)}>{listing?.owner}</p>

                        {viewSeller && (
                            <div className="fixed inset-0 flex items-center justify-center mt-14">
                                <div className="bg-white h-[48vw] w-[51vw] border-2 border-black p-4">
                                    <p className="text-red-500 text-2xl font-bold ml-202 cursor-pointer" onClick={() => setViewSeller(false)}>X</p>

                                    <div className="flex items-center gap-4">
                                        <img className="rounded-full h-50 inline-block" src="https://dummyimage.com/150x150/000/fff"/>
                                        <div className="flex flex-col text-2xl">
                                            <p>First Name</p>
                                            <p>Joined Apr 20XX</p>
                                            <p>XX Confirmed Transactions</p>
                                        </div>
                                    </div>

                                    <p className="text-2xl font-bold mt-4 mb-4">Other Posts</p>

                                    <div className="flex flex-wrap gap-4">
                                        <Link key="1" href="/market/1" className="hover:cursor-pointer">
                                            <ListingCard id="1" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                                        </Link>
                                        <Link key="2" href="/market/2" className="hover:cursor-pointer">
                                            <ListingCard id="2" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                                        </Link>
                                        <Link key="3" href="/market/3" className="hover:cursor-pointer">
                                            <ListingCard id="3" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                                        </Link>
                                        <Link key="4" href="/market/4" className="hover:cursor-pointer">
                                            <ListingCard id="4" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                                        </Link>
                                        <Link key="5" href="/market/5" className="hover:cursor-pointer">
                                            <ListingCard id="5" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                                        </Link>
                                        <Link key="6" href="/market/6" className="hover:cursor-pointer">
                                            <ListingCard id="6" imageUrl="https://dummyimage.com/150x150/000/fff" title="Lorem Ipsum" price={1}/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/inbox">
                        <Button className="text-2xl cursor-pointer h-16 w-full font-bold">Message</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
