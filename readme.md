# Virtual Library

Version 1.2 of the virtual library project.

[Live Demo](https://marcaroni3d.github.io/library/)

## New Updates:
- Simplified card layout
    - Removed increment/decrement buttons as they seemed unnecessary. To change the page count, simply use the Edit menu.
    - Can now remove books from Edit menu (feature was missing in previous version)
- New form labels above input fields
- Implemented custom Form Validation
    - Error box will appear with message if input parameters are not met:
        - When adding a book, title can not already exist in library
        - Title & Author field cannot be blank
        - Title & Author cannot exceed 50 characters
        - Current & Total page counts cannot be greater than 1,000,000
        - If Current & Total page counts are equal, set Book to "read"

### Planned Updates:
- Default page count to 0 if no user input
- Local storage
- User Interface
    - Stats such as total books, number of books read, total pages, number of pages read
    - Library book filter & searchbar
