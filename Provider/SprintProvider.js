
export default class SprintProvider{
    constructor()
    {
        var sprints = [];        
        var test = localStorage.getItem("sprints");
        if ((test=="undefined")||(test == null))
        {
            localStorage.setItem("sprints",JSON.stringify(sprints));
        }
        else{
            sprints = JSON.parse(localStorage.getItem("sprints"));
        }
    }
    insertSprint(sprint)
    {
        var sprints = [];
        sprints = JSON.parse(localStorage.getItem("sprints"));
        sprints.push(sprint);
        localStorage.setItem("sprints",JSON.stringify(sprints));
    }
    findSprintById(id)
    {
        var sprints = [];
        sprints = JSON.parse(localStorage.getItem("sprints"));
        sprints.forEach(sprint => {
            if (sprint.id == id)
            {
                return sprint;
            }
        });
        return null;
    }
    findSprintByName(name)
    {
        var sprints = [];
        sprints = JSON.parse(localStorage.getItem("sprints"));
        sprints.forEach(sprint => {
            if (sprint.name == name)
            {
                return sprint;
            }
        });
        return null;
    }
    getAllSprints()
    {
        var sprints=[];
        sprints = JSON.parse(localStorage.getItem("sprints"));
        return sprints;
    }
    getSprintsOfProject(sprintsIds)
    {
        var sprints = this.getAllSprints();
        var projectSprints = [];
        sprints.forEach(sprint => {
            sprintsIds.forEach(sprintId => {
                if (sprint.id == sprintId)
                {
                    projectSprints.push(sprint);
                }                
            });            
        });
        return projectSprints;
    }
    getNextId()
    {
        var sprints = this.getAllSprints();
        var maxId = 0;
        sprints.forEach(sprint =>{
            if (maxId<sprint.id)
            {
                maxId = sprint.id;
            }
        });
        maxId = maxId+1;
        return maxId;
    }
    




}