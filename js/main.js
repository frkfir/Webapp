var tabQuickReports = document.getElementById('tab-quick-reports');
var quickReports = document.getElementById('quick-reports');
var $iframe = document.getElementById('iframe');
var $select = document.querySelector('#quick-reports select');
var $iconExpandLink = document.querySelector('#quick-reports .icon-expand-link');
var $iconSettingsLink = document.querySelector('.icon-settings');
var $settingsContent = document.querySelector('.settings-content');
var $settingsButtonSave = document.querySelector('.settings-button-save');
var $settingsButtonCancel = document.querySelector('.settings-button-cancel')
var $contentListItems = document.querySelectorAll('.sites-list');


console.log($contentListItems);

tabQuickReports.classList.add('selected');
quickReports.classList.add('selected');

/*------- Tabs -------*/

var tabs = document.querySelectorAll('.tabs .menu-tabs');
var content = document.querySelectorAll('.tabs-content');

for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (obj) {

        //remove .selected from all tabs
        for (var j = 0; j < tabs.length; j++) {
            tabs[j].classList.remove('selected')
        }

        for (var k = 0; k < tabs.length; k++) {
            content[k].classList.remove('selected')
        }

        this.classList.add('selected');


        var $link = this.querySelector('a');
        var href = $link.getAttribute('href');

        href = href.replace('#', '');

        var reports = document.getElementById(href);

        reports.classList.add('selected');


    });

};

/*------- Tabs - End -------*/

$iframe.setAttribute('src', $select.value);
$iconExpandLink.href = $select.value;

$select.addEventListener('change', function () {

    var url = $select.value;
    $iframe.setAttribute('src', url);
    $iconExpandLink.setAttribute('href', url)

});

$iconSettingsLink.addEventListener('click', function () {
    this.classList.toggle('selected');
    $settingsContent.classList.toggle('selected');
});


$settingsButtonSave.addEventListener('click', function () {

    var sites = {};

    for (var i = 0; i < $contentListItems.length; i++) {

        var name = $contentListItems[i].querySelector('.input-field-name').value;
        var url = $contentListItems[i].querySelector('.input-field-url').value;

    sites[name] = url;

    }

    localStorage.setItem('sites', JSON.stringify(sites));

    $iconSettingsLink.classList.toggle('selected');
    $settingsContent.classList.toggle('selected');

    setListItems();

});

$settingsButtonCancel.addEventListener('click', function() {
    $iconSettingsLink.classList.toggle('selected');
    $settingsContent.classList.toggle('selected');
});

function setListItems () {

    var sites = JSON.parse(localStorage.getItem('sites'));
    $select.innerHTML = '';

    for (site in sites) {
        var $optionSites = document.createElement('option');
        $optionSites.value = sites[site];
        $optionSites.innerHTML = site;

        $select.appendChild($optionSites);

        fireEvent($select, 'change');
    }
    }

setListItems();


var i = 0;
var sitesnew = JSON.parse(localStorage.getItem('sites'));
for (obj in sitesnew) {
    $contentListItems[i].querySelector('.input-field-name').value = obj;
    $contentListItems[i].querySelector('.input-field-url').value = sitesnew[obj];

    i++;
}



function fireEvent(element, event) {
    if (document.createEventObject) {
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent('on' + event, evt)
    } else {
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true); // event type,bubbling,cancelable
        return element.dispatchEvent(evt);
    }
};























