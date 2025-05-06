import View from './view.js'
import icons from 'url:../../img/icons.svg'

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload')
    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay ')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')
    _btnAddIngredient = document.querySelector('.upload__btn--add-ingredient');
    _btnDelIngredient = document.querySelector('.upload__btn--remove-ingredient');
    _ingredientsContainer = document.getElementById('ingredients-container');
    _message = 'Recipe was successfully uploaded :'

    constructor(){
        super()
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
        this._addHandlerAddIngredient();

    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    }

    _addHandlerHideWindow(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }

    _addHandlerAddIngredient(){
        this._btnAddIngredient.addEventListener('click', this._addIngredientField.bind(this))
    }

    _addIngredientField() {
        const ingredientHTML = `<br/>
          <div class="ingredient-row">
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              class="ingredient__input"
            />
            <input
              type="text"
              name="unit"
              placeholder="Unit"
              class="ingredient__input"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              class="ingredient__input"
            />
          </div>
        `;
        this._ingredientsContainer.insertAdjacentHTML('beforeend', ingredientHTML);

        const ingredientRow = this._ingredientsContainer.lastElementChild;
        ingredientRow.addEventListener('keydown', this._handleIngredientEnter.bind(this));
      }


    _handleIngredientEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        // Създайте нов елемент за съставка
        const row = e.target.closest('.ingredient-row');
        const quantity = row.querySelector('input[name="quantity"]').value.trim();
        const unit = row.querySelector('input[name="unit"]').value.trim();
        const description = row.querySelector('input[name="description"]').value.trim();
        

        const combinedValue = [quantity, unit, description].filter(val => val).join(', ');
        const ingredientHTML = `
            <div class="ingredient-row">
                <input
                    type="text"
                    name="ingredient"
                    value="${combinedValue}"
                    class="ingredient__input"
                    readonly
                />
            </div>
        `;
        row.remove();
        this._ingredientsContainer.insertAdjacentHTML('beforeend', ingredientHTML);
        }
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();

            const dataArr = [... new FormData(this)]
            const data = Object.fromEntries(dataArr)
            console.log('Form Data:', data);
            const ingredients = Array.from(document.querySelectorAll('input[name="ingredient"]')).map(input => {
                if (!input.value) return null;
                const [quantity, unit, description] = input.value.split(',').map(el => el.trim());
                return { quantity: quantity || null, unit: unit || null, description: description || null };
              }).filter(ing => ing !== null);
            
            console.log('Parsed Ingredients:', ingredients);
            data.ingredients = ingredients;
    
            handler(data);
        });
           
    }

   
    

      
      _generateMarkup() {

      }
}    

export default new AddRecipeView()