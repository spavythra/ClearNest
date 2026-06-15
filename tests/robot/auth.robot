*** Settings ***
Documentation     ClearNest — authentication flow acceptance tests
Library           Browser
Suite Setup       New Browser    chromium    headless=True
Suite Teardown    Close Browser

*** Variables ***
${BASE_URL}       https://clear-nest.vercel.app
${TIMEOUT}        15s

*** Test Cases ***

Login Page Is Accessible
    New Page    ${BASE_URL}/auth/login
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    Get Title    contains    ClearNest

Login Form Renders Email And Password Fields
    New Page    ${BASE_URL}/auth/login
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    Get Element States    css=input[type="email"]      contains    visible
    Get Element States    css=input[type="password"]   contains    visible

Login Form Has Submit Button
    New Page    ${BASE_URL}/auth/login
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    Get Element States    css=button[type="submit"]    contains    visible

Sign Up Page Is Accessible
    New Page    ${BASE_URL}/auth/signup
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    Get Element States    css=input[type="email"]    contains    visible

Google OAuth Button Is Present
    New Page    ${BASE_URL}/auth/login
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    ${count}=    Get Element Count    css=button:has-text("Google"), css=[aria-label*="Google"]
    Should Be True    ${count} > 0

Invalid Login Shows Error
    New Page    ${BASE_URL}/auth/login
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    Fill Text    css=input[type="email"]       notareal@test.com
    Fill Text    css=input[type="password"]    wrongpassword
    Click        css=button[type="submit"]
    Wait For Elements State
    ...    css=.error, css=[role="alert"], css=[data-testid="error"]
    ...    visible    timeout=${TIMEOUT}

Unauthenticated User Is Redirected From Dashboard
    New Page    ${BASE_URL}
    Wait For Load State    networkidle    timeout=${TIMEOUT}
    Get Url    contains    /auth/login

*** Keywords ***

Open Login Page
    New Page    ${BASE_URL}/auth/login
    Wait For Load State    networkidle    timeout=${TIMEOUT}
