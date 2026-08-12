export const HUD_MODULES = [
    {id: "user", label: "User"},
    {id: "browser", label: "Browser"},
    {id: "machine", label: "Machine"},
    {id: "activity", label: "Activity map"},
] as const

export type HudModuleId = typeof HUD_MODULES[number]["id"]