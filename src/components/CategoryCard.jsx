import React from "react";
import { Button } from "./Button";
import { RoutePath } from "../routes/routes";

export const CategoryCard = ({ category }) => {
    const [visible, setVisible] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const divRef = React.useRef(null);

    const handleMouseMove = (e) => {
        const bounds = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };



    return (
        // <div key={category.id} ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
        //     className="relative rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer"
        // >
        //     {visible && (
        //         <div className="pointer-events-none blur-xl bg-gradient-to-r from-blue-400 via-violet-500 to-purple-500 size-60 absolute z-0 transition-opacity duration-300"
        //             style={{ top: position.y - 120, left: position.x - 120, }}
        //         />
        //     )}

        //     <div className="relative z-10 bg-white h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center">
        //         <img src={`https://placehold.co/500x500/ddd6ff/5d0ec0?text=${category.name}`} alt="Category Image" className="w-100  mb-5 rounded-lg" />


        //         <h2 className="text-2xl font-bold text-gray-800 mb-1">{category.name}</h2>


        //         <Button
        //             type={"submit"}
        //             href={`/${RoutePath.ADS}/${RoutePath.CATEGORY}/${category.id}`}
        //             name={"login-btn"}
        //             btnClass={'flex items-center max-w-fit justify-center gap-5 mt-2 mb-5 bg-linear-to-r from-violet-600 to-violet-800 hidden md:flex bg-violet-600 text-white px-5 py-2 rounded-full text-md font-medium hover:bg-violet-700 transition cursor-pointer'}
        //             btnText={'Explore'}
        //         />
        //     </div>

        // </div>



        <a className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition"
            href={`/${RoutePath.ADS}/${RoutePath.CATEGORY}/${category.id}`}>
            <div className="p-4 md:p-5">
                <div className="flex justify-between items-center gap-x-3">
                    <div className="grow">
                        <div className="flex items-center gap-x-3">
                            <img className="size-15 rounded-full" src={`https://placehold.co/500x500/ddd6ff/5d0ec0?text=${category.name}`} alt="Avatar" />
                            <div className="grow">
                                <h3 className="group-hover:text-violet-700 font-semibold text-gray-800">
                                    {category.name}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div>
                        <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </div>
                </div>
            </div>
        </a >




    );
}
