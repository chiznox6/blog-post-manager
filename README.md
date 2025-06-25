#  Blog Post Manager – Novel Reviews Edition

A fully functional blog-style web application for managing novel reviews. Users can view, add, edit, and delete blog posts in real-time using a local server (`json-server`). This project was built using HTML, CSS, and JavaScript, with a focus on DOM manipulation, form handling, and API communication.

---

## Project Features

 Feature                             Description                                                                 

 View All Reviews                -Displays a list of novel titles and cover images                            
 View Review Details             -Click a title to view full content, author, and image                       
 Add New Review                  -Submit a form to add a new review to the list (uses POST)                   
 Edit Review Content            -Modify title/content via an editable form (uses PATCH)                      
 Delete Review                  -Remove any post (uses DELETE)                                               
 Book Cover Support             -Each post includes a book image (with fallback if not available)            
Advanced Features Completed      Includes full server sync for POST, PATCH, DELETE                           

##  Technologies Used

- HTML5 for structure  
- CSS for layout and styles (modern, colorful)  
-  JavaScript for all logic  
- `json-server` to simulate a RESTful API backend


##  Project Structure
├── index.html # Main HTML layout
├── style.css # Colorful, modern styling
├── index.js # JavaScript logic (DOM, API calls, events)
└── db.json # Local data used by json-server


##  Learning Goals Met

 Use `fetch()` to GET/POST/PATCH/DELETE data from a server
 Update DOM based on API responses
 Handle forms and user events using `event.preventDefault()`
 Structure clean, reusable, readable code
 Build a full CRUD (Create, Read, Update, Delete) app


##  Setup Instructions

1. Clone or download the repo**

   git clone https://github.com/chiznox6/blog-post-manager.git

