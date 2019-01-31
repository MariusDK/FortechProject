import User from '/DataModel/User.js';
import Sprint from '/DataModel/Sprint.js';
import Issues from '/DataModel/Issue.js';
import Status from '/DataModel/Status.js';
import SprintProvider from '/Provider/SprintProvider.js';
import UserProvider from '/Provider/UserProvider.js';
import IssuesProvider from '/Provider/IssueProvider.js';
import StatusProvider from '/Provider/StatusProvider.js';
var issuesProvider = new IssuesProvider();
var sprintProvider = new SprintProvider();
var userProvider = new UserProvider();
var statusProvider = new StatusProvider();
var userName = localStorage.getItem("curentUserName");
//var user = userProvider.getUserByName(userName);
var sprint = JSON.parse(localStorage.getItem("currentSprint"));

window.onload = function(){
    addRowsToFeatureTable();
    addRowsToBugTable();
    addRowsToTaskTable()
}


var createIssueBtn = document.getElementById("createIssueBtn");
createIssueBtn.onclick=function()
{
    localStorage.setItem("issueCategory","issue");
    window.location.replace("http://127.0.0.1:8080//UI/IssueComponent/CreateIssueComponent/CreateIssue.html");
}
function addRowsToFeatureTable()
{
    var features = issuesProvider.getAllIssueBySprintAndType(sprint.id,"Feature");
    if(features!=null){
    var tabBody=document.getElementById("featureTable");
    features.forEach(feature => {
        var subtasks = issuesProvider.getAllSubtasksOfIssue(feature);
        if (subtasks.length!=0){
        var readyForTestingNumber = 0;
        subtasks.forEach(subtask => {
            var status = statusProvider.findStatusById(subtask.status);
            if (status.type == "Ready for Testing")
            {
                readyForTestingNumber++;
            }
        });
        if (readyForTestingNumber==subtasks.length)
        {
            var status = statusProvider.findStatusByType("Ready for Testing");
            feature.status = status.id;
            issuesProvider.updateIssue(feature);
        }
        // else{
        //     var status = statusProvider.findStatusByType("In progress");
        //     console.log(status);
        //     feature.status = status.id;
        //     issuesProvider.updateIssue(feature);
        // }   
        }     
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
        var cell10 = document.createElement("th");
        var cell11 = document.createElement("th");
        var textnode1=document.createTextNode(feature.id);
        var textnode2=document.createTextNode(feature.type);
        var textnode3=document.createTextNode(feature.name);
        var userId = feature.createdBy;
        var user = userProvider.findUserById(userId)
        var textnode4=document.createTextNode(user.name);
        var assigneeId = feature.assignee;
        var assignee = userProvider.findUserById(assigneeId)
        var textnode5=document.createTextNode(assignee.name);
        var textnode6=document.createTextNode(feature.description);
        var status = statusProvider.findStatusById(feature.status);
        var textnode7=document.createTextNode(status.type);
        var textnode8=document.createTextNode(feature.createdAt);
        var textnode9=document.createTextNode(feature.updatedAt);
        var selectButton=document.createElement("button");
        var buttonTitle = document.createTextNode("Select");  
        selectButton.appendChild(buttonTitle);
        selectButton.addEventListener ("click", function() {
            localStorage.setItem("currentIssue",JSON.stringify(feature));
            window.location.replace("http://127.0.0.1:8080//UI/IssueComponent/IssuePage/IssuePage.html");
          });
        var updateButton=document.createElement("button");
        var buttonTitle = document.createTextNode("Update");  
        updateButton.appendChild(buttonTitle);
        updateButton.addEventListener ("click", function() {
            localStorage.setItem("issueCategory","feature");
            localStorage.setItem("currentIssue",JSON.stringify(feature));
            window.location.replace("http://127.0.0.1:8080//UI/IssueComponent/UpdateIssueComponent/UpdateIssue.html");
          });
        cell1.appendChild(textnode1);
        cell2.appendChild(textnode2);
        cell3.appendChild(textnode3);
        cell4.appendChild(textnode4);
        cell5.appendChild(textnode5);
        cell6.appendChild(textnode6);
        cell7.appendChild(textnode7);
        cell8.appendChild(textnode8);
        cell9.appendChild(textnode9);
        cell10.appendChild(selectButton);
        cell11.appendChild(updateButton);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);
        row.appendChild(cell9);
        row.appendChild(cell10);
        row.appendChild(cell11);
        tabBody.appendChild(row);
    });
    }
}
function addRowsToBugTable()
{
    var bugs = issuesProvider.getAllIssueBySprintAndType(sprint.id,"Bug");
    if(bugs!=null){
    var tabBody=document.getElementById("bugTable");
    bugs.forEach(bug => {
        var subtasks = issuesProvider.getAllSubtasksOfIssue(bug);
        if (subtasks.length!=0){
            var readyForTestingNumber = 0;
            subtasks.forEach(subtask => {
                var status = statusProvider.findStatusById(subtask.status);
                if (status.type == "Ready for Testing")
                {
                    readyForTestingNumber++;
                }
            });
            if (readyForTestingNumber==subtasks.length)
            {
                var status = statusProvider.findStatusByType("Ready for Testing");
                bug.status = status.id;
                issuesProvider.updateIssue(bug);
            }   
            }     
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
        var cell10 = document.createElement("th");
        var cell11 = document.createElement("th");
        var textnode1=document.createTextNode(bug.id);
        var textnode2=document.createTextNode(bug.type);
        var textnode3=document.createTextNode(bug.name);
        var userId = bug.createdBy;
        var user = userProvider.findUserById(userId)
        var textnode4=document.createTextNode(user.name);
        var assigneeId = bug.assignee;
        var assignee = userProvider.findUserById(assigneeId);
        var textnode5=document.createTextNode(assignee.name);
        var textnode6=document.createTextNode(bug.description);
        var status = statusProvider.findStatusById(bug.status);
        var textnode7=document.createTextNode(status.type);
        var textnode8=document.createTextNode(bug.createdAt);
        var textnode9=document.createTextNode(bug.updatedAt);
        var selectButton=document.createElement("button");
        var buttonTitle = document.createTextNode("Select");  
        selectButton.appendChild(buttonTitle);
        selectButton.addEventListener ("click", function() {
            localStorage.setItem("currentIssue",JSON.stringify(bug));
            window.location.replace("http://127.0.0.1:8080//UI/IssueComponent/IssuePage/IssuePage.html");
          });
        var updateButton=document.createElement("button");
        var buttonTitle = document.createTextNode("Update");  
        updateButton.appendChild(buttonTitle);
        updateButton.addEventListener ("click", function() {
            localStorage.setItem("issueCategory","bug");
            localStorage.setItem("currentIssue",JSON.stringify(bug));
            window.location.replace("http://127.0.0.1:8080//UI/IssueComponent/UpdateIssueComponent/UpdateIssue.html");
          });
        cell1.appendChild(textnode1);
        cell2.appendChild(textnode2);
        cell3.appendChild(textnode3);
        cell4.appendChild(textnode4);
        cell5.appendChild(textnode5);
        cell6.appendChild(textnode6);
        cell7.appendChild(textnode7);
        cell8.appendChild(textnode8);
        cell9.appendChild(textnode9);
        cell10.appendChild(selectButton);
        cell11.appendChild(updateButton);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);
        row.appendChild(cell9);
        row.appendChild(cell10);
        row.appendChild(cell11);
        tabBody.appendChild(row);
    });
    }
}
function addRowsToTaskTable()
{
    var tasks = issuesProvider.getAllIssueBySprintAndType(sprint.id,"Task");
    if(tasks!=null){
    var tabBody=document.getElementById("taskTable");
    tasks.forEach(task => {
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
        var cell10 = document.createElement("th");
        var cell11 = document.createElement("th");
        var textnode1=document.createTextNode(task.id);
        var textnode2=document.createTextNode(task.type);
        var textnode3=document.createTextNode(task.name);
        var userId = task.createdBy;
        var user = userProvider.findUserById(userId)
        var textnode4=document.createTextNode(user.name);
        var assigneeId = task.assignee;
        var assignee = userProvider.findUserById(assigneeId);
        var textnode5=document.createTextNode(assignee.name);
        var textnode6=document.createTextNode(task.description);
        var status = statusProvider.findStatusById(task.status);
        var textnode7=document.createTextNode(status.type);
        var textnode8=document.createTextNode(task.createdAt);
        var textnode9=document.createTextNode(task.updatedAt);
        var selectButton=document.createElement("button");
        var buttonTitle = document.createTextNode("Select");  
        selectButton.appendChild(buttonTitle);
        selectButton.addEventListener ("click", function() {
            localStorage.setItem("currentIssue",JSON.stringify(task));
            window.location.replace("http://127.0.0.1:8080//UI/IssueComponent/IssuePage/IssuePage.html");
          });
        var updateButton=document.createElement("button");
        var buttonTitle = document.createTextNode("Update");  
        updateButton.appendChild(buttonTitle);
        updateButton.addEventListener ("click", function() {
            localStorage.setItem("issueCategory","subtask");
            localStorage.setItem("currentIssue",JSON.stringify(task));
            window.location.replace("http://127.0.0.1:8080//UI/IssueComponent/UpdateIssueComponent/UpdateIssue.html");
          });
        cell1.appendChild(textnode1);
        cell2.appendChild(textnode2);
        cell3.appendChild(textnode3);
        cell4.appendChild(textnode4);
        cell5.appendChild(textnode5);
        cell6.appendChild(textnode6);
        cell7.appendChild(textnode7);
        cell8.appendChild(textnode8);
        cell9.appendChild(textnode9);
        cell10.appendChild(selectButton);
        cell11.appendChild(updateButton);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);
        row.appendChild(cell9);
        row.appendChild(cell10);
        row.appendChild(cell11);
        tabBody.appendChild(row);
    });
    }
}