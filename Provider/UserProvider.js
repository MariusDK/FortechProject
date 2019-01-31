
export default class UserProvider{
  constructor()
  {
    var users = [];
    var test = localStorage.getItem("users");;
    if ((test=="undefined")||(test == null))
      {
        localStorage.setItem("users",JSON.stringify(users));
      }
      else
      {
          users = JSON.parse(localStorage.getItem("users"));
      }
  }
insertUser(user){
  var users = [];
  users = JSON.parse(localStorage.getItem("users"));
  users.push(user);
  localStorage.setItem("users",JSON.stringify(users));
}
findUserById(id)
{
  var user = null;
  var users = [];
  users = JSON.parse(localStorage.getItem("users"));
  users.forEach(element => {
    if (element.id == id)
    { 
      user = element;
    }
  });  
  return user; 
}
findUserByName(name)
{
  var searchUser = null;
  var users = [];
  users = JSON.parse(localStorage.getItem("users"));
  users.forEach(user => {
    if (user.name == name)
    { 
      searchUser = user;
    }
  });
  return searchUser; 
}
getAllUsers()
{
    var users=[];
    users = JSON.parse(localStorage.getItem("users"));
    return users;
}
generateNextId()
    {
        var users = JSON.parse(localStorage.getItem("users"));
        var maxId = 0;
        users.forEach(element => {
            if (maxId<element.id)
            {
                maxId = element.id;
            }
        });
        maxId = maxId+1;
        return maxId;
    }
}
