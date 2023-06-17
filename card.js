const cards=document.querySelector("#cards"); 
const exampleModal = new bootstrap.Modal("#exampleModal");
const app =document.querySelector("#app");
const btnCategory = document.querySelector("#btn-categorey");
const searchInput =document.querySelector("#search-input");
const buttonAddons=document.querySelector("#button-addon1");
const cart =document.querySelector("#cart");
const offcanvas =new bootstrap.Offcanvas("#offcanvas");
const tbody = document.querySelector("#tbody");
const totalPrice= document.querySelector("#totalPrice");
const eachprice = document.querySelector("#eachprice");
const badge=document.querySelector("#badge");


     const generatestar = (no) => {
       let star = "";
       for (let i = 1; i <= 5; i++) {
         if (Math.round(no) < i) {
           star += `<i class="bi bi-star"></i>`;
         } else {
           star += `<i class="bi bi-star-fill"></i>`;
         }
       }
       return star;
     };
     const creatCategoryBtn=(text)=>{
        const btn=document.createElement("button");
        btn.className="btn btn-outline-dark btn-sm me-1 mb-1 text-capitalize cat";
        btn.setAttribute("card",text);
        btn.innerText=text.replaceAll("-"," ")
        return btn
     };
     categories.forEach(category=>
      btnCategory.append(creatCategoryBtn(category))
     )

     const creatProductimage=(arr)=>{
        let img=""
        let indicator=""
        arr.forEach((arr,index)=>{
            img += ` <div class="carousel-item ${index == 0 && "active"}">
      <img src="${arr}" class="d-block product-modal-image w-100" alt="...">
    </div>`;
    indicator += `
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${
      index == 0 && "active"
    }" aria-current="true" aria-label="Slide 1"></button>
    `;
        })
        return {img,indicator}
     };
    
const findTotal=()=>{
  let prices=0;
  const foreachprice=document.querySelectorAll(".price")
foreachprice.forEach(oneprice=>{
   const price=oneprice.innerHTML;
   prices+=parseFloat(price)
   return price;
})
return prices;
}
const listcount=(event)=>{
  const list = document.querySelectorAll(".price").length;
 if(list>0){badge.innerText=list;}
}
const creatcards=(product)=>{
                    
    const div=document.createElement("div");
    div.className = "col-6 col-md-4 col-lg-3 product-card";
    div.setAttribute("product-id", product.id);
    

     const except=(text,maxlength=70)=>{
          if(text.length>maxlength){
            return text.substring(0,maxlength)+"...";
          }
          return text;
     }
    div.innerHTML = ` <div class="card">
                    <div class="card-body">
                      
                    <h3 class="mt-2 text-truncate">${product.title}</h3>
                    <div class="d-flex justify-content-between flex-wrap align-items-center">
                        <div class="text-warp small badge bg-dark text-white me-2 pt-2">${
                          product.category.replaceAll("-","").toLocaleLowerCase()
                        }</div>
                        <div class="text-warp small  pt-2">
                        ${generatestar(product.rating)}
                        </div>
                    </div>
                    <p class="mt-2 text-black-50 small product-description">${except(
                      product.description
                    )}</p>
                    <div class="border-top pt-2 d-flex justify-content-between align-items-center">
                        <p class="pt-3">$ ${product.price}</p>
                       
                    </div>
                </div>
                </div>`;
                 const image = new Image();
                 image.src = product.thumbnail;
                  image.className = "card-photo";
                  image.style.zIndex="1000";
                  div.querySelector(".card-body").prepend(image); 
                  const btn=document.createElement("button");
                  btn.className = "btn btn-outline-dark btn-sm text-no-wrap add align-self-center";
                  btn.innerText="Add";
                  btn.style.minWidth="70px";
                  div.querySelector(".pt-3").after(btn);

                  btn.addEventListener("click",(event)=>{
               event.stopPropagation();
                      tbody.innerHTML += `
                            <tr>
          <td scope="col">${tbody.childElementCount + 1}</td>
          <td>${product.title}</td>
          <td class="price">${product.price}</td>
        </tr>
                      `;
                  
                    if(btn.classList.contains("active")){
                      btn.innerText="Add";
                      btn.classList.remove("active");
                    }else{getBoundingClientRect;
                      btn.classList.add("active");
                      btn.innerText="Added"
                      const  img=new Image();
                      img.src=product.thumbnail;
                      img.style.position="fixed";
                      img.style.transition="0.5s";
                      img.style.zIndex="3000";
                      img.style.width=image.getBoundingClientRect().width+"px";
                      img.style.height =
                        image.getBoundingClientRect().height + "px";
                        img.style.top=image.getBoundingClientRect().top+"px";
                         img.style.left =
                           image.getBoundingClientRect().left + "px";
                           document.body.append(img);
getBoundingClientRect;
                           setTimeout(() => {
                            img.style.left=cart.getBoundingClientRect().left+"px";
                            img.style.top=
                              cart.getBoundingClientRect().top+ "px";
                              img.style.width="0px"
                              img.style.height="0px";
                              img.style.transform="rotate(360deg)"
                               listcount();
                           },200);
                    }getBoundingClientRect;
                  })
                  totalPrice.innerText = findTotal();
                  listcount();
                return div;
                

};


