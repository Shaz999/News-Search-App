const apikey = '3772ebea7dc04185a43f6da647254cd6';

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=18&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        console.log(data);
        return data.articles; // Corrected property name
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    if (Array.isArray(articles) && articles.length > 0) { // Check if articles is an array and not empty
        articles.forEach((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = article.title;
          
          const title = document.createElement("h2");
           const truncateedTitle =
          article.title.length > 30;
           article.title.slice(0,30) +"see more..."
          article.title;

          title.textContent = truncateedTitle;
          
            const description = document.createElement("p");
            description.textContent = article.description;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogContainer.appendChild(blogCard);
        });
    } else {
        const noArticlesMessage = document.createElement("p");
        noArticlesMessage.textContent = "No articles found.";
        blogContainer.appendChild(noArticlesMessage);
    }
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);

    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();

