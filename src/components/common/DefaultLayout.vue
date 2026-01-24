<!-- Default home layout with sidebar, topbar & content: It should be mobile responsive -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Topbar -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold">WottPay</h1>
        <!-- Add topbar content here -->
      </div>
    </header>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-100 p-4 hidden md:block">
        <nav>
          <ul>
            <li class="mb-2">
              <a href="#" class="text-gray-700 hover:text-gray-900">Home</a>
            </li>
            <li class="mb-2"><a href="#" class="text-gray-700 hover:text-gray-900">Payments</a></li>
            <li class="mb-2"><a href="#" class="text-gray-700 hover:text-gray-900">Settings</a></li>
            <!-- Add more sidebar links here -->
          </ul>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 p-6 bg-white">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
