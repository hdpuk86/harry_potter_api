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
  setupGryffindor(students);
};

var setupGryffindor = function(students){
  document.getElementById('main').style.backgroundImage = "url('gryffindor_room.jpeg')";

  var portrait = document.getElementById('moving-portrait');
  portrait.src = "dumble.gif";

  setupStudent(students, "Harry Potter", "harry.png", "char1");
  setupStudent(students, "Ron Weasley", "ron.png", "char2");
  setupStudent(students, "Hermione Granger", "hermione.png", "char3");

};

var setupStudent = function(students, name, imageSrc, studentNumber){
  var student = getStudentFromApi(students, name);
  var studentDiv = document.getElementById(studentNumber);
  var studentImage = document.getElementById(studentNumber + '-img');
  studentImage.src = imageSrc;
  setStudentListener(student, studentImage, studentDiv);
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
