
import React from "react";
import { Button } from "./Button";
import { RoutePath } from "../routes/routes";
import useTimeAgo from "@hooks/useTimeAgo";
import toast from "react-hot-toast";
import { CircleX, Pencil } from "lucide-react";


const UserAdCard = ({ ad, refreshAds }) => {





    const timeAgo = useTimeAgo(ad.updatedAt);

    const price = ad.price;

    const formattedPrice = new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
    }).format(price);

    async function onClick(e) {
        e.preventDefault();
        const adId = ad.id;
        console.log(adId)

        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/${RoutePath.AD}/${RoutePath.CLOSE}/${adId}`;
        try {
            toast.loading("Closing ad... ⏳", { id: "ad-close", duration: Infinity });
            const response = await fetch(endpoint, {
                method: "PUT",
                body: JSON.stringify({ "isActive": false }),
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            });

            if (!response.ok) throw new Error("Something went wrong");
            toast.success("Ad closed successfully!", { id: "ad-close", duration: 5000 });
            refreshAds();

            // setTimeout(() => {
            //     navigate('/user/profile');
            // }, 2000);

        } catch (err) {
            toast.error(err.message, { id: "ad-close" });

        }
    }




    return (
        <div className="md:p-2 p-4 space-y-1">


            <div className={`${!ad.isActive ? '  ' : null} flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5   rounded-md border border-gray-300 text-gray-800`}>
                <div className="flex gap-5">
                    {/* <img className="w-12 h-12 object-cover opacity-60" src={boxIcon} alt="boxIcon" /> */}
                    <img src={`https://placehold.co/500x500/ddd6ff/5d0ec0?text=${ad.title}`} alt="Profile Avatar" className=" rounded-lg max-w-20" />

                    <div className="flex flex-col justify-center">
                        <p className="font-medium">
                            {ad.title}
                        </p>
                        <div className="text-md">
                            {/* <p className='font-medium mb-1'>name</p> */}
                            <p>{ad.description}</p>
                        </div>
                    </div>

                </div>



                <p className="font-medium text-base my-auto text-violet-700">{formattedPrice}</p>

                <div className="flex flex-col text-md">
                    <span className="flex">
                        <svg className="w-6 mr-1 fill-violet-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C214 64 128 148.4 128 252.6C128 371.9 248.2 514.9 298.4 569.4C310.2 582.2 329.8 582.2 341.6 569.4C391.8 514.9 512 371.9 512 252.6C512 148.4 426 64 320 64z" /></svg>
                        {ad.location ? ad.location.name : null}
                    </span>
                    <span className="flex my-2">
                        <svg className="w-6 mr-1 fill-violet-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M238.9 336C249.6 336 259.6 341.3 265.5 350.2L277.3 368L304 368C330.5 368 352 389.5 352 416L352 528C352 554.5 330.5 576 304 576L112 576C85.5 576 64 554.5 64 528L64 416C64 389.5 85.5 368 112 368L138.7 368L150.5 350.2C156.4 341.3 166.4 336 177.1 336L238.8 336zM517.5 324C523.1 319.1 531.4 318.7 537.4 323.1C543.4 327.5 545.7 335.5 542.7 342.4L504.3 432L560 432C566.7 432 572.6 436.1 575 442.4C577.4 448.7 575.6 455.7 570.6 460.1L442.6 572.1C437 577 428.7 577.4 422.7 573C416.7 568.6 414.4 560.6 417.4 553.7L455.9 464L400.1 464C393.4 464 387.5 459.9 385.1 453.6C382.7 447.3 384.5 440.3 389.5 435.9L517.5 323.9zM208 424C181.5 424 160 445.5 160 472C160 498.5 181.5 520 208 520C234.5 520 256 498.5 256 472C256 445.5 234.5 424 208 424zM547.8 64.4C554.3 63.3 560.9 64.8 566.3 68.8C572.4 73.3 576 80.5 576 88L576 240L575.7 244.9C572.4 269.1 545.2 288 512 288C476.7 288 448 266.5 448 240C448 213.5 476.7 192 512 192C517.5 192 522.9 192.6 528 193.6L528 144.3L416 177.9L416 288.1L415.7 293C412.4 317.2 385.2 336.1 352 336.1C316.7 336.1 288 314.6 288 288.1C288 261.6 316.7 240.1 352 240.1C357.5 240.1 362.9 240.7 368 241.7L368 136C368 125.4 375 116 385.1 113L545.1 65L547.8 64.4zM252.9 64C290 64 320 94 320 131.1L320 137.2C320 193.3 244.8 249.3 209.7 272.5C198.9 279.6 185.1 279.6 174.3 272.5C139.2 249.4 64 193.3 64 137.2L64 131.1C64 94 94 64 131.1 64C152.2 64 172 73.9 184.7 90.8L192 100.6L199.3 90.8C212 73.9 231.8 64 252.9 64z" /></svg>
                        {ad.category ? ad.category.name : null}
                    </span>
                    <span className="flex">
                        <svg className="w-6 mr-1 fill-violet-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M466.6 114.2C461.2 115.9 455.3 116 450.4 113.3C444.6 110.1 438.6 107.1 432.6 104.4C422.2 99.7 418.9 86.1 428.5 79.8C443.5 69.9 461.5 64.1 480.8 64.1C533.4 64.1 576 106.7 576 159.3C576 172.5 573.3 185.1 568.4 196.6C563.9 207.1 550 206.4 543.5 197C539.7 191.5 535.7 186.2 531.5 181C528 176.6 527 170.8 527.7 165.2C527.9 163.3 528.1 161.3 528.1 159.3C528.1 133.2 506.9 112.1 480.9 112.1C476 112.1 471.2 112.9 466.7 114.3zM96.5 196.9C90 206.3 76 207 71.6 196.5C66.7 185 64 172.4 64 159.2C64 106.6 106.6 64 159.2 64C178.5 64 196.5 69.8 211.5 79.7C221.1 86 217.8 99.6 207.4 104.3C201.3 107.1 195.4 110 189.6 113.2C184.7 115.9 178.7 115.8 173.4 114.1C168.9 112.7 164.2 111.9 159.2 111.9C133.1 111.9 112 133.1 112 159.1C112 161.1 112.1 163.1 112.4 165C113.1 170.6 112.1 176.4 108.6 180.8C104.4 186 100.4 191.3 96.6 196.8zM496 352C496 254.8 417.2 176 320 176C222.8 176 144 254.8 144 352C144 449.2 222.8 528 320 528C417.2 528 496 449.2 496 352zM460.5 526.5C422.1 557.4 373.2 576 320 576C266.8 576 217.9 557.4 179.5 526.5L137 569C127.6 578.4 112.4 578.4 103.1 569C93.8 559.6 93.7 544.4 103.1 535.1L145.6 492.6C114.6 454.1 96 405.2 96 352C96 228.3 196.3 128 320 128C443.7 128 544 228.3 544 352C544 405.2 525.4 454.1 494.5 492.5L537 535C546.4 544.4 546.4 559.6 537 568.9C527.6 578.2 512.4 578.3 503.1 568.9L460.6 526.4zM344 248L344 342.1L385 383.1C394.4 392.5 394.4 407.7 385 417C375.6 426.3 360.4 426.4 351.1 417L303.1 369C298.6 364.5 296.1 358.4 296.1 352L296.1 248C296.1 234.7 306.8 224 320.1 224C333.4 224 344.1 234.7 344.1 248z" /></svg>
                        {timeAgo}
                    </span>

                </div >


                {
                    ad.isActive ?
                        <div>


                            <Button
                                type={"submit"}
                                clickEvent={onClick}
                            >
                                <CircleX size={18} /> Close ad
                            </Button>

                            <Button href={`/${RoutePath.ADS}/${ad.id}/edit`}>
                                <Pencil size={18} /> Edit
                            </Button>
                        </div>
                        : <span className=" w-fit rounded-full px-5 py-1 font-medium text-md text-white bg-red-500">
                            Ad Closed
                        </span>
                }



            </div >


        </div >
    );
};


export default UserAdCard