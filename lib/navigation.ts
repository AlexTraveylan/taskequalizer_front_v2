import { NavigationItem, NavigationSettingsItem } from "@/lib/app-types"

export const navigation: NavigationItem[] = [
  {
    label: new Map([
      ["en", "home"],
      ["fr", "accueil"],
      ["de", "heim"],
    ]),
    href: "/",
    authRequired: false,
    ariaLabel: new Map([
      ["en", "Go to Home page"],
      ["fr", "Aller à la page d'accueil"],
      ["de", "Gehe zur Startseite"],
    ]),
  },
  {
    label: new Map([
      ["en", "about"],
      ["fr", "à propos"],
      ["de", "über"],
    ]),
    href: "/account",
    authRequired: true,
    ariaLabel: new Map([
      ["en", "Go to Account page"],
      ["fr", "Aller à la page de compte"],
      ["de", "Gehe zur Kontoseite"],
    ]),
  },
  {
    label: new Map([
      ["en", "taskEqualizer"],
      ["fr", "taskEqualizer"],
      ["de", "taskEqualizer"],
    ]),
    href: "/settings",
    authRequired: true,
    ariaLabel: new Map([
      ["en", "Go to Settings page"],
      ["fr", "Aller à la page des paramètres"],
      ["de", "Gehe zur Einstellungsseite"],
    ]),
  },
]

export const settings_navigation: NavigationSettingsItem[] = [
  {
    i18nKey: "launch_label",
    href: "/",
    i18nAriaKey: "launch_aria",
  },
  {
    i18nKey: "create_p_task_label",
    href: "/create_p_task",
    i18nAriaKey: "create_p_task_aria",
  },
  {
    i18nKey: "resume_label",
    href: "/resume",
    i18nAriaKey: "resume_aria",
  },
]
