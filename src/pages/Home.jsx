import FeaturedMarquee from "@components/featuredMarquee";
import Categories from "./Categories";
import heroBanner from "@assets/hero-banner.png"
import { Button } from "@components/Button";
const Home = () => {
    return (
        <>
            {/* <h1 className="text-center text-5xl my-10">Home Page</h1> */}
             {/* <div className=" hero-banner max-w-7xl mt-10 mx-2 md:mx-auto p-px rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-500/30">
            <div className="flex flex-col items-center justify-center text-center py-12 md:py-16 rounded-[15px] bg-gradient-to-r from-[#F3EAFF] to-[#E1EFFF]">  
                
                <h2 className="text-2xl md:text-6xl font-light mt-2 leading-[1.2]">
                    Quick finds <br />
                    <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-bold">Quicker Buys.</span> 
                </h2>
                <p className="text-zinc-500 mt-2 max-w-lg max-md:text-md">Easily find or list everything from cars to cameras right in your neighborhood.</p>
                <Button href={'/ads'}>
                                Explore Ads
                            </Button>
            </div>
        </div> */}

            <div class="hero-banner p-10">
                <div class="relative isolate px-6 py-10 lg:px-">
                    <div class="mx-auto max-w-2xl py-10 sm:py-10 lg:py-10">
                        <div class="text-center">
                            {/* <h1 class=" font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                                <span className="text-8xl mb-5  block">Quick finds,</span>


                                <span className="text-6xl"> quicker buys.
                                </span>

                            </h1> */}
                             <h2 className="text-2xl md:text-6xl font-light mt-2 leading-[1.2]">
                    Quick finds <br />
                    <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-bold">Quicker Buys.</span> 
                </h2>
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