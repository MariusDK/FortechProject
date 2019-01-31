export default class CommentProvider{
    constructor()
    {
        var comments = [];
        var test = localStorage.getItem("comments");
        if ((test=="undefined")||(test == null))
        {
            localStorage.setItem("comments",JSON.stringify(comments));
        }
        else{
            comments = JSON.parse(localStorage.getItem("comments"));
        }
    }
    insertComment(comment)
    {
        var comments = [];
        comments = JSON.parse(localStorage.getItem("comments"));
        comments.push(comment);
        localStorage.setItem("comments",JSON.stringify(comments));
    }
    findCommentById(id)
    {
       var comments = [];
       comments = JSON.parse(localStorage.getItem("comments"));
       comments.forEach(comment => {
           if (comment.id == id)
           {
               return comment;
           }
       });
       return null;
    }
    generateNextId()
    {
        var comments = JSON.parse(localStorage.getItem("comments"));
        var maxId = 0;
        comments.forEach(element =>{
            if (maxId<element.id)
            {
                maxId = maxId+1;
            }
        });
        maxId = maxId+1;
        return maxId;
    }
    getAllCommentsOfIssue(mainIssue)
    {
        var issueComments= [];
        var comments = JSON.parse(localStorage.getItem("comments"));
        var commentsIds = mainIssue.comments;
        commentsIds.forEach(commentId=>{
            comments.forEach(element =>{
                if (commentId==element.id)
                {
                    issueComments.push(element);
                }
            });
        })
        return issueComments;
    }
}