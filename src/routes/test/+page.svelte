<div class="text-gray-600 grid md:grid-cols-6">
	<div class="md:col-span-1 md:flex md:justify-end">
		<nav class="text-right">
			<div class="flex justify-between items-center">
				<h1 class="font-bold uppercase p-4 border-b border-gray-100">
				<a href="/" class="hover:text-gray-900">Food Ninja</a>
				</h1>
				<div class="-4 cursor-pointer md:hidden" id="burger">
					<svg class="w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
					  </svg>
				</div>
			</div>
			<ul class="text-sm mt-6 hidden md:block" id="menu">
				<li class="text-gray-700 font-Tangerine py-1">
					<a href="/" class="px-4 flex justify-end border-r-4 border-primary">
						<span>Home</span>
						<svg class="w-5 ml-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
						  </svg>
					</a>
				</li>
				<li class="py-1">
					<a href="/" class="px-4 flex justify-end border-r-4 border-white">
						<span>About</span>
						<svg class="w-5 ml-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"></path>
						  </svg>
					</a>
				</li>
				<li class="py-1">
					<a href="/" class="px-4 flex justify-end border-r-4 border-white">
						<span>Contact</span>
						<svg class="w-5 ml-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
						  </svg>
					</a>
				</li>
			</ul>
		</nav>
	</div>
	<main class="md:px-16 sm:px-10 xs:px-5 py-6 bg-gray-100 md:col-span-5">
		<div class="flex justify-center md:justify-end text-gray-500">
			<a href="/" class="btn border-primary md:border-2 hover:bg-primary hover:text-red-500 transition ease-out duration-500">Login</a>
			<a href="/" class="btn ml-2 border-primary md:border-2 hover:bg-primary hover:text-red-500 transition ease-out duration-500">Sign up</a>
			<a href="/" class="btn ml-2 border-primary md:border-2 hover:bg-primary hover:text-red-500 transition ease-out duration-500">Home</a>
		</div>
			
		<header>
			<h2 class="text-gray-700 text-6xl font-semibold">Recipes</h2>
			<h3 class="text-2xl font-semibold">For Ninjas</h3>
		</header>

		<div>
			<h4 class="font-bold mt-12 pb-2 border-b border-gray-200">Latest Recipes</h4>
			<div class="mt-8 grid lg:grid-cols-3 gap-10">
				<!-- <RecipeCard /> -->
				<div class="card">
					<img class="w-full h-50 object-cover" src="/food1.jpg" alt="recipe" />
					<div class="m-4">
						<span class="font-bold">Grand groupe de fruits, légumes, céréales</span>
						<span class="block text-gray-500 text-sm">by fcafotodigital</span>
					</div>
					<div class="badge">
						<svg class="w-5 inline-block" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<span>25 mins</span>
					</div>
				</div>
				<div class="card">
					<img class="w-full h-50 object-cover" src="/food2.jpg" alt="recipe" />
					<div class="m-4">
						<span class="font-bold">Déjeuner avec salade fraîche et amuse-gueules</span>
						<span class="block text-gray-500 text-sm">by Dreamer Company</span>
					</div>
					<div class="badge">
						<svg class="w-5 inline-block" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<span>12 mins</span>
					</div>
				</div>
				<div class="card">
					<img class="w-full h-50 object-cover" src="/food3.jpg" alt="recipe" />
					<div class="m-4">
						<span class="font-bold">Délicieux repas sur une assiette noire</span>
						<span class="block text-gray-500 text-sm">by nortonrsx</span>
					</div>
					<div class="badge">
						<svg class="w-5 inline-block" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
   						</svg>
						<span>15 mins</span>
					</div>
				</div>
			</div>

			<h4 class="font-bold mt-12 pb-2 border-b border-gray-200">Most Popular</h4>
			<div class="mt-8">
				<!-- <RecipeCard /> -->

			</div>

			<div class="flex justify-center">
				<div class="btn bg-primary hover:shadow-inner transform hover:scale-125 hover:bg-opacity-50 transition ease-out duration-300">
					Load More
				</div>
			</div>
		</div>
	</main>
</div>
