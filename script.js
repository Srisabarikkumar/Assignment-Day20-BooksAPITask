const btn = document.getElementsByTagName("button");
const container = document.getElementById("container");

for (let i = 0; i < btn.length; i++) {
  btn[i].onclick = function () {
    container.innerHTML = "";
    fetch(`https://openlibrary.org/people/mekBot/books/${this.innerHTML}.json`)
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        data.reading_log_entries.map((book) => {
          const card = document.createElement("div");
          const cardBody = document.createElement("div");
          const image = document.createElement("img");
          const title = document.createElement("h5");
          const authorNames = document.createElement("p");
          const firstPublishedYear = document.createElement("p");
          card.classList.add("card", "cardSpec", "m-3");
          cardBody.classList.add("card-body", "text-center");
          image.classList.add("card-img-top", "cardImage");
          title.classList.add("text-center", "mt-3");
          const imageId = book.work.cover_id;
          if (imageId === null) {
            image.src =
              "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
          } else {
            image.src = `https://covers.openlibrary.org/b/id/${imageId}.jpg`;
          }
          title.innerHTML = book.work.title;

          authorNames.innerHTML = `Authors: ${book.work.author_names}`;

          firstPublishedYear.innerHTML = `First Publish Year: ${book.work.first_publish_year}`;
          card.appendChild(image);
          card.appendChild(title);
          cardBody.appendChild(authorNames);
          cardBody.appendChild(firstPublishedYear);
          card.appendChild(cardBody);
          container.appendChild(card);
        });
      })
      .catch((err) => {
        console.log(err);
        const errorElement = document.getElementById("errorHeading");
        errorElement.style.color = "red";
        errorElement.innerHTML = "Some error occured!";
      });
  };
}
