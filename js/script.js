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
function showPage (list, page){
   const startIndex = (page * 9)-9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';  

   for (i = startIndex; i < endIndex; i++){
      
      function newElement (element, type, value){
         const newElement = document.createElement(element);
         newElement[type] = value;
         return newElement;
         
      };
      
      //create list item
      const li = newElement('li', 'className', 'student-item cf');
      //create a div for student deatils
      const divStudentDetails = newElement('div', 'className', 'student-details');
      //create img tag
      const img = newElement('img', 'className', 'avatar');
      img.src = list[i].picture.thumbnail;
      img.alt = 'Profile Picture';
      //create name heading
      const fullName = `${list[i].name.title} ${list[i].name.first} ${list[i].name.last}`;
      const student = newElement('h3', 'textContent', fullName);
      //create span class for email
      const spanEmail = document.createElement('span');
      spanEmail.className = 'email';
      spanEmail.textContent = list[i].email;
      //div for joined details
      const divJoinedDetails = newElement('div', 'className', 'joined-details');
      //span class for date joined
      const spanDateJoined = newElement('span', 'className', 'date');
      spanDateJoined.textContent = list[i].registered.date;

      li.appendChild(divStudentDetails);
      li.appendChild(img);
      li.appendChild(student);
      li.appendChild(spanEmail);
      li.appendChild(divJoinedDetails);
      li.appendChild(spanDateJoined);

      studentList.appendChild(li);

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

   for (i = 1; i <= buttonCount; i++){
      const pageList = document.createElement('li');
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.type = 'button';

      //if active page number equals i set classname to active
      //pageButtons.className = 'active';
      
      if(pageButton.textContent ===activePage){
         pageButton.className = 'active';
      };

      pageList.appendChild(pageButton);
      pageNumberList.appendChild(pageList);
      
   };
};

// Call functions
showPage(data, 1);
addPagination(data, '1');
const pageUl = document.querySelector('.link-list'); 

pageUl.addEventListener('click', (e)=>{
   
   if (e.target.tagName ==='BUTTON'){  
      const activePage = e.target.textContent;
      addPagination(data, activePage); 
      showPage(data, activePage);
      
   };

});