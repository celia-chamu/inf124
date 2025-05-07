import Link from "next/link"
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/searchbar";

export default function Page() {
    const listings = [
        {id: "1", imageUrl: "https://www.ikea.com/us/en/images/products/skolaest-trash-can-for-cabinet-with-door-light-gray__1191200_pe900554_s5.jpg?f=xl", title: "Lorem Ipsum", price: 1},
        {id: "2", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "3", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "4", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "5", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "6", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "7", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "8", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "9", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "10", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "11", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "12", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
        {id: "13", imageUrl: "https://dummyimage.com/150x150/000/fff", title: "Lorem Ipsum", price: 1},
    ];
//flex flex-col md:flex-row gap-4 md:flex-wrap
    return (
        <div className="w-auto h-auto flex flex-col gap-4">
            <SearchBar/>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {listings.map((listing) => (
                    <Link key={listing.id} href={`/market/${listing.id}`} className="hover:cursor-pointer">
                        <ListingCard id={listing.id} imageUrl={listing.imageUrl} title={listing.title} price={listing.price}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}