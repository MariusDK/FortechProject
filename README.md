
 In constuirea aplicatiei s-a folosit Microsoft Visual Code
- aplicatia este pornita folosind live-server, prin comanda live-server;
- prima pagina este StartPage.html: poza StartPage.jpg
	- Aici se alege utilizatorul curent si proiectul curent: Pentru utilizare am introdus 4 utilizatori si 1 proiect;
	- Dupa selectare se apasa butonul Select care ne va duce la urmatoarea pagina;
- Dupa ce am selectat utlilizatorul si proiectul trecem la pagina ProjectPage: poza ProjectPage1.jpg, ProjectPage2.jpg
	- In partea de sus avem sprint-urile care pot vi gestionate selectandule;
	- In urmatoarea parte avem crearea de sprinturi;
	- Apoi avem lista cu toate Issues, aceasta lista poate fi filtrata folosind butoanele de sub ea pe baza de status: 
All inseamna ca vor aparea toate Issues indeferent de status;
- Dupa ce am selectat un sprint ajungem la pagina lui, adica SprintPage.html. Poza: SprintPage.jpg;
	- Sus avem butonul(linkul) de back ce ne duce inapoi la pagina ProjectPage.html;
	- In partea de sus a paginii avem lista de feature ce apartin sprint-ului selectat. 
	- In partea de mijloc a paginii avem lista de buguri ce apartin sprint-ului selectat.
	- In partea de jos a paginii avem lista de taskuri ce apartin sprint-ului selectat.
	- Fiecare dintre cele doua categorii de issues are in capat butoanele Select si Update:
		- Selectul este pentru a ajunge la pagina Issue respectiv.
		- Update-ul este pentru a ajunge la pagina unde se actualizeaza Issue.
	- Jos este un button Create Issue care ne duce la pagina de creare Issue.
- Daca apasam pe butonul Create Issue ajungem la pagina CreateIssue.html. Poza: CreateIssue.jpg
	- In aceasta pagina avem butonul back care prin apasare ne duce inapoi la pagina SprintPage.html.
	- Un form in care sunt completate datele issue-ului dorit, prin apasarea pe save se salveaza Issue.
	- Campurile Input nu pot ramane goale, avem validare pentru acest caz.
- Daca apasam in dreptul unui Issue pe butonul Select ajungem la pagina dedicata acestui Issue: IssuePage.html poze:IssuePage1.jpg, IssuePage2.jpg.
	- In partea sus avem linkul de back (la pagina SprintPage.html), lista de subtaskuri si butonul de creare Create Subtask (ne duce la pagina de creare task, 
la fel ca la creare task normal doar ca exista cateva limitari).
	- In partea de jos avem jos avem lista de Comments a Issue si un form de creat Comments, salvad prin butonul Save.
	- Dupa crearea unui subtask pentru a vedea daca este atribuit corect Issue parinte, trebuie selectat din nou Issue parinte di SprintPage.html.
- Daca apasam in dreptul unui Issue pe butonul Upade ajungem la pagina de Update: UpdateIssue.html poza: UpdateIssue.jpg
	- Am scris sus numle sprintului, doarece daca se alge alt sprint, Issue selectat si toate taskurile sale vor fi mutate in Sprintul slectat.
	- Folosind butonul Update se actualizeaza Issue-ul cu informatile dorite.

Am facut si testat toate functionalitatile cerute:
A user needs to be able to create any kind of issue with some initial values. All newly created issues will have the status New.

The user needs to see an overview of the current project, broken down per sprints, how many issues in each status, how many features, how many bugs, etc.

Apart for the fields mentioned above, the user can change any field of an issue through an UPDATE action.

If the user moves the bug or feature in a different sprint, the subtasks will have to be moved as well.

Completing all the tasks of a bug or feature will change the status of that issue to Ready For Testing.

As soon as a task changes its status from New to any other, it's corresponding issue will change it's status as well to it's parent status.

A user can create sprints to which the issues will be assigned.

A user can filter the issues by sprint or status.

!Aceasta este prima aplicatie scrisa doar in JavaScript, am mai lucrat cu React si NodeJs.
Daca ceva nu merge, verificati versiunea dinaintea adaugarii css-ului.
