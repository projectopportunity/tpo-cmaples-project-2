//This is the location in the DOM where the search bar will be inserted. Dynamic insertion is a requirement of the project.
const searchBarLocation = document.getElementsByClassName('header')[0].firstElementChild;
const pageNumberList = document.querySelector('.link-list'); 
const studentList = document.querySelector('.student-list');

searchBarLocation.insertAdjacentHTML("afterend",`
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
         <button type="button" className="searchButton"><img src="img/icn-search.svg" atl="Search icon"></img></button>
      </input>
   </label>
   `);

//Variables used by filteredData function and event listener
const searchInput = document.getElementById('search');
const searchButton = searchInput.nextElementSibling;
let filteredData=[];
//This function creates a filtered version of the data object based on text in search field
function createSearchArray (){
   searchName = searchInput.value.toLowerCase().replaceAll(' ','');
   filteredData = data.filter(datum => {
      const fullName = `${datum.name.first}${datum.name.last}`;
      return fullName.toLowerCase().includes(searchName);
   });
   showPage(filteredData,1);
   addPagination(filteredData);
};

//This function clears the "page" of students and rebuilds based on the page number clicked. Append no results found message if list is empty
function showPage (list, pageNumber){
   let endIndex = pageNumber * 9;
   const startIndex = endIndex-9;
   if (endIndex > list.length){
      endIndex = list.length;
   };  
   studentList.innerHTML = '';  
   if(list.length === 0){
      studentList.innerHTML =`
         <li>No results Found</li>   
      `;
   }else {
      for (i = startIndex; i < endIndex; i++){
         studentList.insertAdjacentHTML('beforeend',`
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Pictures">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `);
      };
   };
};

//Create the page button elements and insert in the link list. If list is not empty set the first button's class name to active.
function addPagination(list){
   const buttonCount = Math.ceil(list.length / 9);
   pageNumberList.innerHTML = '';
   for (i=1; i<= buttonCount; i++){
      if(i === 1){
         pageNumberList.insertAdjacentHTML('beforeend',`
            <li>
               <button type="button" class="active">${i}</button>
            </li>
         `);
      } else if (i > 1){
         pageNumberList.insertAdjacentHTML('beforeend',`
            <li>
               <button type="button" class="">${i}</button>
            </li>
         `);
      };
   };
};  

searchInput.addEventListener('keyup', (e)=>{
   createSearchArray();
});
searchButton.addEventListener('click', (e)=>{
   createSearchArray();
});
pageNumberList.addEventListener('click', (e)=>{  
   if (e.target.tagName ==='BUTTON'){  
      const activePage = e.target.textContent;
      document.querySelector('.active').className = '';
      e.target.className = 'active';
      if (searchInput.value !== ""){
         showPage(filteredData,activePage);
      } else {
         showPage(data, activePage); 
      };
   };
});

//initial calls to display first 9 students and create the page buttons.
showPage(data, 1);
addPagination(data);