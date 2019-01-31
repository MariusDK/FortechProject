import UserProvider from '/Provider/UserProvider.js';
import User from '/DataModel/User.js';
import Project from '/DataModel/Project.js';
import ProjectProvider from '/Provider/ProjectProvider.js';
import Sprint from '/DataModel/Sprint.js';
import SprintProvider from '/Provider/SprintProvider.js';
import IssueProvider from '/Provider/IssueProvider.js';
import StatusProvider from '/Provider/StatusProvider.js';

var userProvider = new UserProvider();
var issueProvider = new IssueProvider();
var sprintProvider = new SprintProvider();
var projectProvider = new ProjectProvider();
var statusProvider = new StatusProvider();
var idProject = localStorage.getItem("curentProjectId");
var currentProject = projectProvider.getProjectById(idProject);
window.onload = function(){
    var sprints = sprintProvider.getSprintsOfProject(currentProject.sprints);
    var nrSprintsValue = "Project have "+ sprints.length +" Sprints";
    document.getElementById("nrSprints").innerHTML = nrSprintsValue;
    addRows();
    addRowsToIssuesTable(0);
}
// window.onchange = function()
// {
//     var table=document.getElementById("ProjectTable");
//     var tableHeaderRowCount = 1;
//     var rowCount = table.rows.length;
//     for (var i = tableHeaderRowCount; i < rowCount; i++) {
//         table.deleteRow(tableHeaderRowCount);
//     }
//     addRows();
// }
function refresh()
{
    var sprints = sprintProvider.getSprintsOfProject(currentProject.sprints);
    var nrSprintsValue = "Project have "+ sprints.length +" Sprints";
    document.getElementById("nrSprints").innerHTML = nrSprintsValue;
    var table=document.getElementById("ProjectTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    addRows();
}
var createSprintBtn = document.getElementById("createSprintBtn");
createSprintBtn.onclick=function()
{
    var name = document.getElementsByName("sprintName")[0].value;
    if (name=="")
    {
        alert("Name input is empty!");
    }
    else{
    let idSprint = sprintProvider.getNextId();
    var sprint = new Sprint(idSprint,name);
    sprintProvider.insertSprint(sprint);
    //currentProject.addSprint(idSprint);
    var sprintsOfProject = currentProject.sprints;
    sprintsOfProject.push(idSprint);
    currentProject.sprints = sprintsOfProject;
    projectProvider.updateProject(currentProject);
    refresh();
    }
}
var statusAllBtn = document.getElementById("statusAll");
statusAllBtn.onclick=function()
{
    var table=document.getElementById("IssueTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    addRowsToIssuesTable(0)
}
var statusNewBtn = document.getElementById("statusNew");
statusNewBtn.onclick=function()
{
    var table=document.getElementById("IssueTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    var status = statusProvider.findStatusByType("New");
    console.log(status);
    addRowsToIssuesTable(status.id)
}
var statusInProgressBtn = document.getElementById("statusInProgress");
statusInProgressBtn.onclick=function()
{
    var table=document.getElementById("IssueTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    var status = statusProvider.findStatusByType("In progress");
    console.log(status);
    addRowsToIssuesTable(status.id)
}
var statusfeedbackBtn = document.getElementById("statusFeedback");
statusfeedbackBtn.onclick=function()
{
    var table=document.getElementById("IssueTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    var status = statusProvider.findStatusByType("Feedback");
    console.log(status);
    addRowsToIssuesTable(status.id)
}
var statusReworkBtn = document.getElementById("statusRework");
statusReworkBtn.onclick=function()
{
    var table=document.getElementById("IssueTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    var status = statusProvider.findStatusByType("Rework");
    console.log(status);
    addRowsToIssuesTable(status.id)
}
var statusResolvedBtn = document.getElementById("statusResolved");
statusResolvedBtn.onclick=function()
{
    var table=document.getElementById("IssueTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    var status = statusProvider.findStatusByType("Resolved");
    console.log(status);
    addRowsToIssuesTable(status.id)
}
var readyForTestingBtn = document.getElementById("statusReadyForTesting");
readyForTestingBtn.onclick=function()
{
    var table=document.getElementById("IssueTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    var status = statusProvider.findStatusByType("Ready for Testing");
    console.log(status);
    addRowsToIssuesTable(status.id)
}
function addRows()
{
    if(currentProject.sprints!=null){
    var sprints = sprintProvider.getSprintsOfProject(currentProject.sprints);
    var tabBody=document.getElementById("ProjectTable");
    sprints.forEach(sprint => {
        var features = issueProvider.getAllIssueBySprintAndType(sprint.id,"Feature");
        var bugs = issueProvider.getAllIssueBySprintAndType(sprint.id,"Bug");
        var tasks = issueProvider.getAllIssueBySprintAndType(sprint.id,"Task");
        var row=document.createElement("tr");
        var cell1 = document.createElement("th");
        var cell2 = document.createElement("th");
        var cell3 = document.createElement("th");
        var cell4 = document.createElement("th");
        var cell5 = document.createElement("th");
        var cell6 = document.createElement("th");
        var textnode1=document.createTextNode(sprint.id);
        var textnode2=document.createTextNode(sprint.name);
        var textnode3=document.createTextNode(features.length);
        var textnode4=document.createTextNode(bugs.length);
        var textnode5=document.createTextNode(tasks.length);
        var selectButton=document.createElement("button");
        var buttonTitle = document.createTextNode("Select Sprint");  
        selectButton.appendChild(buttonTitle);
        selectButton.addEventListener ("click", function() {
            localStorage.setItem("currentSprint",JSON.stringify(sprint));
            window.location.replace("http://127.0.0.1:8080//UI/SprintComponent/SprintPage.html");
          });
        cell1.appendChild(textnode1);
        cell2.appendChild(textnode2);
        cell3.appendChild(textnode3);
        cell4.appendChild(textnode4);
        cell5.appendChild(textnode5);
        cell6.appendChild(selectButton);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        tabBody.appendChild(row);
    });
    }
}
function addRowsToIssuesTable(statusId)
{
    var issues = issueProvider.getAllIssueOfStatus(statusId);
    console.log(issues);
    if(issues!=null){
    var tabBody=document.getElementById("IssueTable");
    issues.forEach(issue => {
        var row=document.createElement("tr");
        var cell1 = document.createElement("th");
        var cell2 = document.createElement("th");
        var cell3 = document.createElement("th");
        var cell4 = document.createElement("th");
        var cell5 = document.createElement("th");
        var cell6 = document.createElement("th");
        var cell7 = document.createElement("th");
        var cell8 = document.createElement("th");
        var cell9 = document.createElement("th");
        var textnode1=document.createTextNode(issue.id);
        var textnode2=document.createTextNode(issue.type);
        var textnode3=document.createTextNode(issue.name);
        var userId = issue.createdBy;
        var user = userProvider.findUserById(userId)
        var textnode4=document.createTextNode(user.name);
        var assigneeId = issue.assignee;
        var assignee = userProvider.findUserById(assigneeId)
        var textnode5 = document.createTextNode(assignee.name);
        var textnode6 = document.createTextNode(issue.description);
        var status = statusProvider.findStatusById(issue.status);
        var textnode7 = document.createTextNode(status.type);
        var textnode8=document.createTextNode(issue.createdAt);
        var textnode9=document.createTextNode(issue.updatedAt);
        cell1.appendChild(textnode1);
        cell2.appendChild(textnode2);
        cell3.appendChild(textnode3);
        cell4.appendChild(textnode4);
        cell5.appendChild(textnode5);
        cell6.appendChild(textnode6);
        cell7.appendChild(textnode7);
        cell8.appendChild(textnode8);
        cell9.appendChild(textnode9);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);
        row.appendChild(cell9);
        tabBody.appendChild(row);
    });
    }
}