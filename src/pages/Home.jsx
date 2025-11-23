import FeaturedMarquee from "@components/featuredMarquee";
import Categories from "./Categories";
import heroBanner from "@assets/hero-banner.png"
import { Button } from "@components/Button";
const Home = () => {
    return (
        <>

            <div class="hero-banner p-10">
                <div class="relative isolate px-6 py-10 lg:px-">
                    <div class="mx-auto max-w-2xl py-10 sm:py-10 lg:py-10">
                        <div class="text-center">
                            <h1 class=" font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                                <span className="text-8xl mb-5  block">Quick finds,</span>


                                <span className="text-6xl"> quicker buys.
                                </span>

                            </h1>
                            <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Easily find or list everything from cars to cameras right in your neighborhood.

                            </p>
                            <div class="mt-10 flex items-center justify-center gap-x-6">
                            <Button href={'/ads'}>
                                Explore
                            </Button>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Categories />

            <FeaturedMarquee cat_id={6} />
        </>
    )
}
export default Home;