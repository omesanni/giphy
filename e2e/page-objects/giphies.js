class Giphies {
  constructor() {
    this.searchInput = element(by.id('search-input'));
    this.searchButton = element(by.id('search-btn'));
    this.loader = element(by.className('loader'));
    this.modal = element(by.className('modal'));
    this.pageItem = element.all(by.className('page-item')).get(3);
    this.allGiphies = element.all(by.css('[id^=giphy-]'));
    this.upvoteIcon = by.className('rank-controls__up');
    this.downvoteIcon = by.className('rank-controls__down');
    this.outerCardContainer = element(by.css('.card.card--emboss'));

    this.pageLimitSelect = element(by.id('page-limit-select'))
      .element(by.cssContainingText('option', '50'));
    this.sortingOption = element(by.id('sort-select'))
      .element(by.cssContainingText('option', 'asc'));
  }

  startBrowser() {
    browser.get(browser.baseUrl);
  }
}

module.exports = Giphies;
