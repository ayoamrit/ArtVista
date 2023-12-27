//Select all elements with the class "scroller"
const scrollers = document.querySelectorAll(".scroller");

//check if the user prefers reduced motion
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    //If not, add the animation
    addAnimation();
}

//Function to add the animation
function addAnimation() {

    //Loop through each element with the class "scoller"
    scrollers.forEach((scroller) => {

        //Set an attribute to mark the element as animated
        scroller.setAttribute("data-animated", true)

        //Find the inner content of the scoller
        const scrollerInner = scroller.querySelector(".scroller_inner");
        //Get an array of children elements inside the scroller
        const scrollerContent = Array.from(scrollerInner.children);

        //Duplicate each child element and append it to the end
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);

            //Append the duplicated item to the end of the scroller
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}



//Init itemCount and body variables
let itemCount = 1;
let body = document.body;

//Function to fetch and read JSON data
function readJson() {
    //Select the HTML element with the class "exploreSectionItems"
    const sectionItems = document.querySelector(".exploreSectionItems");

    //Fetch JSON data from the specified url
    fetch('content.json').then(response => {

        //Check if the response is okay, otherwise throw an error
        if (!response.ok) {
            throw new Error();
        }

        //Parse the JSON data and return the result
        return response.json();
    }).then(data => {

        //Iterate over the data and add items to the HTML
        for (x = 0; x < data.length; x++) {
            addItemsToHTML(sectionItems, data[x].author, data[x].authorImage, data[x].image, data[x].price, data[x].profession);
        }
    })
        .catch(error => {
            //Handle errors, if the connection to JSON failed
            console.log("Connection to JSON failed.");
        });
}

//Function to add items to HTML
function addItemsToHTML(sectionItems, authorName, authorImage, backgroundImage, artPrice, authorProfession) {
    //Append HTML content to the "exploreSectionItems" element
    sectionItems.innerHTML += '<div class="item ' + getClassName() + '">' +
        '<img src="' + backgroundImage + '" alt="Image">' +
        '<div class="itemContent">' +
        '<span class="itemAuthor"> <img src="' + authorImage + '" alt="Profile">' + authorName + '</span>' +
        '<span class="itemPrice">$' + artPrice + '</span>' +
        '</div>';
    const getItem = sectionItems.querySelector("." + getClassName());
    getItem.setAttribute("onclick", "run('" + authorName + "', '" + authorImage + "', '" + backgroundImage + "', '" + authorProfession + "')");
    itemCount++;
}

//Function to display modal with selected item details
function run(authorName, authorImage, backgroundImage, authorProfession) {
    const selectedItem = document.querySelector(".selectedItem");
    const setAuthorImage = document.querySelector(".authorImage");
    const setAuthorName = document.querySelector(".authorName");
    const setImage = document.querySelector(".selectedImage");
    const setAuthorProfession = document.querySelector(".authorProfession");

    //Set content in the modal
    setAuthorImage.style.backgroundImage = 'url("' + authorImage + '")';
    setImage.style.backgroundImage = 'url("' + backgroundImage + '")';
    setAuthorName.innerHTML = authorName;
    setAuthorProfession.innerHTML = authorProfession;

    //Display the modal
    selectedItem.style.display = "block";

    //Disable scrolling on the body
    body.style.overflow = "hidden";
}

//Fucntion to hide modal
function disable() {
    const selectedItem = document.querySelector(".selectedItem");

    //Hide the modal
    selectedItem.style.display = "none";
    //Enable scrolling on the body
    body.style.overflow = "scroll";

}

//Function to generate a unique class name
function getClassName() {
    return "_" + itemCount;
}

//Call the readJson function to fetch and process JSON data
readJson();