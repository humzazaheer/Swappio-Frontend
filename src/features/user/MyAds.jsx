
import { useAuth } from "@context/AuthContext";
import UserAdCard from "@components/UserAdCard";
import useAdsFetchByUser from "@hooks/useAdsFetchByUser";



const MyAds = () => {
    const { user } = useAuth();
    const ads = useAdsFetchByUser(user.id);
    console.log(ads);


    return (
        <section id="my-ads-section" className="max-w-[1000px] mx-auto mt-5">
            <h2 className="text-4xl text-center font-bold text-slate-700 pb-4">
                My Ads
            </h2>

            {ads.filter((ad) => ad.isActive === true).map((ad) => (
                <UserAdCard key={ad.id} ad={ad} />
            ))}


        </section>
    );
};

export default MyAds;