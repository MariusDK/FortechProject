import Status from "../DataModel/Status.js"
export default class StatusProvider{
    constructor()
    {
        var statusList = [];
        var test = JSON.parse(localStorage.getItem("statusList"));
        if ((test=="undefined")||(test == null)||(test.length==0))
        {
            var status1 = new Status(1,"New");
            var status2 = new Status(2,"In progress");
            var status3 = new Status(3,"Feedback");
            var status4 = new Status(4,"Rework");
            var status5 = new Status(5,"Resolved");
            var status6 = new Status(6,"Ready for Testing");
            statusList.push(status1);
            statusList.push(status2);
            statusList.push(status3);
            statusList.push(status4);
            statusList.push(status5);
            statusList.push(status6);
            localStorage.setItem("statusList",JSON.stringify(statusList));
        }
        else{
            statusList = JSON.parse(localStorage.getItem("statusList"));
        }
    }
    insertStatus(status){
        var statusList = [];
        statusList = JSON.parse(localStorage.getItem("statusList"));
        statusList.push(status);
        localStorage.setItem("statusList",JSON.stringify(statusList));
    }
    insertAllStatus(statusList)
    {
        localStorage.setItem("statusList",JSON.stringify(statusList));
    }
    findStatusById(id)
    {
        var searchStatus = null;
        var statusList = [];
        statusList = JSON.parse(localStorage.getItem("statusList"));
        console.log(statusList);
        statusList.forEach(status => {
            if (status.id == id)
            {
                searchStatus = status;
            }
        });
        return searchStatus;
    }
    findStatusByType(type)
    {
       var searchStatus = null;
       var statusList = [];
       statusList = JSON.parse(localStorage.getItem("statusList"));
       console.log(statusList);
       statusList.forEach(status => {
           if (status.type == type)
           {
               searchStatus = status;
           }
       });
       return searchStatus;
    }
    getStatusList()
    {
        var statusList = JSON.parse(localStorage.getItem("statusList"));
        return statusList;
    }
}