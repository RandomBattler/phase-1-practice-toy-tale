let addToy = false;

function updateLikes(id, likes){
  fetch(`http://localhost:3000/toys/${id}`,{
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "likes": likes
    })
  })
}


function CreateCard(toy){
  //create div
  let card = document.createElement("div");

  //add card class
  card.classList.add("card");

  /*
  Each card should have the following child elements:

  h2 tag with the toy's name
  img tag with the src of the toy's image attribute and the class name "toy-avatar"
  p tag with how many likes that toy has
  button tag with a class "like-btn" and an id attribute set to the toy's id number

  <div class="card">
    <h2>Woody</h2>
    <img src="[toy_image_url]" class="toy-avatar" />
    <p>4 Likes</p>
    <button class="like-btn" id="[toy_id]">Like ❤️</button>
  </div>
  */
 let h2 = document.createElement("h2");
 h2.textContent = toy.name;

 let img = document.createElement("img");
 img.src = toy.image;
 img.classList.add("toy-avatar");

 let p = document.createElement("p");
 p.textContent = `${toy.likes} Likes`;

 let button = document.createElement("button");
 button.classList.add("like-btn");
 button.id = toy.id;
 button.textContent = "Like ❤️";
 button.addEventListener("click", () =>{
  //update like count
  toy.likes++;
  p.textContent = `${toy.likes} Likes`;
  updateLikes(toy.id, toy.likes);
 })



 card.append(h2,img,p,button);
 document.getElementById("toy-collection").appendChild(card);

}

function postToy(toy){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      ...toy,
      "likes": 0
    })
  }).then((response) => response.json())
    .then(resposeToy => CreateCard(resposeToy))
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys").then(response => response.json())
  .then(toys => toys.forEach(toy=> CreateCard(toy)));

  const form = document.querySelector("form.add-toy-form");
  form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    postToy(formData);
  })



  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
