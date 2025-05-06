// import icons from '../img/icons/svg' // Parcel 1

import * as module from './module.js'
import {MODAL_CLOSE_SEC} from './config.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'
import previewView from './views/previewView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
// import { fround } from 'core-js/core/number'

if (module.hot){
  module.hot.accept()
}

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function () {
  try{

    const id = window.location.hash.slice(1)

    if (!id) return

    // 0) Update results view to mark selected search result 
    resultsView.update(module.getSearchResultsPage())

    // 1) Updating bookmarks View
    bookmarksView.update(module.state.bookmarks)
    
    recipeView.renderSpinner()
    // 2) loading recipe
    await module.loadRecipe(id)
    
    // 3) Rendering recipe
    
    recipeView.render(module.state.recipe)


  }catch(err){
    recipeView.renderError()
    console.error(err);
  }

}

let sortAsc = true; // Initialize sorting order
const controlSortResult = function(){

  module.state.search.results.sort((a, b) => {return sortAsc 
  ? a.title.localeCompare(b.title) 
  : b.title.localeCompare(a.title)})

  sortAsc = !sortAsc; // Toggle the sorting order for the next click
  console.log(module.state.search.results);
  resultsView.update(module.getSearchResultsPage());
}

const controlSearchResults = async function () {

  try{
    resultsView.renderSpinner()
    // Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // load search results
    await module.loadSearchResults(query)

    // render search results
    // previewView.render(module.state.search.results);
    resultsView.render(module.getSearchResultsPage())
    resultsView.showSortButton();
    // Render initial pagination buttons
    paginationView.render(module.state.search)
  }catch(err){
    console.log(err);
  }
}

const controlPagination = function(goToPage){
   // render NEW search results
   resultsView.render(module.getSearchResultsPage(goToPage))

   // Render NEW pagination buttons
   paginationView.render(module.state.search)
}

const controlServings = function(newServings){
  // Update the recipe setvings (in state) 
  module.updateServings(newServings)
  // Update the recipe View 

  // recipeView.render(module.state.recipe)
  recipeView.update(module.state.recipe)

}

const controlAddBookmark = function(){
  // Add/remove bookmark
  if (!module.state.recipe.bookmarked) module.addBookmark(module.state.recipe)
  else module.deleteBookmark(module.state.recipe.id)
  
  // Update recipe view
  console.log(module.state.recipe);
  recipeView.update(module.state.recipe)

  // Render the bookmarks
  bookmarksView.render(module.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(module.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe){

  try{

    console.log('New Recipe:', newRecipe);
    // Show loading spinner
    addRecipeView.renderSpinner()

    // Upload the new recipe
    await module.uploadRecipe(newRecipe)


    // Render recipe
    recipeView.render(module.state.recipe)

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(module.state.bookmarks)

    // Change ID in the URL
    window.history.pushState(null, '', `#${module.state.recipe.id}`)
    // window.history.back()


    // Close form window
    setTimeout(function(){
      addRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC * 1000)

  }catch(err){
    console.error('😥😥', err);
    addRecipeView.renderError(err.message)
  }
  // Upload the new recipe daat
  
}




const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  // recipeView.addHandlerSort(sortButton)
  // previewView.render(results);
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
  resultsView.addHandlerSort(controlSortResult);
}
init()



