const Giphies = require('./page-objects/giphies');

describe('Giphies', () => {
  const giphiesPage = new Giphies();

  let firstGiph;

  beforeEach(() => {
    giphiesPage.startBrowser();
  });

  function performSearch() {
    giphiesPage.searchInput().type('drake');
    giphiesPage.searchButton().click();

    firstGiph = giphiesPage.allGiphies().first();
  }

  function convertScoreToNumber(score) {
    return Number(score.replace(/,/g, ''));
  }

  it('should search for tag when search button is clicked', () => {
    performSearch();

    giphiesPage.allGiphies().its('length').should('be.gt', 0);
  });

  it('should sort giphies', () => {
    performSearch();

    firstGiph.then((elem) => {
      giphiesPage.sortingSelect().select('asc');
      const newFirstGiph = giphiesPage.allGiphies().first();

      newFirstGiph.should('not.have.id', elem.attr('id'));
    });
  });

  it('should show modal when a giphy is clicked', () => {
    performSearch();
    firstGiph.find('.card__img').click();

    giphiesPage.modal().should('have.class', 'is-open');
  });

  it('should upvote giphy', () => {
    performSearch();

    firstGiph.find('.badge').invoke('text').then((oldScore) => {
      // did not use `firstGiph` because cypress assigns the element you found inside
      // to `firstGiph` itself
      giphiesPage.allGiphies().first().find('.rank-controls__up').click();

      const badge = giphiesPage.allGiphies().first().find('.badge');

      badge.invoke('text').then((newScore) => {
        cy.wrap(convertScoreToNumber(newScore)).should('eq', convertScoreToNumber(oldScore) + 1);
      });
    });
  });

  it('should downvote giphy', () => {
    performSearch();

    firstGiph.find('.badge').invoke('text').then((oldScore) => {
      // did not use `firstGiph` because cypress assigns the element you found inside
      // to `firstGiph` itself
      giphiesPage.allGiphies().first().find('.rank-controls__down').click();

      const badge = giphiesPage.allGiphies().first().find('.badge');

      badge.invoke('text').then((newScore) => {
        cy.wrap(convertScoreToNumber(newScore)).should('eq', convertScoreToNumber(oldScore) - 1);
      });
    });
  });
});
