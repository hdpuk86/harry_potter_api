var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var students = JSON.parse(jsonString);
  console.log(students[0]);
};

var app = function(){
  url = "http://hp-api.herokuapp.com/api/characters/students";
  makeRequest(url, requestComplete);
};

window.addEventListener('load', app);
