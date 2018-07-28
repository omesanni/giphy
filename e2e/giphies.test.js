const Giphies = require('./page-objects/giphies');

describe('Giphies', () => {
  const giphiesPage = new Giphies();
  const expectedConditions = protractor.ExpectedConditions;

  let resultElement;

  beforeEach((done) => {
    giphiesPage.startBrowser();
    browser.wait(expectedConditions.presenceOf(giphiesPage.outerCardContainer))
      .then(() => done());
  });

  function performSearch() {
    resultElement = giphiesPage.allGiphies.first();

    giphiesPage.searchInput.sendKeys('drake');
    giphiesPage.searchButton.click();

    return browser.wait(expectedConditions.presenceOf(resultElement));
  }

  function convertScoreToNumber(score) {
    return Number(score.replace(/,/g, ''));
  }

  it('should search for tag when search button is clicked', (done) => {
    performSearch().then((present) => {
      expect(present).to.be.true; // eslint-disable-line
      done();
    });
  });

  it('should sort giphies', (done) => {
    performSearch().then(() => {
      const oldProm = resultElement.getAttribute('id');

      giphiesPage.sortingOption.click();
      const newProm = giphiesPage.allGiphies.first().getAttribute('id');

      protractor.promise.all([oldProm, newProm]).then((results) => {
        const [oldID, newID] = results;
        expect(oldID).to.not.equal(newID);
        done();
      });
    });
  });

  it('should show modal when a giphy is clicked', (done) => {
    performSearch().then(() => {
      resultElement.element(by.className('card__img')).click();

      giphiesPage.modal.getAttribute('class').then((className) => {
        expect(className.includes('is-open')).to.be.true; // eslint-disable-line
        done();
      });
    });
  });

  it('should upvote giphy', (done) => {
    performSearch().then(() => {
      const oldProm = resultElement.element(by.css('.badge')).getText();

      resultElement.element(giphiesPage.upvoteIcon).click();
      const newProm = resultElement.element(by.css('.badge')).getText();

      protractor.promise.all([oldProm, newProm]).then((results) => {
        const [oldScore, newScore] = results;

        expect(oldScore).to.not.equal(newScore);
        expect(convertScoreToNumber(newScore)).to.equal(convertScoreToNumber(oldScore) + 1);

        done();
      });
    });
  });

  it('should dowvote giphy', (done) => {
    performSearch().then(() => {
      const oldProm = resultElement.element(by.css('.badge')).getText();

      resultElement.element(giphiesPage.upvoteIcon).click();
      const newProm = resultElement.element(by.css('.badge')).getText();

      protractor.promise.all([oldProm, newProm]).then((results) => {
        const [oldScore, newScore] = results;

        expect(oldScore).to.not.equal(newScore);
        expect(convertScoreToNumber(newScore)).to.equal(convertScoreToNumber(oldScore) - 1);

        done();
      });
    });
  });
});
