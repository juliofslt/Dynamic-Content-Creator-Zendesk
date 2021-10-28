## Create dynamic content in bulk in Zendesk from a Google SpreadSheet.

If you want to support multiple languages in your Zendesk tickets, but you don't don't have the time to create all the necessary dynamic content items one by one manually (which is very time consuming), this tool may help you out.

This script will allow you to create multiple dynamic content items in less than 10 seconds!

---

### Install

- Create a new Google Spreadsheet, or open an existing one.
- In the upper menu bar, open "Tools", and select "Script Editor".
- Once the Script Editor opens up, just copy the code from this repo and paste it in the file that is already created by default (Code.gs) and save.
- Make sure to configure your Zendesk API key in the function `SETPROPERTIES`. Replace the `YOUR_API_KEY_HERE` text with your ZD API key in the `CREATEREQUEST` function.
- Also, make sure to set your subdomain in the `subdomain` const in the `CREATEDCITEM` function.

---

### Creating Dynamic Content

To create a new Dynamic Content in Zendesk, use the custom function `CREATEDCITEM`.

This takes 3 parameters; 

- Deafult Language Content (English default)
- Secondary Language Content (Spanish default)
- Placeholder name

Write the name of this function in an empty cell, and pass as an argument the cells containing the content in the default language, secondary language and the placeholder name.

Example:

`=CREATEDCITEM( default_language, secondary_language, placeholder_name )`

If everything went well, this function will return a "Success" message. If there was an error, it'll return an error message

**Notes**:

- Make sure to delete the function from the cell when done to prevent it from running again when you open the sheet in future oportunities!

- Also, if the languages that you use in your Zendesk are not the deault ones in this script (English and Spanish), make sure to invetigate what are the locale ID variants that you need and configure them in the object `body` within the `CREATEDCITEM` function (below the "\*** Structure of the item to create \***" comment in the `CREATEDCITEM` function), and you can even add more languages (locale IDs) if you'd like to. The following documentation may help you out:

	- https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/

---

### Creating placeholder names

You can also create the placeholder name easily with the function "FORMATTICKETFIELD".

Internally, this function takes the name of the current active sheet, and formats it along with the name that you pass as an argument to the function. For example;

- The current active sheet is called `ticket-form` and here is where you'll create all of your ticket forms.
- In a cell, you have the name `Bugs and issues` of the placeholder you want to create.
- Call the function in an empty cell -> `=FORMATTICKETFIELD( cell-with-placeholder-name )
- Output -> `ticket-form_BUGS-AND-ISSUES`

