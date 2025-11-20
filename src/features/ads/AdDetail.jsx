import { useState } from "react";
import useAdDetail from "@hooks/useAdDetail";
import { Button } from "@components/Button";
import { useAuth } from "@context/AuthContext";


const AdDetail = () => {
    const ad = useAdDetail();
    const { user } = useAuth();


    // console.log("ADS FROM HOOK usAdDetail:", ad);
    const price = ad.price;

    // Example for US dollars
    const formattedPrice = new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
    }).format(price);

    if (!ad) return "Loading...";

    // if (!ad.length) return <p className="text-center mt-10">Ad not found.</p>;
    const product = {

        images: [
            "https://placehold.co/500x500/ddd6ff/5d0ec0?text=Image1",
            "https://placehold.co/500x500/ddd6ff/5d0ec0?text=Image2",
            "https://placehold.co/500x500/ddd6ff/5d0ec0?text=Image3",
            "https://placehold.co/500x500/ddd6ff/5d0ec0?text=Image4",
            "https://placehold.co/500x500/ddd6ff/5d0ec0?text=Image5",

        ]
    };

    const [thumbnail, setThumbnail] = useState(product.images[0]);

    return (
        <div className=" w-full px-6">


            <div className="flex flex-col md:flex-row gap-8 mt-4">
                <div className="flex gap-3 md:w-1/2">
                    <div className="flex flex-col gap-3">
                        {product.images.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30  rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-md w-full md:w-1/2">
                    <h1 className="text-5xl font-medium">{ad.title}</h1>

                    {/* <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            product.rating > i ? (
                                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#615fff" />
                                </svg>
                            ) : (
                                <svg width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#615fff" fill-opacity="0.35" />
                                </svg>
                            )
                        ))}
                        <p className="text-base ml-2">({product.rating})</p>
                    </div> */}

                    <div className="mt-6">
                        {/* <p className="text-gray-500/70 line-through">MRP: ${product.price}</p> */}
                        <p className="text-3xl text-violet-600 font-bold ">{formattedPrice}</p>
                    </div>

                    <p className="text-2xl  font-medium mt-6">About</p>
                    <p className="text-gray-500 text-lg mt-1">
                        {ad.description}
                    </p>
                    <p className="text-2xl  font-medium mt-6">Category</p>

                    <p className="text-gray-500 text-lg mt-1">
                        {ad.__category__ ? ad.__category__.name : null}
                    </p>

                    <p className="text-2xl  font-medium mt-6">Location</p>

                    <p className="text-gray-500 text-lg mt-1">
                        {ad.__location__ ? ad.__location__.name : null}
                    </p>

                    <div className=" mt-10 gap-4">
                        <p className=" text-2xl font-medium mt-6">Call Now</p>

                        <Button
                            type={"button"}
                            href={`tel:${user.phone}`}
                            btnClass={'text-3xl flex items-center max-w-80 justify-center gap-5 mt-2 mb-5 bg-linear-to-r from-violet-600 to-violet-800 hidden md:flex bg-violet-600 text-white px-8 py-4 rounded-full font-medium hover:bg-violet-700 transition cursor-pointer '}
                            btnText={ad.__user__ ? ad.__user__.phone : null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AdDetail;