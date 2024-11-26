const loadPosts = async (categoryName) => {
  let url = `https://openapi.programming-hero.com/api/retro-forum/posts`;
  if (categoryName) {
    url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  const posts = data.posts;
  showPosts(posts);
};

function showPosts(posts) {
  // console.log(posts);
  const postsContainer = document.getElementById("posts-container");
  postsContainer.textContent = ``;
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("post");
    div.setAttribute(
      "onclick",
      `handleSelect(${post.id},'${post.title}',${post.view_count})`
    );
    div.innerHTML = `
        <div class="post__image--container">
            <img src="${post.image}" alt="Profile">
            <div id="${post.id}" class="isActive"></div>
        </div>
        <div class="post__info--container">
            <p class="post__category">
                <span># ${post.category}</span>
                <span>Author: ${post.author.name}</span>
            </p>
            <h3 class="post__title">${post.title}</h3>
            <p class="post__description">${post.description}</p>

            <div class="empty__container"></div>

            <div class="post__feedback--container">
                <div>
                <span><img src="../icons/comment.svg" alt="">${post.comment_count}</span>
                <span><img src="../icons/view.svg" alt="">${post.view_count}</span>
                <span><img src="../icons/watch.svg" alt="">${post.posted_time} min</span>
                </div>
                <div>
                    <img src="../icons/email.svg" alt="Email">
                <div>
            </div>
        </div>
        `;
    postsContainer.appendChild(div);
    handleActiveStatus(post.isActive, post.id);
  });
}

function handleSelect(postId, postTitle, viewCount) {
  // console.log("I'm clicked", postId, postTitle, viewCount);

  // handleMark(postId, postTitle, viewCount);

  const readCountElement = document.getElementById("read__count");
  // console.log(readCountElement);
  const readCountStr = readCountElement.innerText;
  const readCount = parseInt(readCountStr);
  const updatedReadCount = readCount + 1;
  readCountElement.innerText = updatedReadCount;

  const marksCardContainer = document.getElementById("marks-card-container");
  // console.log(marksContainer);
  const div = document.createElement("div");
  div.classList.add("mark__card");
  div.innerHTML = `
    <p class="mark__card--title">${postTitle}</p>
    <div class="mark__view--info">
      <div><img src="../icons/view.svg" alt="Eye">
      </div>
      <p>${viewCount}</p>
    </div>
  `;
  marksCardContainer.appendChild(div);
}

function handleSearch() {
  // console.log("hi");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  const marksCardContainer = document.getElementById("marks-card-container");
  marksCardContainer.textContent = ``;
  const readCountElement = document.getElementById("read__count");
  readCountElement.innerHTML = 0;

  loadPosts(searchText);
}

function handleActiveStatus(isActive, postId) {
  const isActiveElement = document.getElementById(`${postId}`);
  if (isActive) {
    isActiveElement.style.backgroundColor = "#10B981";
  } else {
    isActiveElement.style.backgroundColor = "#FF3434";
  }
}

loadPosts();

const loadLatestPosts = async () => {
  const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;

  const response = await fetch(url);
  const data = await response.json();
  displayLatestPosts(data);
};

function displayLatestPosts(posts) {
  console.log(posts);
  const latestPostsContainer = document.getElementById(
    "latest__posts--container"
  );
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("latest-post");
    div.innerHTML = `
      <div class="cover-image-container">
        <img src="${post.cover_image}" alt="Cover Photo">
      </div>
      <div class="date-container">
        <img src="../icons/calender.svg" alt="Calender">
        <p>${post.author.posted_date || "No publish date"}</p>
      </div>
      <h4 class="latest-post-title">${post.title}</h4>
      <p class="latest-post-description">${post.description}</p>
      <div class="latest-profile-info">
        <div class="latest-profile-container">
          <img src="${post.profile_image}">
        </div>
        <div>
          <p class="author-name">${post.author.name}</p>
          <p class="designation">${
            post.author.designation ? post.author.designation : "Unknown"
          }</p>
        </div>
      </div>
    `;
    latestPostsContainer.appendChild(div);
  });
}

loadLatestPosts();
