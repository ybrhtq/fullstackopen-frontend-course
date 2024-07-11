```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User pushes the button, browser executes javascript code that redraws notes list and then sends new note to server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {message: "note created"}
    deactivate server
```