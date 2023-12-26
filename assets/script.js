//Select all elements with the class "scroller"
const scrollers = document.querySelectorAll(".scroller");

//check if the user prefers reduced motion
if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    
    //If not, add the animation
    addAnimation();
}

//Function to add the animation
function addAnimation(){

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

//Function to fetch and read JSON data
function readJson(){
    //Select the HTML element with the class "exploreSectionItems"
    const sectionItems = document.querySelector(".exploreSectionItems");

    //Fetch JSON data from the specified url
    fetch('./assets/content.json').then(response => {

        //Check if the response is okay, otherwise throw an error
        if(!response.ok){
            throw new Error();
        }

        //Parse the JSON data and return the result
        return response.json();
    }).then(data => {

        //Iterate over the data and add items to the HTML
        for(x = 0; x < data.length; x++){
            addItemsToHTML(sectionItems, data[x].author, data[x].authorImage, data[x].image, data[x].price);
        }
    })
    .catch(error => {
        //Handle errors, if the connection to JSON failed
        console.log("Connection to JSON failed.");
    });
}

//Function to add items to HTML
function addItemsToHTML(sectionItems, authorName,authorImage, image, price){
    //Append HTML content to the "exploreSectionItems" element
    sectionItems.innerHTML += '<div class="item">'+
                                '<img src="'+image+'" alt="Image">'+
                                '<div class="itemContent">'+
                                    '<span class="itemAuthor"> <img src="'+authorImage+'" alt="Profile">'+authorName+'</span>'+
                                    '<span class="itemPrice">$'+price+'</span>'+
                                '</div>'
}

//Call the readJson function to fetch and process JSON data
readJson();