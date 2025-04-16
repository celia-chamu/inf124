import Image from "next/image";
import ListingCard from "@/components/Listings/ListingCard";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
    <ListingCard
        id="abc123"
        imageUrl="next/image.png"
        title="peter anteater"
        price={129.99}
      />
      </div>
      </div>
  );
}
