var id = window.location.search.split('?')[1];

function loadMovie(id) {
    const Xhttp = new XMLHttpRequest();
    
    let url = 'https://www.omdbapi.com/?apikey=b505ec97&i=' + id;
    console.log(url);
    Xhttp.open("GET", url);
    Xhttp.send();
    Xhttp.onload = function () {
  
      var node= document.getElementById("movie");
      while (node.firstChild) {
          node.removeChild(node.firstChild);
      }
  
      search_result = JSON.parse(this.response);
    //   for(i of search_result){
      document.getElementById('Title').innerText = " " + search_result.Title;
      document.getElementById('Year').innerText = " " + search_result.Year;
      document.getElementById('Released').innerText = " " + search_result.Released;
      document.getElementById('Genre').innerText = " " + search_result.Genre;
      document.getElementById('Director').innerText = " " + search_result.Director;
      document.getElementById('Writer').innerText = " " + search_result.Writer;
      document.getElementById('Actors').innerText = " " + search_result.Actors;
      document.getElementById('Language').innerText = " " + search_result.Language;
      document.getElementById('Awards').innerText = " " + search_result.Awards;
      document.getElementById('imdbRating').innerText = "Rating : " + search_result.imdbRating;
      document.getElementById('imdbVotes').innerText = "Votes : " + search_result.imdbVotes;
      document.getElementById('BoxOffice').innerText = " " + search_result.BoxOffice;
      document.getElementById('Production').innerText = " " + search_result.Production;
      document.getElementById('Website').innerText = " " + search_result.Website;
      
      document.getElementById("Poster").src = search_result.Poster;
            // let opt = document.createElement("div");
            // opt.appendChild(document.createTextNode(search_result.Title));
            // let poster = document.createElement("img");
            // poster.src = search_result.Poster;
            // let desc = document.createElement("div");
            // desc.appendChild(document.createTextNode(search_result.Plot));
            // opt.appendChild(desc);
            // opt.appendChild(poster);
            // opt.value = search_result.Title;
            // node.appendChild(opt);
        // }
  };
  }

loadMovie(id);