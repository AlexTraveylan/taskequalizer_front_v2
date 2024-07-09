const url = "http://localhost:8000"
// const url = "https://alextraveylan.pythonanywhere.com"

export const registerUrl = url + "/register_create"
export const loginUrl = url + "/login"
export const logoutUrl = url + "/logout"

const apiUrl = url + "/api"

export const familyUrl = apiUrl + "/family/"
export const familyMembersUrl = familyUrl + "members/"
export const familyPossibleTasksUrl = familyUrl + "possible_tasks/"

export const memberUrl = apiUrl + "/member/"
export const memberTaskUrl = memberUrl + "task/"

export const possibleTaskUrl = apiUrl + "/possible_task/"

export const taskUrl = apiUrl + "/task/"

export const invitationUrl = apiUrl + "/invitation/"
