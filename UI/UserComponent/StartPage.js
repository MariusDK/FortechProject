import UserProvider from '/Provider/UserProvider.js';
import User from '/DataModel/User.js';
import Project from '/DataModel/Project.js';
import ProjectProvider from '/Provider/ProjectProvider.js';
//localStorage.clear();
var userProvider = new UserProvider();
var projectProvider = new ProjectProvider();
var userList = userProvider.getAllUsers();
if (userList.length<4)
{
    var idUser = userProvider.generateNextId();
    var myObj1 = new User(idUser,'Marius');
    userProvider.insertUser(myObj1);
    var idUser = userProvider.generateNextId();
    var myObj1 = new User(idUser,'Daniel');
    userProvider.insertUser(myObj1);
    var idUser = userProvider.generateNextId();
    var myObj1 = new User(idUser,'Ionut');
    userProvider.insertUser(myObj1);
    var idUser = userProvider.generateNextId();
    var myObj1 = new User(idUser,'Gabriel');
    userProvider.insertUser(myObj1);
}
var projectList = projectProvider.getAllProjects();
if (projectList.length<1){
    var idProject = projectProvider.generateNextId();
    var project1 = new Project(idProject);
    projectProvider.insertProject(project1);
}

var users = [];
var projects = [];
users = userProvider.getAllUsers();
projects = projectProvider.getAllProjects();
console.log(projects);
window.onload = function(){
    var userList = document.getElementById("userList");
    for (var i = 0; i < users.length; i++) {
        var opt = users[i];
        var element = document.createElement("option");
        element.textContent = opt.name;
        element.value = opt.name;
        userList.appendChild(element);
    }
    var projectList = document.getElementById("projectList");
    for (var i = 0; i < projects.length; i++) {
        var opt = projects[i];
        console.log(opt);
        var element = document.createElement("option");
        element.textContent = opt.id;
        element.value = opt.id;
        projectList.appendChild(element);
    }
}
