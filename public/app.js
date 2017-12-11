var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var students = JSON.parse(jsonString);
  setupGryffindor(students);
  setSelectListener(students);
};

var setSelectListener = function(students){
  var select = document.getElementById('select-location');
  select.addEventListener('change', function(event){
    var index = event.target.selectedIndex;
    if(index === 1){
      setupGryffindor(students);
    } else if (index === 2){
      setupSlytherin(students);
    }
  })
};

var setupGryffindor = function(students){
  document.getElementById('main').style.backgroundImage = "url('gryffindor_room.jpeg')";
  var portrait = document.getElementById('moving');
  portrait.src = "dumble.gif";
  setupStudent(students, "Harry Potter", "harry.png", "char1");
  setupStudent(students, "Ron Weasley", "ron.png", "char2");
  setupStudent(students, "Hermione Granger", "hermione.png", "char3");
};

var setupSlytherin = function(students){
  document.getElementById('main').style.backgroundImage = "url('slytherin.jpeg')";
  var moving = document.getElementById('moving');
  moving.src = "";
  setupStudent(students, "Draco Malfoy", "draco.png", "char1");
  setupStudent(students, "Lord Voldemort", "voldemort.png", "char2");
  setupStudent(students, "Severus Snape", "snape.png", "char3");
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
    //add a temporary ul
    addStudentText(div, student);
  });
  image.addEventListener('mouseout', function(){
    //delete the temporary ul without deleting the image
    if(div.children.length > 1){
      div.removeChild(div.lastChild);
    }
  })
};

var addStudentText = function(div, student){
  //delete the ul of the previous student
  if(div.children.length > 1){
    div.removeChild(div.lastChild);
  }
  //create a new ul
  var ul = document.createElement('ul');
  ul.id = student.name;
  ul.className = "student-text";
  //create and append the list
  createAndAppendLi(ul, student.name, "Name");
  createAndAppendLi(ul, student.dateOfBirth, "D.O.B");
  createAndAppendLi(ul, student.ancestry, "Ancestry");
  createAndAppendLi(ul, student.patronus, "Patronus");
  div.appendChild(ul);
};

var createAndAppendLi = function(ul, attribute, label){
  var element = document.createElement('li');
  element.innerText = label + ": " + attribute;
  ul.append(element);
};

var app = function(){
  url = "http://hp-api.herokuapp.com/api/characters";
  makeRequest(url, requestComplete);
};

window.addEventListener('load', app);
