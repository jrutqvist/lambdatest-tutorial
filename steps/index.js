
const USERNAME = '{yourUserName}';
const KEY = '{yourAccesKey}';

const webdriver = require('selenium-webdriver');
const GRID_HOST = 'hub.lambdatest.com/wd/hub';
const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

function testButtonFunction() {
    // Setup Input capabilities
    const capabilities = {
        platform: 'windows 10',
        browserName: 'chrome',
        version: '76.0',
        resolution: '1280x800',
        network: true,
        visual: true,
        console: true,
        video: true,
        name: 'Test click',
        build: 'First build'
    }

    const driver = new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(capabilities)
        .build();
    
    // navigate to a url, click the button and get title of next page.
    driver.get("{yourURL}").then(function() {
        driver.findElement(webdriver.By.linkText("click me!")).click().then(function() {
            driver.getTitle().then(function(title) {
                setTimeout(function() {if(title === 'Second Page') {
                        console.log('Passed');
                        driver.executeScript('lambda-status=passed');
                        driver.quit();
                    } else {
                        console.log('failed');
                        driver.executeScript('lambda-status=failed');
                        driver.quit();
                    }
                }, 5000);
            });
        });
    });
}
testButtonFunction();