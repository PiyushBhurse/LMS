:Library Management System:
============================

Requirements:

1. Able to login to system as a member or Librarian 

2. Any library member should be able to search books by their title, author as well by the subject category.

3. Each book will have a unique identification number and other details including a rack number which will help to physically locate the book.

4. There could be more than one copy of a book, and library members should be able to check-out and reserve any copy. We will call each copy of a book, a book item.

5. As a Librarian, The system should be able to retrieve information like who took a particular book or what are the books checked-out by a specific library member.


===============================================================

Steps to run:

1. Open Command Prompt and navigate to project folder.

2. Run command "json-server --watch ./server/db.json" it will start server at http://localhost:3000 

3. Again open Command Prompt and navigate to project folder.

4. Run command "ng serve" it will start server at http://localhost:4200 

===============================================================

Useage:

1. Use below credntials to login as
	Librarian > 
		username: admin@mail.cc 
		password: password
	Member > 
		username: piyush.b@mail.cc 
		password: password

2. Both have some common and diffenet functions, as per requirements.


Thanks....