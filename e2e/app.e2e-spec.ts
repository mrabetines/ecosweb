import { EcosWebPage } from './app.po';

describe('ecos-web App', () => {
  let page: EcosWebPage;

  beforeEach(() => {
    page = new EcosWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
