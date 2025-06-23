const baseURL = 'http://localhost:3000/posts';
const postList = document.getElementById('post-list');
const postDetail = document.getElementById('post-detail');
const newPostForm = document.getElementById('new-post-form');
const editForm = document.getElementById('edit-post-form');
const editTitleInput = document.getElementById('edit-title');
const editContentInput = document.getElementById('edit-content');
const cancelEditBtn = document.getElementById('cancel-edit');

let currentPostId = null;

function displayPosts() {
  fetch(baseURL)
    .then(res => res.json())
    .then(posts => {
      postList.innerHTML = '';
      posts.forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        li.addEventListener('click', () => handlePostClick(post.id));
        postList.appendChild(li);
      });
      if (posts.length) {
        handlePostClick(posts[0].id);
      }
    });
}

function handlePostClick(id) {
  fetch(`${baseURL}/${id}`)
    .then(res => res.json())
    .then(post => {
      currentPostId = post.id;
      postDetail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><strong>Author:</strong> ${post.author}</p>
        <button onclick="editCurrentPost()">Edit</button>
        <button onclick="deletePost(${post.id})">Delete</button>
      `;
    });
}

function addNewPostListener() {
  newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(newPostForm);
    const newPost = {
      title: formData.get('title'),
      content: formData.get('content'),
      author: formData.get('author')
    };
    fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(() => {
      newPostForm.reset();
      displayPosts();
    });
  });
}

function editCurrentPost() {
  fetch(`${baseURL}/${currentPostId}`)
    .then(res => res.json())
    .then(post => {
      editTitleInput.value = post.title;
      editContentInput.value = post.content;
      editForm.classList.remove('hidden');
    });
}

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const updatedPost = {
    title: editTitleInput.value,
    content: editContentInput.value
  };
  fetch(`${baseURL}/${currentPostId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost)
  })
  .then(res => res.json())
  .then(() => {
    editForm.classList.add('hidden');
    displayPosts();
    handlePostClick(currentPostId);
  });
});

cancelEditBtn.addEventListener('click', () => {
  editForm.classList.add('hidden');
});

function deletePost(id) {
  fetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    displayPosts();
    postDetail.innerHTML = '<h2>Select a post to view details</h2>';
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);
