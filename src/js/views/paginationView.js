import View from './view.js'
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline')
            if (!btn) return;
            const goToPage = Number(btn.dataset.goto);

            handler(goToPage)
        })
    }


    _generateMarkupButton(type, curPage){

        return `
        <button data-goto = "${type === 'prev' ? curPage - 1 : curPage + 1}" class="btn--inline pagination__btn--${type}">
        ${type === 'prev' ? `
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        ` : `
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        `}

                
        </button>


    `;


    }


    _generateMarkup(){
        const curPage = this._data.page
        // console.log(curPage);
        const numPages =Math.ceil(this._data.results.length / this._data.resultsPerPage)
        // console.log(numPages);

        return `
            <div class="pagination">
                ${curPage > 1 ? this._generateMarkupButton('prev', curPage) : '<span class="placeholder"></span>'}
                <span class="btn--inline">
                    ${curPage} of ${numPages} Pages
                </span>
                ${curPage < numPages ? this._generateMarkupButton('next', curPage) : '<span class="placeholder"></span>'}
            </div>

        `
    }
}    

export default new PaginationView()