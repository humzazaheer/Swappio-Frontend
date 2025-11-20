import React from "react";
import { Button } from "@components/Button";
import { RoutePath } from "../routes/routes";
import useTimeAgo from "@hooks/useTimeAgo";

export const AdCard = ({ ad ,csutomClass}) => {
    const timeAgo = useTimeAgo(ad.updatedAt);

    const [visible, setVisible] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const divRef = React.useRef(null);

    const handleMouseMove = (e) => {
        const bounds = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };

    const price = ad.price;

    const formattedPrice = new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
    }).format(price);



    return (
        <div key={ad.id} ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
            className={`relative  rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer ${csutomClass}`}
        >
            {visible && (
                <div className="pointer-events-none blur-xl bg-gradient-to-r from-blue-400 via-violet-500 to-purple-500 size-60 absolute z-0 transition-opacity duration-300"
                    style={{ top: position.y - 120, left: position.x - 120, }}
                />
            )}

            <div className="relative z-10 bg-white h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center">
                <img src={`https://placehold.co/500x500/ddd6ff/5d0ec0?text=${ad.title}`} alt="Profile Avatar" className="mb-5 rounded-lg" />

                <p class="text-md text-violet-600 mb-2">{ad.__location__ ? ad.__location__.name : null} | {ad.__category__ ? ad.__category__.name : null}  </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-1">{ad.title}</h2>
                {/* <p className="text-md text-violet-500 font-medium mb-4">Software Developer</p> */}
                <p className="text-md text-gray-500 mb-4 px-4">
                    {ad.description}
                </p>
                <p class='text-xl text-violet-600 font-bold'> {formattedPrice}</p>
                <p className="text-md text-gray-500 my-2 px-4">
                    {timeAgo}
                </p>


                <Button
                    type={"submit"}
                    href={`/${RoutePath.ADS}/${ad.id}`}

                    name={"login-btn"}
                    btnClass={'flex items-center max-w-fit justify-center gap-5 mt-2 mb-5 bg-linear-to-r from-violet-600 to-violet-800 hidden md:flex bg-violet-600 text-white px-5 py-2 rounded-full text-md font-medium hover:bg-violet-700 transition cursor-pointer'}
                    btnText={"Explore"}
                />
            </div>

        </div>
    );
}