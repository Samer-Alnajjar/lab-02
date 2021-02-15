"use strict"

let keyWords = [];
let filteredKeywords = []
let arrOfObjects = [];

function Photo(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  keyWords.push(this.keyword);

  arrOfObjects.push(this);
}


Photo.prototype.render = function(){
  let newTemplate = $("#photo-template").clone();

  // console.log(newTemplate);
  newTemplate.find("h2").text(this.title);
  newTemplate.find("img").attr("src", this.image_url);
  newTemplate.find(".description").text(this.description);
  newTemplate.find(".keyword").text(this.keyword);
  newTemplate.find(".horns").text(this.horns);
  newTemplate.removeAttr("id");
  
  $("main").append(newTemplate);
}

function populate () {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('./data/page-1.json', ajaxSettings)
  .then(data=>{
      data.forEach(el=>{
          let newPhoto = new Photo(el.image_url, el.title, el.description, el.keyword, el.horns);
          newPhoto.render();
        })
        onClick();
        filterList();
  })
}

$('document').ready(populate);

function filterList() {
    $.each(keyWords, function(i, el){
    if($.inArray(el, filteredKeywords) === -1) filteredKeywords.push(el);
    });

    for (let i = 0; i < filteredKeywords.length; i++) {
      $('select').append(`<option value="${filteredKeywords[i]}">${filteredKeywords[i]}</option>`)
    }
}


function onClick() {
  $('select').on('change', function(){
    $('#super').children().not(':first-child').remove();

    for (let i = 0; i < arrOfObjects.length; i++) {
      
      if (this.value == arrOfObjects[i].keyword) {
        arrOfObjects[i].render();
        
      }
      
    }
  })

}
