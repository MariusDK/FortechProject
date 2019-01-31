export default class Project
{
    constructor(id)
    {
        this.id = id; 
        this.sprints = [];
    }
    addSprint(sprintId)
    {
        this.sprints.push(sprintId);
    }
    getSprints()
    {
        return this.sprints;
    }
}
//module.exports = Project;