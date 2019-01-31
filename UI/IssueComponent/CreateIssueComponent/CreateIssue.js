import UserProvider from '/Provider/UserProvider.js';
import SprintProvider from '/Provider/SprintProvider.js';
import IssueProvider from '/Provider/IssueProvider.js';
import StatusProvider from '/Provider/StatusProvider.js';
import Issue from '/DataModel/Issue.js';
import User from '/DataModel/User.js';
import Sprint from '/DataModel/Sprint.js';
var sprintProvider = new SprintProvider();
var issueProvider = new IssueProvider();
var userProvider = new UserProvider();
var statusProvider = new StatusProvider();
var users = userProvider.getAllUsers();
var userName = localStorage.getItem("curentUserName");
var currentUser = userProvider.findUserByName(userName);
console.log(localStorage.getItem("currentSprint"));
var sprint = JSON.parse(localStorage.getItem("currentSprint"));
var issueCategory = localStorage.getItem("issueCategory");


window.onload = function(){
    var userList = document.getElementById("userListIssue");
    for (var i = 0; i < users.length; i++) {
        var opt = users[i];
        var element = document.createElement("option");
        element.textContent = opt.name;
        element.value = opt.name;
        userList.appendChild(element);
    }
    if (issueCategory=="subtask")
    {
        var typeList = document.getElementById("typeList");
        typeList.remove(typeList.length-1);
        typeList.remove(typeList.length-1);
    }
}
function validation(name,description)
{
    var valid = true;
    if (name=="")
    {
        valid = false;
        alert("Name field is empty!!!");
    }
    if (description=="")
    {
        valid = false;
        alert("Description field is empty!!!");
    }
    return valid;
}
var saveIssueBtn = document.getElementById("saveIssueBtn");
saveIssueBtn.onclick=function(){
    var name = document.getElementsByName("issueName")[0].value; 
    var description = document.getElementsByName("description")[0].value; 
    if (validation(name,description)!==false)
    {
        var id = issueProvider.generateNextId();
        var sprint = JSON.parse(localStorage.getItem("currentSprint"));
        if (issueCategory=="subtask")
        {
            var issue = JSON.parse(localStorage.getItem("currentIssue"));
            var subtasks = issue.tasks;
            subtasks.push(id);
            issue.tasks = subtasks;
            issueProvider.updateIssue(issue);
        }       
        var indexType = document.getElementById("typeList").selectedIndex;
        var selectedType = document.getElementById("typeList").options;
        var type = selectedType[indexType].text;
        var currentUser = userProvider.findUserByName(userName);
        var indexAssignee = document.getElementById("userListIssue").selectedIndex;
        var selectedAssignee = document.getElementById("userListIssue").options;
        var assigneeName = selectedAssignee[indexAssignee].text;
        var assignee = userProvider.findUserByName(assigneeName);
        var status = statusProvider.findStatusByType("New");
        console.log(status);
        var tasks = [];
        var comments = [];
        var updatedAt = null;
        var createdAt = getCurrentDate();
        console.log(assignee.id);
        var issue = new Issue(id,type,name,sprint.id,currentUser.id,assignee.id,description,status.id,tasks,comments,updatedAt,createdAt);
        issueProvider.insertIssue(issue);
    }
}
function getCurrentDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    }
    if (mm < 10) {
    mm = '0' + mm;
    }
    today =dd + '.' + mm + '.' + yyyy;
    return today;
}