import Link from "next/link"
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";

export default function Page() {
    const listings = [
        {id: "1", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "2", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "3", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "4", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "5", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "6", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "7", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "8", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "9", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1}
    ];

    return (
        <div className="w-auto h-auto flex flex-col grow gap-4">
            <SearchBar/>
            <div className="flex flex-col md:flex-row gap-4 md:flex-wrap">
                {listings.map((listing) => (
                    <Link key={listing.id} href={`/market/${listing.id}`} className="hover:cursor-pointer">
                        <ListingCard id={listing.id} imageUrl={listing.imageUrl} title={listing.title} price={listing.price}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}