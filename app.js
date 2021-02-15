"use strict"

function Photo(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

Photo.prototype.render = function(){
  let newTemplate = $("#photo-template").clone();
  newTemplate = $(newTemplate[0].content);

  console.log(newTemplate);
  newTemplate.find("h2").text(this.title);
  newTemplate.find("img").attr("src", this.image_url);
  newTemplate.find(".description").text(this.description);
  newTemplate.find(".keyword").text(this.keyword);
  newTemplate.find(".horns").text(this.horns);
  newTemplate.removeClass("photo-template");

  $("main").append(newTemplate);

}

function populate () {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('page-1.json', ajaxSettings)
  .then(data=>{
      data.forEach(el=>{
          let newPhoto = new Photo(el.image_url, el.title, el.description, el.keyword, el.horns);
          newPhoto.render();
      })
  })
}

$('document').ready(populate);

//Filter


