export default class IssueProvider{
    constructor()
    {
       var issues = [];
       var test = localStorage.getItem("issues");
       if ((test=="undefined")||(test == null))
       {
           localStorage.setItem("issues",JSON.stringify(issues));
       }
       else{
           issues = JSON.parse(localStorage.getItem("issues"));
       }
    }
    insertIssue(issue){
        var issues = [];
        issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues",JSON.stringify(issues));
    }
    findIssueById(id)
    {
        var issues = [];
        issues = JSON.parse(localStorage.getItem("issues"));
        issues.forEach(issue => {
            if (issue.id == id)
            {
                return issue;
            }
        });
        return null;
    }
    findIssueByName(name)
    {
        var issues = [];
        issues = JSON.parse(localStorage.getItem("issues"));
        issues.forEach(issue => {
            if (issue.name == name)
            {
                return issue;
            }
        });
        return null;
    }
    getAllIssueOfSprint(idSprint)
    {
        var issuesOfSprint = [];
        var issues = [];
        issues = JSON.parse(localStorage.getItem("issues"));
        issues.forEach(issue => {
            if (issue.sprint==idSprint)
            {
                issuesOfSprint.push(issue);
            }
        });
        return issuesOfSprint;
    }
    getAllIssueBySprintAndType(idSprint,type)
    {
        var issues = [];
        var issuesOfSprint = this.getAllIssueOfSprint(idSprint);
        issuesOfSprint.forEach(issue => {
            if (issue.type==type)
            {
                issues.push(issue);
            }
        });
        return issues;
    }
    getAllIssueOfStatus(idStatus)
    {

        var issuesOfStatus = [];
        var issues =  JSON.parse(localStorage.getItem("issues"));
        if (idStatus==0)
        {
            issuesOfStatus = issues;
        }
        else{
        issues.forEach(issue => {
            if (issue.status==idStatus)
            {
                issuesOfStatus.push(issue);
            }
            });
        }
        return issuesOfStatus;
    }
    getAllFeatures()
    {
        var type = "feature";
        var feature = [];
        var issues = [];
        issues = JSON.parse(localStorage.getItem("issues"));
        issues.forEach(issue => {
            if (issue.type==type)
            {
                feature.push(issue);
            }
        });
        return feature;     
    }
    getAllBugs()
    {
        var type = "bugs";
        var bugs = [];
        var issues = [];
        issues = JSON.parse(localStorage.getItem("issues"));
        issues.forEach(issue => {
            if (issue.type==type)
            {
                bugs.push(issue);
            }
        });
        return bugs; 
    }
    updateIssue(issue)
    {
        var updateIssues = [];
        var issues = JSON.parse(localStorage.getItem("issues"));
        console.log(issues);
        issues.forEach(element => {
            console.log(issue.id)
            console.log(element.id);
            if ((element.id!==issue.id))
            {
                updateIssues.push(element);
            }
        });
        updateIssues.push(issue);
        console.log(updateIssues);
        localStorage.setItem("issues",JSON.stringify(updateIssues));
    }
    generateNextId()
    {
        var issues = JSON.parse(localStorage.getItem("issues"));
        var maxId = 0;
        issues.forEach(element => {
            if (maxId<element.id)
            {
                maxId = element.id;
            }
        });
        maxId = maxId+1;
        return maxId;
    }
    getAllSubtasksOfIssue(issue)
    {
        var subtasksIds = issue.tasks;
        var issues = JSON.parse(localStorage.getItem("issues"));
        var subtasks = [];
        subtasksIds.forEach(subtaskId => {
            issues.forEach(issue => {
                if (issue.id == subtaskId)
                {
                    subtasks.push(issue);
                }
            });
        });
        return subtasks;
    }
}