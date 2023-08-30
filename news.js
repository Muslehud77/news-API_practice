// API Links

// All News Category

// URL: https://openapi.programming-hero.com/api/news/categories



// All news in a Category

// URL Format: https://openapi.programming-hero.com/api/news/category/{category_id}

// Example: https://openapi.programming-hero.com/api/news/category/01
// News detail URL:
// URL Format: https://openapi.programming-hero.com/api/news/{news_id}
// Example: https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a
// Missing Data:

// Here, the total view and author name are null
const tabContainer = document.getElementById('tabs')
const cardContainer = document.getElementById('card-container')
const burger = document.getElementById('list-burger')
const progressBar = document.getElementById('progress')
const showAllButton = document.getElementById('showAll')


const handleCategory = async () => {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/news/categories"
    );
    const data = await res.json()
    const cat = data.data.news_category;
    categories(cat);


}
handleCategory()






const categories = cat =>{
    cat.forEach(category => {
       const div = document.createElement('div');
       const li = document.createElement('li')
       li.innerHTML = `<a onclick="detailNews('${category.category_id}')">${category.category_name}</a>`;
       div.innerHTML = `<a onclick="detailNews('${category.category_id}')" class="tab">${category.category_name}</a>`;
       burger.appendChild(li)
        tabContainer.appendChild(div)
        // console.log(category.category_id);
    });
   
}


let btnStatus = false;
const showAll = () =>{
    const id = document.querySelector('.cat').innerText
    console.log(id)
    detailNews(id.innerText);
    btnStatus = true;
}

const detailNews = async (category='08') => {
    cardContainer.innerHTML = "";
    progressBar.classList.remove("hidden");
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${category}`
    );
    const data = await res.json()
    const n = data.data
    showAllButton.classList.remove("hidden");
     showNews(n)
}

 const showNews = (data) => {   
console.log(data)




 let k = data.slice(0, 5)
if(btnStatus){
    k = data
}else{
    k = data.slice(0, 5);
}



  k.length > 8 || k.length == 0 ? showAllButton.classList.add("hidden") : showAllButton.classList.remove("hidden")

   k.forEach((news) => {
     const div = document.createElement("div");
     div.classList = "card h-8/12 bg-base-100 shadow-xl space-y-5";
     div.innerHTML = `
          <img src="${news.thumbnail_url}" class="p-5"/>
  
  <div class="p-5 space-y-5 h-9/12">
    <div class="flex justify-between items-center">
        <h2 class="card-title">${news.title.slice(0, 50)}...</h2>
        <p class="p-3 text-white bg-pink-500 rounded-3xl">${
          news.rating.badge
        }</p>
    </div>
    <div class=""><p>${news.details.slice(0, 150)}....</p> </div>
    <div class="flex justify-between items-center">
       <div class="flex gap-2">
         <div class="avatar online">
  <div class="w-16 rounded-full">
    <img src="${news.author.img}" />
  </div>
 
       </div>
        <div>
    <h3 class="text-xl font-semibold">${news.author?.name || "Unknown"}</h3>
    <p>${news.author.published_date}</p>
  </div>
</div>
<button class="btn bg-black text-white hover:bg-black" onclick="details('${
       news._id
     }')">Details</button>
    </div>
  </div>
        <p class="hidden cat" id="cat">${news.category_id}</p>
        `;

     cardContainer.appendChild(div);
     // console.log(news.author.name)
     // console.log(news.author.published_date);
    //  console.log(news.category_id);

     // console.log(news.image_url);
     // console.log(news.details);
     // console.log(news.thumbnail_url);
     // console.log(news.title);
     // console.log(news.rating.badge);

     
   });
   progressBar.classList.add("hidden");
}

const details = async id =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    const data = await res.json();
    const information = data.data[0]
    console.log(information.details)
    
    
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = ''
    const div = document.createElement('div')
    div.innerHTML = `
    <!-- Open the modal using ID.showModal() method -->

<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
  <img src="${information.thumbnail_url}" class=""/>
    <h3 class="font-bold text-lg">${information.title}</h3>
    <p class="py-4">${information.details}</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
    
    `;
modalContainer.appendChild(div)

my_modal_1.showModal()

}



detailNews();