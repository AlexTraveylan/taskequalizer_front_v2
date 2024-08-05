const url = process.env.NODE_ENV === "production" ? "https://www.alextraveylan.fr" : "http://localhost:8000"

export const registerUrl = url + "/register_create"
export const registerInvitationUrl = url + "/register_invite"
export const loginUrl = url + "/login"
export const logoutUrl = url + "/logout"

const apiUrl = url + "/api"

export const familyUrl = apiUrl + "/family/"
export const familyMembersUrl = familyUrl + "members/"
export const familyPossibleTasksUrl = familyUrl + "possible_tasks/"
export const familyPossibleTaskDetailsUrl = familyUrl + "possibles_taks_details/"
export const familyTasksUrl = familyUrl + "tasks/"
export const tasksByDateByMemberUrl = familyUrl + "tasks_by_date_by_member/"

export const memberUrl = apiUrl + "/member/"
export const memberTaskUrl = memberUrl + "task/"

export const possibleTaskUrl = apiUrl + "/possible_task/"

export const taskUrl = apiUrl + "/task/"

export const invitationUrl = apiUrl + "/invitation/"
export const cleanInvitationUrl = invitationUrl + "clean_invitations/"
export const validInvitationListUrl = invitationUrl + "get_valid_list/"

export const ephemeralTaskUrl = apiUrl + "/ephemeral_task/"

export const familySettingsUrl = apiUrl + "/family_settings/"

export const checkoutSessionUrl = url + "/checkout_session"
export const plansInformationUrl = url + "/plans_informations"

export const emailContactUrl = url + "/contact_form"
