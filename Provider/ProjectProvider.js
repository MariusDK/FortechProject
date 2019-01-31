import Project from '/DataModel/Project.js';
export default class ProjectProvider{
    constructor()
    {
        var projects = JSON.parse(localStorage.getItem("projects"));
        if (projects == null)
        {
            projects = [];
            localStorage.setItem("projects",JSON.stringify(projects));
        }
    }
    insertProject(project)
    {
        var projects = [];
        projects = JSON.parse(localStorage.getItem("projects"));
        projects.push(project);
        localStorage.setItem("projects",JSON.stringify(projects));
    }
    findProjectById(_id)
    {
        var projects=[];
        projects = JSON.parse(localStorage.getItem("projects"));
        projects.forEach(project => {
            if (project._id == _id)
            {
                return project;
            }
            else
            {
                return null;
            }
        });
    }
    getAllProjects()
    {
        var projects=[];
        projects = JSON.parse(localStorage.getItem("projects"));
        return projects;
    }
    getProjectById(id)
    {
        var selectedProject = new Project();
        var projects = this.getAllProjects();
        projects.forEach(project => {
            if (project.id == id)
            {
                selectedProject = project;
            }
        });
        return selectedProject;
    }
    updateProject(project)
    {
        var projects = this.getAllProjects();
        var newProjectList = [];
        projects.forEach(element => {
            if (element.id !== project.id)
            {
                newProjectList.push(element);
            }
        });
        newProjectList.push(project);
        localStorage.setItem("projects",JSON.stringify(newProjectList));
    }
    generateNextId()
    {
        var projects = JSON.parse(localStorage.getItem("projects"));
        var maxId = 0;
        projects.forEach(element => {
            if (maxId<element.id)
            {
                maxId = element.id;
            }
        });
        maxId = maxId+1;
        return maxId;
    }
}