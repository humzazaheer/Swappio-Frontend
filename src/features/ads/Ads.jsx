import { AdCard } from "@components/AdCard";
import useAds from "@hooks/useAds";
import useCategories from "@hooks/useCategories";

import { Dropdown, DropdownItem } from "@components/Dropdown";
import { CardSkeleton } from "@components/CardSkeleton";



const Ads = () => {
    const ads = useAds();

    const categories = useCategories();

    console.log("ADS FROM HOOK:", ads);

    if (!ads) return (
        <div className="grid grid-cols-4 grid-rows-3 mt-5 gap-5">
            {[...Array(12)].map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );

    return (
        <section id="ads-section" className="max-w-[1300px] mx-auto mt-5">
            <h1 className="text-center text-5xl font-bold my-10">Ads</h1>

            <div className="text-right">
                <Dropdown label={'Sort'}>
                    {categories.map((category) => (
                        <DropdownItem href={''}>
                            {category.name}
                        </DropdownItem>
                    ))}


                </Dropdown>
            </div>

            <div className="grid grid-cols-3 grid-rows-3 mt-5 gap-5">
                {ads.map((ad) => (
                    <AdCard ad={ad} />
                ))}
            </div>
        </section>
    );
};

export default Ads;
