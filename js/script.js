/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage (list, pageNumber){
   let endIndex = pageNumber * 9;
   const startIndex = endIndex-9;
   if (endIndex > list.length){
      endIndex = list.length;
   };

   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';  

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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list, activePage){
   const pageNumberList = document.querySelector('.link-list');
   const buttonCount = Math.ceil(list.length / 9);
   pageNumberList.innerHTML = '';
   for (i=1; i<= buttonCount; i++){
      pageNumberList.insertAdjacentHTML('beforeend',`
         <li>
            <button type="button" class="">${i}</button>
         </li>
      `);
   };
};

// Call functions
showPage(data, 1);
addPagination(data, '1');
const pageUl = document.querySelector('.link-list'); 
pageUl.firstElementChild.firstElementChild.className="active";

pageUl.addEventListener('click', (e)=>{
   
   if (e.target.tagName ==='BUTTON'){  
      const activePage = e.target.textContent;
      document.querySelector('.active').className = '';
      e.target.className = 'active';
      showPage(data, activePage);   
   };
});