# AdminUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.0.

Instructions on how to use the application.

1. To select any row , user has to select the checknox for that particular row and click the delete icon for deleting that specific row.
2. For deleting multiple rows , user can select multiple checkboxes and click "Delete Selected" button to delete multiple rows. For deleting all rows in a particular
   page, user can select the checkbox on the top left corner which appears on the header of the table and click on "Delete Selected" button. Also a particular
   record can be deleted by clicking on delete icon present next to the edit icon for that row.
3. For editing a particular record, user can click on edit icon for any row. Once the icon is clicked, a textbox will appear for all the three columns
   where the necessary editing can be performed. Also a tick icon will come instead of edit icon. Once user has done editing , he/she can click on the tick icon
   to save the changes.Once saved, the edit icon will be visible again.
4. User can also search by name,email or role in the above search bar. Based on the search, the records will be filtered out and the table will be paged into 
   different page numbers.
5. By default ten records will appear on each page.

Note: Angular tests for service are written in the admin service file and for the component methods, tests are written in the homepage component. 

If any error occurs in fetching the list of users, then relevant error messages are shown in the UI.
For 404 error, then "No records found" message is shown.
For any other server error, "Failed to load data" message is shown.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
