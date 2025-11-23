

const Loading = () => {

    return (

        <div class="animate-pulse w-4xl flex mx-auto mt-20 space-x-4">
            {/* <div class="rounded-full bg-violet-200 h-10 w-10"></div> */}
            <div class="flex-1 space-y-6 py-1">
                <div class="h-3 bg-violet-200 rounded"></div>
                <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-violet-200 rounded col-span-2"></div>
                        <div class="h-3 bg-violet-200 rounded col-span-1"></div>
                    </div>
                    <div class="h-3 bg-violet-200 rounded"></div>
                     <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-violet-200 rounded col-span-2"></div>
                        <div class="h-3 bg-violet-200 rounded col-span-1"></div>
                    </div>
                    <div class="h-3 bg-violet-200 rounded"></div>
                     <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-violet-200 rounded col-span-2"></div>
                        <div class="h-3 bg-violet-200 rounded col-span-1"></div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Loading;


