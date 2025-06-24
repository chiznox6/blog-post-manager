const baseURL = 'http://localhost:3000/posts';

const postList = document.getElementById('post-list');
const postDetail = document.getElementById('post-detail');
const newPostForm = document.getElementById('new-post-form');
const editPostForm = document.getElementById('edit-post-form');
const toggleFormBtn = document.getElementById('toggle-form-btn');
const cancelEditBtn = document.getElementById('cancel-edit');

let currentPost = null;

function fetchPosts() {
  fetch(baseURL)
    .then(res => res.json())
    .then(posts => {
      postList.innerHTML = '';
      posts.forEach(post => renderPostTitle(post));
      if (posts.length > 0) showPostDetails(posts[0]);
    });
}

function renderPostTitle(post) {
  const div = document.createElement('div');
  div.textContent = post.title;
  div.addEventListener('click', () => showPostDetails(post));
  postList.appendChild(div);
}

function showPostDetails(post) {
  currentPost = post;
  postDetail.innerHTML = `
    <h2>${post.title}</h2>
    <p><strong>Author:</strong> ${post.author}</p>
    <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/200x300?text=No+Image'" />
    <p>${post.content}</p>
    <button id="edit-btn">Edit</button>
    <button id="delete-btn">Delete</button>
  `;

  document.getElementById('edit-btn').addEventListener('click', () => {
    editPostForm.classList.remove('hidden');
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;
  });

  document.getElementById('delete-btn').addEventListener('click', () => {
    fetch(`${baseURL}/${post.id}`, { method: 'DELETE' })
      .then(() => {
        fetchPosts();
        postDetail.innerHTML = '<h2>Deleted</h2><p>The post has been removed.</p>';
      });
  });
}

newPostForm.addEventListener('submit', e => {
  e.preventDefault();

  const newPost = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    image: document.getElementById('image').value,
    content: document.getElementById('content').value
  };

  fetch(baseURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newPost)
  })
    .then(res => res.json())
    .then(post => {
      renderPostTitle(post);
      newPostForm.reset();
      newPostForm.classList.add('hidden');
    });
});

editPostForm.addEventListener('submit', e => {
  e.preventDefault();

  const updatedPost = {
    title: document.getElementById('edit-title').value,
    content: document.getElementById('edit-content').value
  };

  fetch(`${baseURL}/${currentPost.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updatedPost)
  })
    .then(res => res.json())
    .then(post => {
      fetchPosts();
      showPostDetails(post);
      editPostForm.classList.add('hidden');
    });
});

cancelEditBtn.addEventListener('click', () => {
  editPostForm.classList.add('hidden');
});

toggleFormBtn.addEventListener('click', () => {
  newPostForm.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  fetchPosts();
});
