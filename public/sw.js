const CACHE_NAME = 'price-ai-v1.0.0';
const urlsToCache = [
  '/',
  '/priceai',
  '/admin',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/assets/images/final_quest_240x240.png',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('PRICE.AI Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('PRICE.AI Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('PRICE.AI Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('PRICE.AI Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('PRICE.AI Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New price alert from PRICE.AI!',
    icon: '/assets/images/final_quest_240x240.png',
    badge: '/assets/images/final_quest_240x240.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Check Prices',
        icon: '/assets/images/final_quest_240x240.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/final_quest_240x240.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('PRICE.AI Alert', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('PRICE.AI Notification clicked');
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/priceai')
    );
  } else if (event.action === 'close') {
    event.notification.close();
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('PRICE.AI Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Sync offline data when connection is restored
  return fetch('/api/sync')
    .then(response => response.json())
    .then(data => {
      console.log('PRICE.AI Background sync completed:', data);
    })
    .catch(error => {
      console.error('PRICE.AI Background sync failed:', error);
    });
}