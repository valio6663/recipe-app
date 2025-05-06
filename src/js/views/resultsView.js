import View from './view.js'
import icons from 'url:../../img/icons.svg'
import previewView from './previewView.js'

class ResultsView extends View {
    _parentElement = document.querySelector('.results')
    _errorMessage = 'No recipes found for your query! Please try again!'
    _message = ''

    _generateMarkup(){
        
        
        return this._data.map(result => previewView.render(result, false)).join('')       
    }

    showSortButton() {
        const sortContainer = document.getElementById('sortContainer');
        if (sortContainer) {
            sortContainer.classList.remove('hidden');
        }    
    }

    addHandlerSort(handler){
        const sortButton = document.getElementById('sortButton');
        if (sortButton) {
            sortButton.addEventListener('click', handler)
        }
    }
}

export default new ResultsView()