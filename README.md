# project2

## Project Choice (Tell us which project you're doing!)
> A name for your Project  
Crochet Project Manager
## Project Description
> Include: <br />
> General App Idea/Purpose<br />
This site will give provide a space to privately store and manage information about their crochet projects. A similar large site exists, but does not allow the user to post projects privately. This app will be more for personal management of projects than for community sharing. <br />
> Models including field names and their datatypes<br />
Project Schema
Name: String, required
Image: file upload, not required(placeholder dummy image used if no file is uploaded)
Description: String, not required
Colors: array of strings(for a potential filtering feature)
Yarn Brand/type: Array of strings 
Pattern Credit: String
Complete: String
Timestamp: Date



> A list of routes (e.g. `POST /pins/ allows users to post a picture of a pin`)<br />
Routes may be prefixed with /username if user functionality is added.
Index--/gallery--GET--Will show a gallery of project names/images and a create new button
New--/gallery/new--GET--Will display a form for creating a new project, containing fields for all the information from the project schema
Delete--/gallery/:id--DELETE--Will permanently remove the projects data from the database/gallery, redirect to gallery
Update--/gallery/:id--PUT--Will update the data of a particular project upon completion of the edit form, redirect to show page
Create--/gallery--POST--Will post the results of the new form as a new item in the gallery, redirect to gallery.
Edit--/gallery/:id/edit--GET--Will display the form for editing the information about the project.
Show--/gallery/:id--GET--Will display a larger version of the image, the rest of the project information, delete and edit buttons


## Wireframes
> Wireframes with basic page layouts<br />
> Copy and paste or drag and drop your images here.
Note: I will make the actual app look better than this. I am struggling with the wireframe apps.
Login
![image](https://media.git.generalassemb.ly/user/46786/files/70d0936d-a6f7-4b33-b415-9620b9f1c709)
Index
![image](https://media.git.generalassemb.ly/user/46786/files/c1839cfa-0e87-4077-b08f-1d18efd66ae6)
Show
![image](https://media.git.generalassemb.ly/user/46786/files/c33aad28-e961-43a3-afd9-cf164785ca35)
New
![image](https://media.git.generalassemb.ly/user/46786/files/4f1d3b13-79c2-405e-b419-c0a5fa41110b)
Edit
![image](https://media.git.generalassemb.ly/user/46786/files/c608cf16-e26f-446d-a0f4-43cb393076ff)




## User Stories
> User stories detailing app functionality<br />
> Add user stories following the _As a [type of user], I want [what the user wants], so that [what it helps accomplish]_ format.

### MVP Goals

-As a user, I want my projects to be added to the site when I fill out the form on the new page.
-As a user, I want to add projects without image uploads required, so that I can quickly add a new project/placeholder as needed.
-As a user, I want to view all of my projects on the gallery page, so that I can easily access them.
-As a user, I want to view details about my project after clicking on its image on the gallery.
-As a user, I want to see a timestamp of when I created my project on the show page, so that I can reference it in the future.
-As a user, I want to delete my project when I click on the delete button with a confirmation message so that I don't accidentally delete something I didn't want to.
-As a user, I want to be redirected to the show page after filling out the edit form, so that I can see the information that I just edited.



### Stretch Goals
-As a user, I can reorder the view of the projects with the sort button.
-As a user, I can filter projects by color, etc.
-As a user, I have a secure login and must login to view my projects