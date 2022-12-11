const headerElement = document.querySelector("header");

const options = {
    // Vertical tolerance for scroll in px (How soon will header hides/appears)
    tolerance : {
        // For scrolling up
        up : 0,
        // For scrolling down
        down : 5
    },
    // Vertical offset in px before element is first unpinned
    offset: 100
};

// Creating and initializing Headroom on header
const headroom = new Headroom(headerElement, options);
headroom.init();