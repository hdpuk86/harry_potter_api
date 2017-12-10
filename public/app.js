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

  var harry = getStudentFromApi(students, "Harry Potter");
  var harryDiv = document.getElementById('harry');
  var harryImage = document.getElementById('harry-img');
  setStudentListener(harry, harryImage, harryDiv);

  var ron = getStudentFromApi(students, "Ron Weasley");
  var ronDiv = document.getElementById('ron');
  var ronImage = document.getElementById('ron-img');
  setStudentListener(ron, ronImage, ronDiv);

  var hermione = getStudentFromApi(students, "Hermione Granger");
  var hermioneDiv = document.getElementById('hermione');
  var hermioneImage = document.getElementById('hermione-img');
  setStudentListener(hermione, hermioneImage, hermioneDiv);
};

var getStudentFromApi = function(students, studentName){
  for(student of students){
    if(student.name === studentName){
      return student;
    }
  }
};

var setStudentListener = function(student, image, div){
  image.addEventListener('mouseover', function(){
    addStudentText(div, student);
  });
  image.addEventListener('mouseout', function(){
    removeStudentText(div, student);
  })
};

var removeStudentText = function(div, student){
  var ul = document.getElementById(student.name);
  div.removeChild(ul);
};

var addStudentText = function(div, student){
  var ul = document.createElement('ul');
  ul.id = student.name;
  var name = document.createElement('li');
  name.innerText = "Name: " + student.name;
  var dob = document.createElement('li');
  dob.innerText = "D.O.B: " + student.dateOfBirth;
  var ancestry = document.createElement('li');
  ancestry.innerText = "Ancestry: " +  student.ancestry;
  var patronus = document.createElement('li');
  patronus.innerText = "Patronus: " + student.patronus;
  ul.appendChild(name);
  ul.appendChild(dob);
  ul.appendChild(ancestry);
  ul.appendChild(patronus);
  div.appendChild(ul);
};

var app = function(){
  url = "http://hp-api.herokuapp.com/api/characters/students";
  makeRequest(url, requestComplete);
};

window.addEventListener('load', app);
