import User from '/DataModel/User.js';
import Sprint from '/DataModel/Sprint.js';
import Issues from '/DataModel/Issue.js';
import Status from '/DataModel/Status.js';
import Comment from '/DataModel/Comment.js';
import SprintProvider from '/Provider/SprintProvider.js';
import UserProvider from '/Provider/UserProvider.js';
import IssuesProvider from '/Provider/IssueProvider.js';
import StatusProvider from '/Provider/StatusProvider.js';
import CommentProvider from '/Provider/CommentProvider.js';

var issuesProvider = new IssuesProvider();
var sprintProvider = new SprintProvider();
var userProvider = new UserProvider();
var statusProvider = new StatusProvider();
var commentProvider = new CommentProvider();
var userName = localStorage.getItem("curentUserName");
//var user = userProvider.getUserByName(userName);
var sprint = JSON.parse(localStorage.getItem("currentSprint"));
var mainIssue = JSON.parse(localStorage.getItem("currentIssue"));
window.onload = function(){
    addRowsToSubtaskTable();
    addRowsToCommentTable();
}
function refresh()
{
    var table=document.getElementById("commentsTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    addRowsToCommentTable();
}
var createSubtaskBtn = document.getElementById("createSubtaskBtn");
createSubtaskBtn.onclick=function()
{
    localStorage.setItem("issueCategory","subtask");
    window.location.replace("http://127.0.0.1:8080//UI/IssueComponent/CreateIssueComponent/CreateIssue.html");
}
var createCommentBtn = document.getElementById("createCommentBtn");
createCommentBtn.onclick=function()
{
    var name = document.getElementsByName("commentName")[0].value;
    if (name=="")
    {
        alert("Name input is empty!");
    }
    else{
    let idComment = commentProvider.generateNextId();
    var comment = new Comment(idComment,name);
    commentProvider.insertComment(comment);
    //currentProject.addSprint(idSprint);
    var comments = mainIssue.comments;
    comments.push(comment.id);
    mainIssue.comments = comments;
    issuesProvider.updateIssue(mainIssue);
    localStorage.setItem("currentIssue",JSON.stringify(mainIssue));
    refresh();
    }
}
function addRowsToSubtaskTable()
{
    var subtasks = issuesProvider.getAllSubtasksOfIssue(mainIssue);
    if(subtasks!=null){
    var tabBody=document.getElementById("subtaskTable");
    subtasks.forEach(subtask => {
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
        var textnode1=document.createTextNode(subtask.id);
        var textnode2=document.createTextNode(subtask.type);
        var textnode3=document.createTextNode(subtask.name);
        var userId = subtask.createdBy;
        var user = userProvider.findUserById(userId)
        var textnode4=document.createTextNode(user.name);
        var assigneeId = subtask.assignee;
        var assignee = userProvider.findUserById(assigneeId)
        var textnode5=document.createTextNode(assignee.name);
        var textnode6=document.createTextNode(subtask.description);
        var status = statusProvider.findStatusById(subtask.status);
        var textnode7=document.createTextNode(status.type);
        var textnode8=document.createTextNode(subtask.createdAt);
        var textnode9=document.createTextNode(subtask.updatedAt);
        var selectButton=document.createElement("button");
        var buttonTitle = document.createTextNode("Select");  
        selectButton.appendChild(buttonTitle);
        selectButton.addEventListener ("click", function() {
            //localStorage.setItem("currentIssue",JSON.stringify(subtask));
            //window.location.replace("http://127.0.0.1:8080//UI/IssueComponent/IssuePage/IssuePage.html");
          });
        var updateButton=document.createElement("button");
        var buttonTitle = document.createTextNode("Update");  
        updateButton.appendChild(buttonTitle);
        updateButton.addEventListener ("click", function() {
            localStorage.setItem("issueCategory","subtask");
            localStorage.setItem("currentIssue",JSON.stringify(subtask));
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
function addRowsToCommentTable()
{
    var comments = commentProvider.getAllCommentsOfIssue(mainIssue);
    if(comments!=null){
    var tabBody=document.getElementById("commentsTable");
    comments.forEach(comment => {
        var row = document.createElement("tr");
        var cell1 = document.createElement("th");
        var cell2 = document.createElement("th");
        var textnode1=document.createTextNode(comment.id);
        var textnode2=document.createTextNode(comment.name);
        cell1.appendChild(textnode1);
        cell2.appendChild(textnode2);
        row.appendChild(cell1);
        row.appendChild(cell2);
        tabBody.appendChild(row);
    });
    }
}