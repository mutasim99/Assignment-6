const loadcategories = async() =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await response.json()
    displayCategories(data.categories);
}

const displayCategories = (datum)=>{
    
    const categoryBtn = document.getElementById('category-btn-container')
    datum.forEach((item) =>{
        const div = document.createElement('div')
        
        div.innerHTML = `
            <div class="flex justify-center items-center gap-2 btn">
                <div>
                    <img class="w-10" src=${item.category_icon} alt="">
                </div>
                <div>
                    <button  onClick="loadCategoryData('${item.category}')" class=" px-2 py-4">
                       ${item.category} 
                    </button>
                </div>
            </div>
        `
        categoryBtn.append(div)
    })
}




const displayPetCategories =(category) =>{
     
    document.getElementById('spinner').style.display ='none'
    if (category) {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(data =>{
            displaytPets(data.data)
        })
    }
}

const loadCategoryData =(category) =>{
    console.log(category);
    document.getElementById('spinner').style.display = 'block'
    setTimeout(() =>{
       displayPetCategories(category)
    },2000)
    
}

const loadPets =async()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await response.json()
    displaytPets(data.pets);
}

const displaytPets =(pets) =>{
    const petContainer = document.getElementById('pet-container')
    petContainer.innerHTML = ""

    if (pets.length === 0) {
        petContainer.classList.remove("grid")
        petContainer.innerHTML = `
            <div class=" mt-8 px-20 py-10  min-h-[300px] mx-auto flex-col justify-center items-center gap-5 bg-[#13131308] rounded-xl">
                    
                        <div class="flex justify-center">
                            <img class="text-center"  src="images/error.webp">
                        </div>
                        <h3 class="text-2xl font-semibold mt-6 text-center">No information Available</h3>
                        <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    
            </div>
        
        `
        return;
    }
    pets.forEach((pet)=>{
        petContainer.classList.add("grid")
        console.log(pet);
        const div = document.createElement('div')
        const {image, pet_name,breed,date_of_birth,gender,price,petId} = pet
        const displayBreed = breed ? breed : ''
        const displaydateOfbirth = date_of_birth ? date_of_birth : "27-07-2020"
        const displayPrice = price ? price : '250$'
        div.innerHTML =`
            <div class="card  mt-6 w-11/12 mx-auto shadow-xl">
                <figure class="h-[200px] ">
                  <img  src=${image} alt="Shoes" class="w-full h-full object-cover rounded-3xl px-6 py-0" />
                </figure>
               <div class="px-6 py-0">
                   <h2 class="text-2xl font-semibold mt-2">${pet_name}</h2>
                   <div class="flex mb-1 items-center">
                      <img class="w-6" src="https://img.icons8.com/?size=48&id=Cr0CEBmX9Lvd&format=png"
                      <p class="text-[#131313]">Breed: ${displayBreed}</p>
                    </div>
                   <div class="flex mb-1 gap-0.5 items-center">
                      <img class="w-6" src="https://image.shutterstock.com/image-vector/calendar-icon-isolated-on-white-260nw-1029401170.jpg"
                      <p class="text-[#131313]">Birth: ${displaydateOfbirth}</p>
                    </div>
                   <div class="flex mb-1 gap-0.5 items-center">
                      <img class="w-6" src="https://img.icons8.com/?size=64&id=OAEgiuFMPnId&format=png">
                      <p class="text-[#131313]">Gender: ${gender}</p>
                    </div>
                 <div class="">
                   <div class="flex mb-2 gap-0.5 items-center">
                      <img class="w-6" src="https://img.icons8.com/?size=48&id=85782&format=png">
                      <p class="text-[#131313]">price: ${displayPrice}</p>
                    </div>
                 <div class="grid grid-cols-3 gap-4 mb-4">
                    <button class="btn">
                        <img class="w-8" src="https://img.icons8.com/?size=48&id=82788&format=png">
                    </button>
                    <button class="btn text-[#0E7A81] text-xl">Adopt</button>
                    <button class="btn text-[#0E7A81] text-xl" onClick="showModal('${petId}')">Details</button>
                    
                 </div>
               </div>
            </div>
        `
        petContainer.appendChild(div)
    })
}

const showModal = async(petId) =>{
    const modalContainer = document.getElementById('modal-container')
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data = await response.json()
    console.log(data.petData);
    const {image, pet_name, breed, gender, vaccinated_status, date_of_birth, price, pet_details}= data.petData
    const displaydateOfbirth = date_of_birth ? date_of_birth : "27-07-2020"
    const displayBreed = breed ? breed : ''
    const displayPrice = price ? price : '250$'
    const vaccinatedStatus = vaccinated_status ? vaccinated_status : 'fully'
    modalContainer.innerHTML =`
        <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <img class ="w-full" src ="${image}">
                <p class="py-4 text-2xl font-semibold">${pet_name}</p>
                <div class="flex gap-4">
                    <div>
                        <div class="flex mb-1 items-center">
                            <img class="w-6" src="https://img.icons8.com/?size=48&id=Cr0CEBmX9Lvd&format=png"
                            <p class="text-[#131313]">Breed: ${displayBreed}</p>
                        </div>
                        <div class="flex mb-1 gap-0.5 items-center">
                            <img class="w-6" src="https://img.icons8.com/?size=64&id=OAEgiuFMPnId&format=png">
                            <p class="text-[#131313]">Gender: ${gender}</p>
                        </div>
                        <div class="flex mb-1 gap-0.5 items-center">
                            <img class="w-6" src="https://img.icons8.com/?size=64&id=OAEgiuFMPnId&format=png">
                            <p class="text-[#131313]">Vaccinated status : ${vaccinatedStatus}</p>
                        </div>
                        
                    </div>
                    <div>
                        <div class="flex mb-1 gap-0.5 items-center">
                            <img class="w-6" src="https://image.shutterstock.com/image-vector/calendar-icon-isolated-on-white-260nw-1029401170.jpg">
                            <p class="text-[#131313]">Date of birth : ${displaydateOfbirth}</p>
                        </div>
                        <div class="flex mb-1 gap-0.5 items-center">
                            <img class="w-6" src="https://img.icons8.com/?size=48&id=85782&format=png">
                            <p class="text-[#131313]">Price : ${displayPrice}</p>
                        </div>
                        
                    </div>
                </div>

                <h3 class="text-[20px] font-semibold mt-8">
                    Details information
                </h3>
                <p>
                    ${pet_details}
                </p>
                <div class="modal-action">
                       <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <div class="w-full">
                                <button class="btn">Close</button>
                            </div>
                        </form>
                </div>
            </div>
        </dialog>
    
    `
    my_modal_5.showModal()
}
loadcategories()
loadPets()