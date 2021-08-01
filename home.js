var list = document.getElementsByClassName("search-result");
var search_box = document.getElementById("searchBox");
var search_test = "";
var search_result;
var search_list = document.getElementById('search-result');
var favourites = [];
var hide = false;
var fav_btn = document.getElementById('fav');
var main = document.getElementById('main');

var fav_list = document.getElementById('fav-list');

//  function to open selected movie in a new page with details
function movie_opener(id){
    window.open('movie.html?' + id);
}


//  main function for working of search box with the api calling part
function loadMovies(text) {
  const Xhttp = new XMLHttpRequest();
  
  let url = 'http://www.omdbapi.com/?apikey=b505ec97&s=' + text;
  console.log(url);
  Xhttp.open("GET", url);
  Xhttp.send();
  Xhttp.onload = function () {

    var node= document.getElementById("search-result");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }

    search_result = JSON.parse(this.response);
    for(i of search_result.Search){
          let opt = document.createElement("div");
          opt.classList="GPS"
        //   opt.appendChild(document.createTextNode(i.Title));
          opt.innerHTML+=`<div class="img" ;><img src="${i.Poster}"  alt=""></div><h4>${i.Title} <span>(${i.Year})</span></h4>`
        //   let poster = document.createElement("img");
        // opt.preventDefault()
        //   poster.src = i.Poster;
        //   opt.appendChild(poster);
          opt.value = i.imdbID;
           let favbtn = document.createElement("button");
           favbtn.classList.add("glow-on-hover")
          favbtn.innerText="Add to Fav !";
          favbtn.addEventListener('click',function(e){
              console.log("Favourite");
            e.stopImmediatePropagation();
            favourites.push(i.imdbID);
            let fav_m = document.createElement("div");
            let obj = opt.cloneNode(true);
            obj.removeChild(obj.lastChild);
            fav_m.appendChild(obj);
            fav_m.id = i.imdbID;
            let delBtn = document.createElement("button");
            delBtn.classList.add("glow-on-hover")
            delBtn.innerText="Remove";
            delBtn.addEventListener("click", function(e){
                console.log("delete");
                e.stopImmediatePropagation();
                document.getElementById(fav_m.id).remove();
            })
            obj.appendChild(delBtn);
            fav_list.appendChild(fav_m);
          });
          opt.appendChild(favbtn); 
          search_list.appendChild(opt);
          opt.addEventListener('click', function(){
            console.log(i.imdbID)
            movie_opener(opt.value);
          });
      }
};
}


//  function to call the loadMovies() whenever there is a change in the search box to ensure changes in 
//  search like google search bar
function helper(){
    let text = document.getElementById("searchBox").value;
    if(search_test.trim() == text.trim()){
        return;
    }else{
        search_test = text;
    }
    loadMovies(text);   
    console.log(search_result);
    console.log(text);
}


//  function to show favourite movies selected
function show_fav(){
    console.log(main)
    if(!hide){
        main.style.display = "None";
        fav_list.style.display = "flex";
        hide = true;
    }else{
        fav_list.style.display = "None";
        main.style.display = "block";
        hide = false;
    }
}


//  this both are event listeners for the search-box and the favourites button
search_box.addEventListener('keyup',function(){ helper() });
fav_btn.addEventListener('click', function(){ show_fav() })

