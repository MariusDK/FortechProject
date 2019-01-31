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
var statues = statusProvider.getStatusList();
var sprints = sprintProvider.getAllSprints();
var userName = localStorage.getItem("curentUserName");
var currentUser = userProvider.findUserByName(userName);
var sprint = JSON.parse(localStorage.getItem("currentSprint"));
var issueCategory = localStorage.getItem("issueCategory");
var issue = JSON.parse(localStorage.getItem("currentIssue"));

window.onload = function(){
    var sprintName = "Issue se gaseste in sprint: "+sprint.name;
    console.log(sprintName);
    document.getElementById("sprintName").innerHTML = sprintName;
    document.getElementsByName("issueName")[0].value = issue.name; 
    document.getElementsByName("description")[0].value = issue.description; 
    var userList = document.getElementById("userListIssue");
    for (var i = 0; i < users.length; i++) {
        var opt = users[i];
        var element = document.createElement("option");
        element.textContent = opt.name;
        element.value = opt.name;
        userList.appendChild(element);
    }
    var statusList = document.getElementById("statusList");
    for (var i = 0; i < statues.length; i++) {
        var opt = statues[i];
        var element = document.createElement("option");
        element.textContent = opt.type;
        element.value = opt.type;
        statusList.appendChild(element);
    }
    var sprintList = document.getElementById("sprintList");
    for (var i = 0; i < sprints.length; i++) {
        var opt = sprints[i];
        var element = document.createElement("option");
        element.textContent = opt.name;
        element.value = opt.id;
        sprintList.appendChild(element);
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
var updateIssueBtn = document.getElementById("updateIssueBtn");
updateIssueBtn.onclick=function(){
    var name = document.getElementsByName("issueName")[0].value; 
    var description = document.getElementsByName("description")[0].value; 
    if (validation(name,description)!==false)
    {
        var issue = JSON.parse(localStorage.getItem("currentIssue"));
        var id = issue.id;
        var indexSprint = document.getElementById("sprintList").selectedIndex;
        var selectedSprint = document.getElementById("sprintList").options;
        var sprint = selectedSprint[indexSprint].value;
        console.log(sprint);
              
        var indexType = document.getElementById("typeList").selectedIndex;
        var selectedType = document.getElementById("typeList").options;
        var type = selectedType[indexType].text;

        var currentUser = userProvider.findUserByName(userName);
        var indexAssignee = document.getElementById("userListIssue").selectedIndex;
        var selectedAssignee = document.getElementById("userListIssue").options;
        var assigneeName = selectedAssignee[indexAssignee].text;
        var assignee = userProvider.findUserByName(assigneeName);

        var indexStatus = document.getElementById("statusList").selectedIndex;
        var selectedStatus = document.getElementById("statusList").options;
        var statustype = selectedStatus[indexStatus].text;
        var status = statusProvider.findStatusByType(statustype);
        var tasks = issue.tasks;
        var comments = issue.comments;
        var updatedAt = getCurrentDate();
        var createdAt = issue.createdAt;
        var issueNew = new Issue(id,type,name,sprint,currentUser.id,assignee.id,description,status.id,tasks,comments,updatedAt,createdAt);
        issueProvider.updateIssue(issueNew);
        var subtasks = issueProvider.getAllSubtasksOfIssue(issueNew);
        subtasks.forEach(subtask => {
            subtask.sprint = sprint;
            subtask.status = issueNew.status;
            subtask.updatedAt = issue.updatedAt;
            issueProvider.updateIssue(subtask);
        });
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