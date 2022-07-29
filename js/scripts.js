let pokemonRepository = (function () {
    let pokemonList = [];
    let modalContainer = document.querySelector('#modal-container');
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    };
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    };
    function getAll() {
      return pokemonList;
    };
    //DOM methodology: JavaScript code
    function addListItem(pokemon) {
      const pokemonList = document.querySelector(".pokemon-list");
      const listPokemon = document.createElement("li");
      const button = document.createElement("button");
      //Classes content for button
      button.innerText = pokemon.name;
      button.classList.add('button-class')
      listPokemon.classList.add('list')
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);
      addEventListener(pokemon);
    };
    //User activates button, button functionality is to show pokemon details
    function addEventListener(pokemon) {
      button.addEventListener("click", function () {
        showDetails(pokemon)
      });
    };
  
    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    };
  
    //API pokemon details: use a promise
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(function (typeObject) {
          return typeObject.type.name;
        })
          .catch(function (e) {
            console.error(e);
          });
      });
  
    };
  
    function showModal(title, text) {
      // Clear all existing modal content
      modalContainer.innerHTML = ' ';
  
      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      //To hide the modal
      closeButtonElement.addEventListener('click', hideModal);
  
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
  
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
  
  
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
      modalContainer.classList.add('is-visible');
    }
  
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }
  
    //The Esc-key scenario, then, can be implemented this way, only hiding the modal if it’s actually visible:
  
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
  
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  
    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is a pokémon');
    });
  
    return {
      loadList: loadList,
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadDetails: loadDetails,
      showDetails: showDetails
  
    };
  
  })();
  
  pokemonRepository.loadList().then(function () {
  
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  