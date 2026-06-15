*** Settings ***
Documentation     Shared keywords for ClearNest Robot Framework tests
Library           Browser

*** Variables ***
${BASE_URL}       https://clear-nest.vercel.app
${TIMEOUT}        15s

*** Keywords ***

Open Page
    [Arguments]    ${path}=/
    New Browser    chromium    headless=True
    New Page       ${BASE_URL}${path}
    Wait For Load State    networkidle    timeout=${TIMEOUT}

Close Session
    Close Browser
