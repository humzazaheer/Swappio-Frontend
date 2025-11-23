import useCategories from "@hooks/useCategories";
import { CategoryCard } from "../components/CategoryCard";


const Categories = () => {
    const {categories} = useCategories();


    if (!categories) return "Loading...";

    return (
        <section id="ads-section" className="max-w-[1300px] mx-auto mt-20">
            <h2 className="text-center text-4xl font-bold my-10">Categories</h2>

            <div className="max-w-[85rem] px-4   mx-auto">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Categories;