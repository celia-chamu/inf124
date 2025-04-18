import React from "react";

interface ListingCardProps {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  imageUrl,
  title,
  price,
}) => {
  // const handleClick = () => {
  //   navigate(`/listing/${id}`);
  // };

  return (
    <div
      // onClick={handleClick}
      className="cursor-pointer rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      <img src={imageUrl} alt={title} className="w-200 h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ListingCard;
