workbox.core.setCacheNameDetails({
    prefix: "enigma_scrum_todo"
});

workbox.routing.registerNavigationRoute('/index.html');

self.addEventListener("message", event => {
    if (event.data === "skipWaiting") {
        self.skipWaiting();
    }
});
