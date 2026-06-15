*** Settings ***
Documentation     ClearNest — shopping list acceptance tests
Library           Browser

*** Variables ***
${BASE_URL}       https://clear-nest.vercel.app
${TIMEOUT}        15s

*** Test Cases ***

Shopping Page Is Reachable
    New Browser    chromium    headless=True
    New Page       ${BASE_URL}/shopping
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    Get Title    contains    ClearNest
    [Teardown]    Close Browser

Shopping List Renders Input Field
    New Browser    chromium    headless=True
    New Page       ${BASE_URL}/shopping
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    ${count}=    Get Element Count
    ...    css=input[placeholder*="item"], css=input[placeholder*="add"], css=[data-testid="item-input"]
    Should Be True    ${count} > 0
    [Teardown]    Close Browser

Checked Items Are Visually Distinguished
    New Browser    chromium    headless=True
    New Page       ${BASE_URL}/shopping
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    ${checked}=    Get Element Count    css=input[type="checkbox"]:checked, css=.item-done
    Log    ${checked} checked items found
    [Teardown]    Close Browser

Page Is Usable On Mobile Viewport
    New Browser    chromium    headless=True
    New Page       ${BASE_URL}/shopping
    Set Viewport Size    390    844
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    Get Element States    css=main, css=.shopping-list    contains    visible
    [Teardown]    Close Browser
