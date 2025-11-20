import { AdCard } from "@components/AdCard";
import useAdsFetcher from "@hooks/useAdsFetcher";

const FeaturedMarquee = ({cat_id}) => {
    const ads = useAdsFetcher(cat_id);


    return (
        <>
            <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 40s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>
            <h2 className="text-center font-bold text-4xl mt-15">Featured Ads</h2>

            <div className="marquee-row w-full  overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex gap-4 transform-gpu pt-10 pb-5">
                    {ads.map((ad) => (
                        <AdCard csutomClass={'min-w-[350px]'} key={ad.id} ad={ad} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>


        </>
    )
}


export default FeaturedMarquee;