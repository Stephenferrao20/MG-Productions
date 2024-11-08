import React from 'react'

function MusicFooter() {
  return (
    
<main class="flex min-h-screen w-full items-center justify-center">
    
    <article class="group relative flex h-[12rem] w-[50rem] overflow-hidden rounded-2xl bg-[#3a4448]">
        
        <aside class="absolute right-0 flex h-full flex-col justify-center space-y-8 p-3">
            
            <svg class="invisible h-7 w-7 text-stone-200 opacity-0 transition-all hover:scale-[120%] hover:text-white group-hover:visible group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>

            
            <svg class="invisible h-7 w-7 text-stone-200 opacity-0 transition-all hover:scale-[120%] hover:text-white group-hover:visible group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
        </aside>

        
        <div class="absolute inset-y-0 left-0 w-48">
            <img src="https://unsplash.it/id/1/640/425" alt="" class="h-full w-full object-cover object-center opacity-95" />

            <div class="invisible absolute inset-0 flex h-full w-full items-center justify-center bg-[#0c0c0c]/70 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <svg class="h-w-14 w-14 cursor-pointer text-white transition-all hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                </svg>
            </div>
        </div>

        
        <div class="absolute inset-y-0 left-44 w-[39rem] overflow-hidden rounded-2xl transition-all group-hover:w-[36rem]">
            
            <div style="background-image: url('https://unsplash.it/id/1/640/425')" class="h-full w-full bg-cover bg-center">
                <div class="h-full w-full bg-[#455055]/80 transition-all group-hover:bg-[#31383b]/80"></div>
            </div>

            
            <section class="absolute inset-0 flex flex-col justify-between p-4 text-white">
                <header class="space-y-1">
                    <div class="text-3xl font-medium">Smokin Out The Window</div>
                    <div class="font-medium">by Bruno Mars, Anderson .Paak, Silk Sonic</div>
                    <div class="text-sm">
                        mapped by
                        <a href="#" class="text-[#96bacc] transition-all hover:text-yellow-400">Ryafuka</a>
                    </div>
                </header>

                <div class="invisible flex space-x-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <span class="flex items-center space-x-1">
                        
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <div>33</div>
                    </span>

                    
                    <span class="flex items-center space-x-1">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>75.7k</div>
                    </span>

                    
                    <span class="flex items-center space-x-1">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>25 Mar 2022</div>
                    </span>
                </div>

                <div class="flex space-x-2">
                    <span class="rounded-full bg-[#86ff5f] px-2 font-medium text-stone-900">RANKED</span>
                    <div class="flex items-center space-x-1">
                        <span class="h-5 w-2 rounded-full bg-red-500"></span>
                        <span class="h-5 w-2 rounded-full bg-green-500"></span>
                        <span class="h-5 w-2 rounded-full bg-yellow-500"></span>
                    </div>
                </div>
            </section>
        </div>
    </article>
</main>
  )
}

export default MusicFooter
