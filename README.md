# MiniApp - [MiniApp](https://angular-demos.github.io/mini-app/)

[![Build Status](https://travis-ci.org/angular-demos/mini-app.svg?branch=master)](https://travis-ci.org/angular-demos/mini-app)

This is a simple Angular application that uses a mock JSON API provided by [JSONPlaceHolder](https://jsonplaceholder.typicode.com/).
It demonstrates 3 basic user operations.

- displays a list of blog posts
- displays a list of photo albums
- displays a list of to do items.


## File Naming Convention

This project doesn't follow the traditional lowercase dot naming pattern used by the Angular CLI. 
I've opted for a CamelCase pattern that is a little easier to read. Each Angular "module" is placed 
into it's own folder, and contains a "components" folder with a directory for each component. This 
approach makes it easier to drop unused components later. It also makes the packaging of modules 
more obvious when you browse the file structure.
