var fs = require('fs');

global.fillText = function(el, text){
  el.clear().sendKeys(text);
}

global.selectOption = function(name){
  element(by.cssContainingText('option', name)).click();
},

global.clickLink = function(name){
  element(by.linkText(name)).click();
}

global.clickButton = function(name){
  element(by.buttonText(name)).click();
}

global.clickId = function(name){
  element(by.id(name)).click();
}

global.clickPrimaryButton = function(){
  element(by.css('.btn-primary')).click();
}

global.expectText = function(el,expected){
  el.getText().then(function(txt){
    expect(txt).toBe(expected);
  });
}

global.expectTextOr = function(el,expected1, expected2){
  el.getText().then(function(txt){
    var ex1 = (txt === expected1);
    var ex2 = (txt === expected2);
    expect(ex1 || ex2).toBe(true);
  });
}

global.expectValue = function(el,expected){
  el.getAttribute('value').then(function(txt){
    expect(txt).toBe(expected);
  });
}

global.scrollUp = function(){
  browser.executeScript('window.scrollBy(0,-400);').then(function(){
    browser.driver.sleep(1000);
  });
}

global.scrollDown = function(){
  browser.executeScript('window.scrollBy(0,400);').then(function(){
    browser.driver.sleep(1000);
  });
}

global.switchTab = function(number){
  browser.getAllWindowHandles().then(function (handles) {
    browser.driver.switchTo().window(handles[number]);
  });
}

global.closeTab = function(number)
{
  browser.getAllWindowHandles().then(function (handles) {
    browser.driver.switchTo().window(handles[number]);
    browser.driver.close();
    browser.driver.switchTo().window(handles[0]);
  });
}

global.closeOtherTabs = function()
{
  browser.getAllWindowHandles().then(function (handles) {
    for (var i = handles.length;i > 1;i--)
    {
      browser.driver.switchTo().window(handles[i-1]);
      browser.driver.close();
    }
    browser.driver.switchTo().window(handles[0]);
  });
}

// global.waitForVisibility = function(waitElement)
// {
//   var deferred = protractor.promise.defer();
//   var EC = protractor.ExpectedConditions;
//   browser.wait(EC.visibilityOf(waitElement),20000).then(function(){
//     return deferred.fullfill();
//   });
// }

// global.waitForVisibility =function(promiseFn, testFn) {
//   browser.wait(function () {
//     var deferred = protractor.promise.defer();
//     promiseFn().then(function (data) {
//       deferred.fulfill(testFn(data));
//     });
//     return deferred.promise;
//   });
// }

global.writeScreenShot = function(data, filename)
{
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

global.getTodaySlash = function()
{
  var today = new Date();
  var dd = today.getDate().toString();
  var mm = today.getMonth()+1; //January is 0!
  mm = mm.toString();
  var yy = today.getFullYear().toString().substr(2,2);
  if (mm.length<2) mm = '0'+mm;
  if (dd.length<2) dd = '0'+dd;
  // return yy + '-' + mm + '-' + dd;
  return dd + '/' + mm + '/' + yy;
}

global.getToday = function()
{
  var today = new Date();
  var dd = today.getDate().toString();
  var mm = today.getMonth()+1; //January is 0!
  mm = mm.toString();
  var yyyy = today.getFullYear();
  if (mm.length<2) mm = '0'+mm;
  if (dd.length<2) dd = '0'+dd;
  return yyyy + '-' + mm + '-' + dd;
  // return dd + '/' + mm + '/' + yy;
}
