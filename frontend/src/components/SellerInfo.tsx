import Link from 'next/link'
import ListingCard from './ListingCard'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { DialogClose } from '@radix-ui/react-dialog'

export default function SellerInfo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>View Seller</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Seller Info</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <img
                                className="rounded-full inline-block"
                                src="https://dummyimage.com/150x150/000/fff"
                            />
                            <div className="flex flex-col text-2xl">
                                <p>First Name</p>
                                <p>Joined Apr 20XX</p>
                                <p>XX Confirmed Transactions</p>
                            </div>
                        </div>

                        <p className="text-2xl font-bold mt-4 mb-4">
                            Other Posts
                        </p>

                        <div className="grid grid-cols-4 gap-4">
                            <Link
                                key="1"
                                href="/market/1"
                                className="hover:cursor-pointer"
                            >
                                <ListingCard
                                    id="1"
                                    imageUrl="https://dummyimage.com/150x150/000/fff"
                                    title="Lorem Ipsum"
                                    price={1}
                                />
                            </Link>
                            <Link
                                key="2"
                                href="/market/2"
                                className="hover:cursor-pointer"
                            >
                                <ListingCard
                                    id="2"
                                    imageUrl="https://dummyimage.com/150x150/000/fff"
                                    title="Lorem Ipsum"
                                    price={1}
                                />
                            </Link>
                            <Link
                                key="3"
                                href="/market/3"
                                className="hover:cursor-pointer"
                            >
                                <ListingCard
                                    id="3"
                                    imageUrl="https://dummyimage.com/150x150/000/fff"
                                    title="Lorem Ipsum"
                                    price={1}
                                />
                            </Link>
                            <Link
                                key="4"
                                href="/market/4"
                                className="hover:cursor-pointer"
                            >
                                <ListingCard
                                    id="4"
                                    imageUrl="https://dummyimage.com/150x150/000/fff"
                                    title="Lorem Ipsum"
                                    price={1}
                                />
                            </Link>
                            <Link
                                key="5"
                                href="/market/5"
                                className="hover:cursor-pointer"
                            >
                                <ListingCard
                                    id="5"
                                    imageUrl="https://dummyimage.com/150x150/000/fff"
                                    title="Lorem Ipsum"
                                    price={1}
                                />
                            </Link>
                            <Link
                                key="6"
                                href="/market/6"
                                className="hover:cursor-pointer"
                            >
                                <ListingCard
                                    id="6"
                                    imageUrl="https://dummyimage.com/150x150/000/fff"
                                    title="Lorem Ipsum"
                                    price={1}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
