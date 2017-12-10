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
  addStudentDetails(students);
};

var getStudentFromApi = function(students, studentName){
  for(student of students){
    if(student.name === studentName){
      return student;
    }
  }
};

var addStudentDetails = function(students){
  var harry = getStudentFromApi(students, "Harry Potter");
  var ron = getStudentFromApi(students, "Ron Weasley");
  var hermione = getStudentFromApi(students, "Hermione Granger");

  var harryDiv = document.getElementById('harry');
  var ronDiv = document.getElementById('ron');
  var hermioneDiv = document.getElementById('hermione');

  addStudentText(harryDiv, harry);
  addStudentText(ronDiv, ron);
  addStudentText(hermioneDiv, hermione);
};

var addStudentText = function(div, student){
  var ul = document.createElement('ul');
  var name = document.createElement('li');
  name.innerText = student.name;
  var dob = document.createElement('li');
  dob.innerText = student.dateOfBirth;
  var ancestry = document.createElement('li');
  ancestry.innerText = student.ancestry;
  var patronus = document.createElement('li');
  patronus.innerText = student.patronus;
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
