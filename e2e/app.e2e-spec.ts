import { SpotifyngPage } from './app.po';

describe('spotifyng App', () => {
  let page: SpotifyngPage;

  beforeEach(() => {
    page = new SpotifyngPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
