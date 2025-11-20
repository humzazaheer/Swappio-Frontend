import { AdCard } from "@components/AdCard";
import useAdsByQuery from "@hooks/useAdsByQuery";

const AdsByQuery = () => {
    const ads = useAdsByQuery();

    console.log("ADS FROM HOOK:", ads);

    if (!ads) return "Loading...";

    if (!ads.length) return <p className="text-center text-3xl mt-10">No ads found.</p>;
    return (
        <section id="ads-section" className="max-w-[1300px] mx-auto mt-5">
            <h1 className="text-center text-5xl font-bold my-10">{ads[0].__category__.name}</h1>

            <div className="grid grid-cols-3 grid-rows-3 gap-5">
                {ads.map((ad) => (
                    <AdCard ad={ad} />
                ))}
            </div>
        </section>
    );
};

export default AdsByQuery;
