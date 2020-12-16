'use strict';

let hornArray = [];
let keyword = [];
let $page1 = $('#page1');
let $page2 = $('#page2');
let $container = $('.photo-container');
//let $template = $('#photo-template').html;
//let$dropdown = $('#dropdown');
let $dropdown2 = $('#dropdown2');
let showPhotos = [];

function HornInfo(obj) {
  this.imgUrl = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  this.page = page;
  hornArray.push(this);
}
//can we determine page number from url with a let statement?
let page;
if (this.url === './data/page-1.json') {
  page = 1;
} else if (this.url === './data/page-2.json') {
  page = 2;
}

function renderHornArray() {
  console.log(hornArray);
  hornArray.forEach($HornTemplate => {
    let $newHorn = $('#photo_template').clone();
    $newHorn.removeAttr('id');
    $newHorn.find('h2').text($HornTemplate.title);
    let hornPath = $HornTemplate.imgUrl;
    $newHorn.find('img').attr('src', hornPath);
    $newHorn.find('p').text($HornTemplate.description);
    $newHorn.addClass($HornTemplate.keyword);
    $('main').append($newHorn);
    console.log($HornTemplate);

    if (!keyword.includes($HornTemplate.keyword)) keyword.push($HornTemplate.keyword);
  });
}

// renders with Mustache.js
//function render(pageNumber) {
// console.log(hornArrary);
//$('section').remove();
//hornArrary.forEach(obj => {
// if (obj.page === pageNumber) {
// console.log(obj.page)
// let $template = $('#mustache-tmpl').html();
//let mustTmpl = Mustache.render($template, obj);
// $('main').append(mustTmpl);
//}
//});
//}

$.ajax('./data/page-1.json')
  .then(data => {
    data.forEach(object => new HornInfo(object));
    renderHornArray();
    console.log(keyword);
    keyword.forEach(key => {
      let newoption = $(`<option>${key}</option>`);
      $('.filter').append(newoption);
    });

    $('.filter').on('change', function () {
      let value = $(this).val();
      $('section').hide();
      $(`.${value}`).show();
      if (value === 'default') $('main').find('section').show();
    });
    //event handler for keyword dropdown
    $dropdown2.change(function () {
      let $photos = $('.photo');
      let val = $(this).val();
      let $photoToShow = $('.' + val);
      if (val === 'default') {
        $photos.show();
      } else {
        $photos.hide();
        $photoToShow.show();
      }
    });

    // pagination implementation
    $page1.click(function () {
      $container.empty();
      hornArray = [];
      $.ajax('./data/page-1.json').then(data => {
        data.forEach(object => new HornInfo(object));
        renderHornArray();
      });
    });

    $page2.click(function () {
      $container.empty();
      hornArray = [];
      $.ajax('./data/page-2.json').then(data => {
        data.forEach(object => new HornInfo(object));
        renderHornArray();
      });
    });
    // handler for the sort dropdown
    $dropdown2.change(function () {
      let val = $(this).val();

    });

  });
