class Giphies {
  constructor() {
    this.searchInput = () => cy.get('#search-input');
    this.searchButton = () => cy.get('#search-btn');
    this.allGiphies = () => cy.get('[id^=giphy-]');
    this.modal = () => cy.get('.modal');
    this.sortingSelect = () => cy.get('#sort-select');
  }

  startBrowser() {
    cy.visit('/');
  }
}

module.exports = Giphies;
