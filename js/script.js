//Global references to the ul's to store student list and page list
const searchBarLocation = document.getElementsByClassName('header')[0].firstElementChild;
const pageNumberList = document.querySelector('.link-list'); 
const studentList = document.querySelector('.student-list');

//Create the search bar and insert in header
searchBarLocation.insertAdjacentHTML("afterend",`
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
         <button type="button" className="searchButton"><img src="img/icn-search.svg" atl="Search icon"></img></button>
      </input>
   </label>
   `);

//This function creates a filtered version of the data Object based on text in search field
const searchInput = document.getElementById('search');
const searchButton = searchInput.nextElementSibling;
let filteredData=[];
function createSearchArray (){
   searchName = searchInput.value.toLowerCase();
   filteredData = data.filter(data => 
      (data.name.first+data.name.last).toLowerCase().match(searchName)||(data.name.first+' '+data.name.last).toLowerCase().match(searchName)||data.name.first.toLowerCase().match(searchName)||data.name.last.toLowerCase().match(searchName));
   showPage(filteredData,1);
   addPagination(filteredData);
};

//This function clears the "page" of students and rebuilds based on the page number clicked
function showPage (list, pageNumber){
   let endIndex = pageNumber * 9;
   const startIndex = endIndex-9;
   if (endIndex > list.length){
      endIndex = list.length;
   };  
   studentList.innerHTML = '';  
   //Create and append a student as a list item then insert into the student-list ul
   //Append no results found message if list is empty
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

//Create the page button elements and insert in the link list. 
//If list is not empty set the first button's class name to active.
function addPagination(list){
   const buttonCount = Math.ceil(list.length / 9);
   pageNumberList.innerHTML = '';
   for (i=1; i<= buttonCount; i++){
      pageNumberList.insertAdjacentHTML('beforeend',`
         <li>
            <button type="button" class="">${i}</button>
         </li>
      `);
   };
   if(list.length > 0){
      pageNumberList.firstElementChild.firstElementChild.className="active";
   };
};  

//Event Listeners
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