// const generatePhoto=(src,img)=>getBoundingClientRect{
//   const image=new Image();
//   image.src=src;
//   image.className = "card-photo";
//   image.style.position="absolute";
//   image.style.left=img.getBoundingClientRect().left+"px";
//   image.style.top=img.getBoundingClientRect().top+"px";
//   document.body.append(image);
// }

const renderModalBox=(products)=>{
  cards.innerHTML=null;
  products.forEach((product) => {
    cards.append(creatcards(product));
  });
};
const renderBySearch=(keywords)=>{
  renderModalBox(products.filter((product)=>{
    return(product.description.toLocaleLowerCase().search(keywords.toLocaleLowerCase()) !=-1
      ||  product.title.toLocaleLowerCase().search(keywords.toLocaleLowerCase()) !=-1 
      ||  product.category.toLocaleLowerCase().search(keywords.toLocaleLowerCase()) !=-1 )
  }))
};
const renderCards=()=>{
   const currentproductCard = event.target.closest(".product-card");
   const currentproductId = currentproductCard.getAttribute("product-id");
   const currentCard = products.find(
     (product) => product.id == currentproductId
   );

   exampleModal._element.querySelector(".modal-title").innerText =
     currentCard.title.toUpperCase();
   exampleModal._element.querySelector(
     ".modal-body"
   ).innerHTML = ` <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
  ${creatProductimage(currentCard.images).indicator}
  </div>
  <div class="carousel-inner mt-0 pt-0">
   
   ${creatProductimage(currentCard.images).img}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<div class="d-flex justify-content-between align-items-center mt-2">
    <h6 class="">${currentCard.category.replaceAll("-", " ")}</h6>
   <p>${generatestar(currentCard.rating)}</p>
</div>
  <p class="">${currentCard.description.replaceAll("-", " ")}</p>
   <p class="mt-2">$ ${currentCard.price}</p>`;
   exampleModal.show();
}

const renderProdcuctCardbyCategory=()=>{
    totalPrice.innerText = findTotal();
    listcount();
  const currentCategory=event.target.getAttribute("card");
  if(currentCategory==="all"){
   renderModalBox(products);
  }else{
    renderModalBox(
      products.filter(
        (product) => product.category == event.target.getAttribute("card")
      )
    );
  }
 btnCategory.querySelector(".active").classList.remove("active");
 event.target.classList.add("active");
}

renderModalBox(products);


cart.addEventListener("click",() => {
  offcanvas.show();
})
totalPrice.innerText = findTotal();
listcount();
app.addEventListener("click",(event) => {
totalPrice.innerText = findTotal();
listcount();
   if(event.target.closest(".product-card") && !event.target.classList.contains("add")){
    renderCards();
   };
   if(event.target.classList.contains("cat")){
    renderProdcuctCardbyCategory(); 
   };
  //  if(event.target.classList.contains("search")){
  //   renderBySearch(searchInput.value);
  //  }
  //  if(event.target.classList.contains("add")){  
  //   event.target.classList.toggle("active");
  //   if(event.target.classList.contains("active")){

  //     event.target.innerText="Added";
  //      const img = event.target;
  //      console.dir(img)
  //   }else{
  //     event.target.innerText="Add to card";
  //   }
  //  };
});

searchInput.addEventListener("keyup",(keywords)=>{
  renderBySearch(searchInput.value)
});
buttonAddons.addEventListener("click", (keywords) => {
       renderBySearch(searchInput.value);
});
 window.addEventListener("load", listcount);

