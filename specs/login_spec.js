describe('login - ', function() {

  beforeAll(function(){

  });

  it('login ', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://demo.qaconsole.com');
    element(by.name('email')).sendKeys('seba@best4test.com');
    element(by.name('password')).sendKeys('123456');
    $('.btn-lg').click();
    browser.driver.sleep(5000);
    browser.ignoreSynchronization = false;
  });

});
