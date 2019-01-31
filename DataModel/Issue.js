export default class Issue
{
    constructor(id,type,name,sprintId, createdBy, assignee,description,status,tasks,comments,updateAt,createdAt)    
    {
        this.id = id;
        this.type = type;
        this.name = name;
        this.sprint = sprintId;
        this.createdBy = createdBy;
        this.assignee = assignee;
        this.description = description;
        this.status = status;
        this.tasks = tasks;
        this.comments = comments;
        this.updatedAt = updateAt;
        this.createdAt = createdAt;
    }
}
//module.exports = Issue;