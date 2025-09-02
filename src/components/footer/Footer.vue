<template>
  <footer class="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <!-- Column 1: Logo & About -->
      <div>
        <h3 class="text-2xl font-bold text-white mb-4">Pai Nan</h3>
        <p class="text-sm leading-relaxed">
          Pai Nan is a payment gateway that helps your business grow.  
          We help businesses accept multiple payment methods.
        </p>
      </div>

      <!-- Column 2: Product -->
      <div>
        <h4 class="text-white font-semibold mb-4">Product</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="#send" class="hover:text-yellow-400">Send Money</a></li>
          <li><a href="#receive" class="hover:text-yellow-400">Receive Money</a></li>
          <li><a href="#api" class="hover:text-yellow-400">API Products</a></li>
          <li><a href="#integration" class="hover:text-yellow-400">Custom App Integration</a></li>
        </ul>
      </div>

      <!-- Column 3: Documentation -->
      <div>
        <h4 class="text-white font-semibold mb-4">Documentation</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="#docs" class="hover:text-yellow-400">Product Docs</a></li>
          <li><a href="#api-docs" class="hover:text-yellow-400">API Documentation</a></li>
          <li><a href="#support" class="hover:text-yellow-400">Customer Support</a></li>
          <li><a href="#pricing" class="hover:text-yellow-400">Pricing</a></li>
        </ul>
      </div>

      <!-- Column 4: Company -->
      <div>
        <h4 class="text-white font-semibold mb-4">Company</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="#about" class="hover:text-yellow-400">About Us</a></li>
          <li><a href="#career" class="hover:text-yellow-400">Career</a></li>
          <li><a href="#contact" class="hover:text-yellow-400">Contact Us</a></li>
          <li><a href="#terms" class="hover:text-yellow-400">Terms & Conditions</a></li>
          <li><a href="#privacy" class="hover:text-yellow-400">Privacy Policy</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="container mx-auto border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-gray-400">Copyright © 2025 Pai Nan. All rights reserved.</p>

      <!-- Social Icons -->
      <div class="flex space-x-4">
        <a href="#" class="hover:text-yellow-400">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="hover:text-yellow-400">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="hover:text-yellow-400">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="#" class="hover:text-yellow-400">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// If you don’t already have Font Awesome installed, run:
// npm install @fortawesome/fontawesome-free
// then import in main.js: import '@fortawesome/fontawesome-free/css/all.min.css'
</script>
