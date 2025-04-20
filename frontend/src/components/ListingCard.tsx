function ListingCard({id, imageUrl, title, price}: propTypes) {
  return (
    <div
      // onClick={handleClick}
      className="cursor-pointer rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden w-50 h-68 mr-4 mb-3 inline-block"
    >
      <img src={imageUrl} alt={title} className="w-50 h-50 object-cover" />
      <div className="pl-2">
        <p className="text-lg font-semibold truncate">{title}</p>
        <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}

type propTypes = {
  id: string,
  imageUrl: string,
  title: string,
  price: number
}

export default ListingCard;
