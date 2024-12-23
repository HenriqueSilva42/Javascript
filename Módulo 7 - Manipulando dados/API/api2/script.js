const feed = [];
const feedContainer = document.getElementById("feed");
const postForm = document.getElementById("postForm");
const postContent = document.getElementById("postContent");

const username = "SeuNome";
const avatarUrl = "https://via.placeholder.com/40";

postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const content = postContent.value.trim();
    if (!content) return;

    const catImage = await fetchCatImage();

    const post = {
        date: new Date(),
        username: username,
        avatar: avatarUrl,
        content: content,
        catImage: catImage,
        likes: 0
    };

    feed.unshift(post);
    postContent.value = "";
    renderFeed();
});

function renderFeed() {
    feedContainer.innerHTML = "";
    feed.forEach((post, index) => {
        const postElement = document.createElement("li");

        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="Avatar" class="avatar">
                <span class="username">${post.username}</span>
            </div>
            <p class="post-content">${post.content}</p>
            <img src="${post.catImage}" alt="Gatinho Fofo" class="post-image">
            <button class="like-button" onclick="likePost(${index})">
                Curtir <span class="like-count">${post.likes}</span>
            </button>
        `;

        feedContainer.appendChild(postElement);
    });
}

async function fetchCatImage() {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();
        return data[0].url;
    } catch (error) {
        console.error("Erro ao buscar imagem de gatinho:", error);
        return "https://via.placeholder.com/400"; // Fallback caso a API falhe
    }
}

function likePost(index) {
    feed[index].likes++;
    renderFeed();
}
