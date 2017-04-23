describe('testcases - ', function() {
  var testcaseId = '';
  var testcasesnumber = 0;

  beforeAll(function(){
    browser.get('http://demo.qaconsole.com');
  });

  it('check number of test cases before', function() {
    element(by.linkText('test cases')).click();
    element.all(by.repeater('(colRenderIndex, col) in colContainer.renderedColumns')).count().then(function(c){
      console.log(c);
      testcasesnumber = c;
    });
  });

  it('create test case', function() {
    // element(by.linkText('test cases')).click();
    element(by.linkText('new test case')).click();
    selectOption('Dashboard');
    selectOption('Main');
    selectOption('Production');
    element(by.model('time')).sendKeys('0.1');
    element(by.model('automated')).click();
    element(by.model('title')).sendKeys('Just test case');
    element(by.model('content')).sendKeys('Content');
    $('.btn').click();
  });

  it('check number of test cases after', function() {
    element(by.linkText('test cases')).click();
    element.all(by.repeater('(colRenderIndex, col) in colContainer.renderedColumns')).count().then(function(c){
      console.log(c);
      expect(c).toBe(testcasesnumber+10);
    });
  });

  it('sort by testcaseId', function() {
    $$('.ui-grid-header-cell-label').get(2).click();
    $$('.ui-grid-header-cell-label').get(2).click();
  });

  it('test case details', function() {
    element(by.linkText('Details')).click();
    $$('dl dd').map(function(e,i){
      e.getText().then(function(t){
        console.log(i,';',t);
      });
    });
  });

  it('pass test case', function() {
    $('.btn-success').click();
    browser.executeScript('location.reload();').then(function(){
      browser.driver.sleep(3000);
    });
  });

  it('verify test case after pass', function() {
    $$('dl dd').get(8).getText().then(function(t){
      expect(t).toBe('passed');
    });
    var executions = element.all(by.repeater('exec in executions')).get(0).all(by.css('div'));
    executions.get(1).getText().then(function(t){
      expect(t).toBe('passed');
    });
    executions.get(2).getText().then(function(t){
      expect(t).toBe('Manual');
    });
    executions.get(4).getText().then(function(t){
      expect(t).toBe('seba@best4test.com');
    });
  });

  it('fail test case', function() {
    $('.btn-danger').click();
    browser.executeScript('location.reload();').then(function(){
      browser.driver.sleep(1000);
    });
  });

  it('verify test case after fail', function() {
    $$('dl dd').get(8).getText().then(function(t){
      expect(t).toBe('failed');
    });
    var executions = element.all(by.repeater('exec in executions')).get(0).all(by.css('div'));
    executions.get(1).getText().then(function(t){
      expect(t).toBe('failed');
    });
    executions.get(2).getText().then(function(t){
      expect(t).toBe('Manual');
    });
    executions.get(4).getText().then(function(t){
      expect(t).toBe('seba@best4test.com');
    });
  });


    it('edit test case', function() {
      element(by.linkText('edit')).click();
      element(by.model('testcase.active')).click();
      element(by.model('testcase.title')).sendKeys('Update');
      selectOption('Production');
      $('.btn').click();
    });

    it('verify test case after edit', function() {
      $$('dl dd').get(7).getText().then(function(t){
        expect(t).toBe('false');
      });
    });

    it('delete test case', function() {
      element(by.linkText('delete')).click();
    });

});
