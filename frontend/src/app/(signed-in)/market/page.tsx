import Link from "next/link"
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/searchbar";

export default function Page() {
    const listings = [
        {
            id: "1",
            imageUrl: "https://www.ikea.com/us/en/images/products/gullaberg-6-drawer-dresser-white__1191200_pe900554_s5.jpg?f=xl",
            title: "GULLABERG 6-drawer dresser",
            price: 4.49
        },
        {
            id: "2",
            imageUrl: "https://www.ikea.com/us/en/images/products/pildvaergmal-duvet-cover-and-pillowcase-s-white-floral-pattern__1385328_pe963277_s5.jpg?f=xl",
            title: "PILDVÄRGMAL",
            price: 39.99
        },
        {
            id: "3",
            imageUrl: "https://www.ikea.com/us/en/images/products/aktertofter-led-ceiling-fan-with-light-dimmable-wood-effect-silver-color__1385438_pe963313_s5.jpg?f=xl",
            title: "AKTERTOFTER",
            price: 129.99
        },
        {
            id: "4",
            imageUrl: "https://www.ikea.com/us/en/images/products/kvarnven-ergonomic-pillow-stomach-sleeper__1024077_pe833412_s5.jpg?f=xl",
            title: "KVARNVEN",
            price: 49.99
        },
        {
            id: "5",
            imageUrl: "https://www.ikea.com/us/en/images/products/storklinta-6-drawer-chest-dark-brown-oak-effect-anchor-unlock-function__1344142_pe949751_s5.jpg?f=xl",
            title: "STORKLINTA",
            price: 229.99
        },
        {
            id: "6",
            imageUrl: "https://www.ikea.com/us/en/images/products/gullaberg-6-drawer-dresser-white__1191200_pe900554_s5.jpg?f=xl",
            title: "GULLABERG 6-drawer dresser",
            price: 4.49
        },
        {
            id: "7",
            imageUrl: "https://www.ikea.com/us/en/images/products/pildvaergmal-duvet-cover-and-pillowcase-s-white-floral-pattern__1385328_pe963277_s5.jpg?f=xl",
            title: "PILDVÄRGMAL",
            price: 39.99
        },
        {
            id: "8",
            imageUrl: "https://www.ikea.com/us/en/images/products/aktertofter-led-ceiling-fan-with-light-dimmable-wood-effect-silver-color__1385438_pe963313_s5.jpg?f=xl",
            title: "AKTERTOFTER",
            price: 129.99
        },
        {
            id: "9",
            imageUrl: "https://www.ikea.com/us/en/images/products/kvarnven-ergonomic-pillow-stomach-sleeper__1024077_pe833412_s5.jpg?f=xl",
            title: "KVARNVEN",
            price: 49.99
        },
        {
            id: "10",
            imageUrl: "https://www.ikea.com/us/en/images/products/storklinta-6-drawer-chest-dark-brown-oak-effect-anchor-unlock-function__1344142_pe949751_s5.jpg?f=xl",
            title: "STORKLINTA",
            price: 229.99
        },
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