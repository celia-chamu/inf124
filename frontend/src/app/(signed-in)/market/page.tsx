import Link from "next/link"
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/searchbar";
import { fetchListings } from "@/mockDatabase";

export default function Page() {
    const listings = fetchListings();

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