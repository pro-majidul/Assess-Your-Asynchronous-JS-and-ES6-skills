// change the website color
const htmlTag = document.getElementsByTagName('html')[0];
htmlTag.setAttribute("data-theme", "light")

// globar variable 
let sortVariableData = [];

//  catch all categorys button 
const categorysButtonAPI = () => {
    document.getElementById('spinner').classList.remove('hidden');
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                categoryButton(data.categories)
            }, 2000)
        })
}


const categoryButton = (buttons) => {
    document.getElementById('spinner').classList.add('hidden');
    const categorybtnField = document.getElementById('best-friend-card');
    buttons.forEach(element => {
        const cards = document.createElement('div');
        cards.innerHTML = `
            <button id="Change-${element.category}" onclick="findItems('${element.category}')" class=" flex border justify-center w-56 shadow-xl ChangeColorBtn h-16 items-center rounded-xl bg-transparent m-3 hover:bg-btnColor  border-btnColor">
            <img src="${element.category_icon}" alt="" class=" w-8 ">
            <span class="text-xl ml-2 font-bold">${element.category}</span>
            </button>
        
        `;
        categorybtnField.appendChild(cards);

    });

}


// click category  button and Catch  the category API by onclick function
const findItems = (item) => {
    document.getElementById('spinner').classList.remove('hidden');
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${item}`)
        .then(res => res.json())
        .then(data => {
            changeColorButton();
            const buttonColor = document.getElementById(`Change-${item}`);
            buttonColor.classList.add("bg-green-500");
            const pedsCardField = document.getElementById('card-container');
            pedsCardField.innerHTML = '';
            setTimeout(() => {
                pedsCard(data.data);
            }, 2000)

        });

}
// click category button and change button color by className
const changeColorButton = () => {
    const classNumber = document.getElementsByClassName("ChangeColorBtn");
    for (const items of classNumber) {
        items.classList.remove("bg-green-500");
    }
}


// // desending the peds card by click short button 
const DesendingPrize = () => {
    document.getElementById('spinner').classList.remove('hidden');
    const pedsCardField = document.getElementById('card-container');
    pedsCardField.innerHTML = '';

    setTimeout(() => {
        const sortItems = sortVariableData.sort((a, b) => b.price - a.price);
        pedsCard(sortItems)
    }, 2000)

}



//  catch all peds card categorys 
const allPedsCardAPI = (search) => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            sortVariableData = data.pets;
            setTimeout(() => {
                pedsCard(data.pets, search)
            }, 2000)

        })
}
const pedsCard = (cardsField) => {
    document.getElementById('spinner').classList.add('hidden');
    const pedsCardField = document.getElementById('card-container');
    pedsCardField.innerHTML = '';
    if (cardsField == false) {
        pedsCardField.classList.remove('md:grid')
        pedsCardField.innerHTML = `
       <div class="flex flex-col justify-center items-center gap-10 min-h-[500px] ">
            <img src="./images/error.webp"/>
            <h3 class=" text-3xl font-bold  text-gray-900">No Information Available </h3>
            <p class="text-center text-primaryColor">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `
        return;
    } else {
        pedsCardField.classList.add('md:grid')
    }
    cardsField.forEach(ele => {
        const cards = document.createElement('div');
        cards.innerHTML = `
            <div class="card mb-2 bg-base-100 border shadow-xl">
                        <div class="p-3">
                            <img class="rounded-xl"
                                src="${ele.image}"
                                alt="Shoes" />
                            <h2 class="card-title py-1">${ele.category ? ele.category : "Not available"}</h2>
                            <div class="flex gap-2 py-1">
                                <img src="./images/Frame.png" alt="">
                                <p class="font-semibold text-primaryColor">Breed:   ${ele.breed ? ele.breed : "Unknown"}</p>
                            </div>
                            <div class="flex gap-2 py-1">
                                <img src="./images/Frame (1).png" alt="">
                                <p class="font-semibold text-primaryColor">Birth Date:   ${ele.date_of_birth ? ele.date_of_birth : "Not available"}</p>
                            </div>
                            <div class="flex gap-2 py-1">
                                <img src="./images/Frame (2).png" alt="">
                                <p class="font-semibold text-primaryColor">Gender:   ${ele.gender ? ele.gender : "Not available"}</p>
                            </div>
                            <div class="flex gap-2 py-1">
                                <img src="./images/Frame (3).png" alt="">
                                <p class="font-semibold text-primaryColor ">Price: <span class="totalPrize"> ${ele.price ? ele.price : "Not available"}</span> </p>
                            </div>
                            <div class="divider py-1"></div>
                            <div class=" flex gap-1 justify-between">
                                <button onclick="clickedLikeBtn('${ele.image}')" class="px-3 py-1 border rounded-xl hover:bg-green-900 hover:text-white bg-transparent shadow-lg"><img src="https://img.icons8.com/?size=48&id=U6uSXVbuA1xU&format=png" alt=""></button>

                                <button onclick="ClickedAdoptButton()" class="px-3 py-1 border rounded-xl hover:bg-green-900 hover:text-white bg-transparent shadow-lg text-btnColor font-bold">Adopt</button>

                                <button onclick="buttonDetails('${ele.petId}')" class="px-3 py-1 border rounded-xl hover:bg-green-900 hover:text-white bg-transparent shadow-lg text-btnColor font-bold">Details</button>
                            </div>

                        </div>


                    </div>
        `;
        pedsCardField.appendChild(cards);
    })

}

// when  clicked like button then this card image set the right side container 
const clickedLikeBtn = (image) => {
    const imageContainer = document.getElementById('image-container');
    const imagebox = document.createElement('div');
    imagebox.innerHTML = `
        <img class="mb-3 rounded-xl" src="${image}"/>
    `;
    imageContainer.appendChild(imagebox);
}

// when clcik adapt button then open modal and coundown then button disabled
const ClickedAdoptButton = () => {
    const adoptModalContainer = document.getElementById('adopted-modal-counter');

    adoptModalContainer.innerHTML = `
            <dialog id="my_modal_2" class="modal">
                <div class="modal-box">
                    <div class="flex items-center justify-center">
                        <img  src="https://img.icons8.com/?size=80&id=1uCsWwHwYEGZ&format=png"/>
                    </div>
                    <h3 class="text-4xl text-center font-extrabold">Congrats!</h3>
                    <p  class="py-4 capitalize font-bold text-center">adoptions process is start for your pets</p>
                    <p class="text-2xl font-bold text-center" id="count-text">3</p>
                </div>
            </dialog>
        `;
    my_modal_2.showModal()
    let sum = 3;
    const interval = setInterval(() => {
        sum--;
        document.getElementById('count-text').innerText = sum;
    }, 1000)
    setTimeout(() => {
        clearInterval(interval);
        my_modal_2.close()
    }, 2000)



}

//  catch the peds details id and when click a detail button then open a modal to show this card details by details API
const buttonDetails = async (pedsid) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${pedsid}`);
    const data = await res.json();
    const { breed, date_of_birth, price, image, gender, pet_details, vaccinated_status, pet_name } = (data.petData);

    const showModalContainer = document.getElementById('show-modal-container')
    showModalContainer.innerHTML = `
     <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <img class="rounded-xl w-full" src="${image}"/>
            <h3 class="text-2xl font-bold mt-3">${pet_name}</h3>
            <div class="md:grid grid-cols-2">
                        <div class="flex gap-2 py-1">
                            <img class="" src="./images/Frame.png" alt="">
                            <p class="font-semibold text-primaryColor">Breed:${breed ? breed : "Unknown"}</p>
                        </div>
                        <div class="flex gap-2 py-1">
                            <img src="./images/Frame (1).png" alt="">
                             <p class="font-semibold text-primaryColor">Birth Date:${date_of_birth ? date_of_birth : "Not available"}</p>
                        </div>
                        <div class="flex gap-2 py-1">
                             <img src="./images/Frame (2).png" alt="">
                            <p class="font-semibold text-primaryColor">Gender: ${gender ? gender : "Not available"}</p>
                        </div>

                        <div class="flex gap-2 py-1">
                            <img src="./images/Frame (3).png" alt="">
                            <p class="font-semibold text-primaryColor ">Price: <span class="totalPrize"> ${price ? price : "Not available"}</span> </p>
                         </div>
                         <div class="flex gap-2 py-1">
                             <img src="./images/Frame (2).png" alt="">
                            <p class="font-semibold text-primaryColor">Vaccinated status:${vaccinated_status ? vaccinated_status : "N/A"}</p>
                        </div> 
                    </div>
                      <div class="divider py-1"></div>
                    <p class="font-bold">Details Information</p>
                    <p class="text-primaryColor">${pet_details}</p>
            
            <div class="modal-action">
            <form class="w-full" method="dialog">
                <button class="w-full text-center text-xl hover:bg-btnColor font-bold text-white py-4 bg-primaryColor rounded-3xl">Close</button>
            </form>
            </div>
        </div>
        </dialog>
    `

    my_modal_5.showModal()
}



categorysButtonAPI();
allPedsCardAPI();