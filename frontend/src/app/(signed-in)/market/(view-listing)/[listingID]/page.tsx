interface paramTypes {
    params: {
        listingID: string
    };
};

export default async function Page({params}: paramTypes) {
    return (
        <>
            Viewing Listing of ID: {params.listingID}
        </>
    );
}
