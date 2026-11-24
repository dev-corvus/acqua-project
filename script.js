const listNews = document.querySelector("#list-news");
const URL = "/api/news";
// const response = await fetch(`https://gnews.io/api/v4/search?${params}`);
// if (!response.ok) {
//     throw new Error(`Request failed: ${response.status}`);
// }

// const { articles } = await response.json();
// for (const article of articles) {
//     console.log(article.title);
// }

async function fetchNews() {
    try {
        const reply = await fetch(URL)
        if (!reply.ok) {
            throw new Error(`News request failed: ${reply.status}`);
        }
        const data = await reply.json();
        if (!Array.isArray(data.articles)) {
            throw new Error("News response did not contain an articles list.");
        }

        data.articles.forEach((article) => {
            console.log(article);

            const card = document.createElement("article");
            card.classList.add("card-news");

            const image = document.createElement("img")
            image.src = article.image;
            image.alt = article.title; // n tem texto alternativo, ent sera o texto

            const content_div = document.createElement("div");
            content_div.classList.add("card-content");

            const metadata = document.createElement("div");
            metadata.classList.add("card-meta");

            const font = document.createElement("span")
            font.classList.add("card-font")
            font.textContent = article.source.name;

            const title = document.createElement("h3");
            title.textContent = article.title;

            const paragraphDescription = document.createElement("p");
            paragraphDescription.textContent = article.description;

            const date = document.createElement("span");
            date.textContent = new Date(article.publishedAt).toLocaleDateString(
                "pt-BR",
            );

            const link = document.createElement("a");
            link.textContent = "Ler Notícia";
            link.href = article.url
            link.target = "_blank"
            link.rel = "noopeneer noreferrer"
            // impedir q um pag ao ser aberta, uma outra aba consiga acessar com programação

            metadata.append(font, date);
            content_div.append(metadata, title, paragraphDescription, link);
            card.append(image, content_div);

            const itemList = document.createElement("li")
            itemList.append(card)
            listNews.append(itemList);
        });

    } catch (error) {
        console.error(error);
    }
}

fetchNews();

const thisYear = document.querySelector("#this-year");

const date = new Date();
const year = date.getFullYear();

thisYear.textContent = year;