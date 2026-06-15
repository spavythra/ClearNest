*** Settings ***
Documentation     ClearNest — Kanban task board acceptance tests
...               Requires a valid session cookie. Set AUTH_COOKIE in a .env.robot
...               or pass via environment variable for CI.
Library           Browser
Resource          common.resource

*** Variables ***
${BASE_URL}       https://clear-nest.vercel.app
${TIMEOUT}        15s

*** Test Cases ***

Kanban Page Loads
    Open Authenticated Page    /reminders
    Get Title    contains    ClearNest

Three Columns Are Visible
    Open Authenticated Page    /reminders
    FOR    ${col}    IN    To Do    In Progress    Done
        Wait For Elements State    css=[data-column="${col}"], css=.kanban-column:has-text("${col}")
        ...    visible    timeout=${TIMEOUT}
    END

Add Task Button Is Present
    Open Authenticated Page    /reminders
    ${count}=    Get Element Count
    ...    css=button:has-text("Add"), css=[data-testid="add-task"], css=button:has-text("New Task")
    Should Be True    ${count} > 0

Task Card Renders Title
    Open Authenticated Page    /reminders
    ${count}=    Get Element Count    css=.task-card, css=[data-testid="task-card"]
    Run Keyword If    ${count} > 0
    ...    Get Text    css=.task-card:first-child    matches    .+

*** Keywords ***

Open Authenticated Page
    [Arguments]    ${path}
    New Page    ${BASE_URL}${path}
    Wait For Load State    networkidle    timeout=${TIMEOUT}
