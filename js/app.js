'use strict';

const hornArray = [];
let keyword = [];
let $page1 = $('#page1');
let $page2 = $('#page2');
// let $container = $('photo-container');
// let $template = $('#photo-template').html;
// let$dropdown = $('#dropdown');
// let $dropdown2 = $ $('#dropdown2');
// 

function HornInfo(obj) {
  this.imgUrl = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  this.page = obj.page;
  hornArray.push(this);
}

$.ajax('./data/page-1.json')
  .then(data => {
    data.forEach(object => new HornInfo(object));
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
    console.log(keyword);
    keyword.forEach(key => {
      let newoption = $(`<option>${key}</option>`);
      $('.filter').append(newoption);
    });

    $('.filter').on('change', function () {
      let value = $(this).val();
      $('section').hide();
      $(`.${value}`).show();
      if (value === 'default') $('section').show();
    });
    // pagination implementing.
    $page1.click(function () {
      $container.empty();
      photoArray = [];
      $.ajax('./data/page-1.json').then(showPhotos);
    });

    $page2.click(function () {
      $container.empty();
      photoArray = []; 
      $.ajax('./data/page-2.json').then(showPhotos);
    });


  });
