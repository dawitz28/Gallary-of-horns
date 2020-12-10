'use strict';

const hornArray = [];

function HornInfo(image_url,title,description,keyword,horns,page) {
  this.imgUrl = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  this.page = page;
  hornArray.push(this);
}

$.ajax('./data/page-1.json')
  .then(data => {
    data.forEach(object => new HornInfo(object.image_url));
    hornArray.forEach($HornTemplate => {
      let $newHorn = $('<img></img>');
      let hornPath = $HornTemplate.imgUrl;
      $newHorn.attr('src', hornPath);
      $('main').append($newHorn);

    });
  });
// HornInfo.prototype.render = function (keyWord) {

// };
