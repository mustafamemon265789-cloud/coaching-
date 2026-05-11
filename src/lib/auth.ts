const AUTH_KEY = 'azan_admin_auth'
const PASSWORD_KEY = 'azan_admin_password'
const memoryStore = new Map<string, string>()

function setCookie(key: string, value: string): boolean {
  try {
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=2592000; SameSite=Lax`
    return document.cookie.includes(`${key}=`)
  } catch {
    return false
  }
}

function getCookie(key: string): string | null {
  try {
    const match = document.cookie
      .split(';')
      .map((row) => row.trim())
      .find((row) => row.startsWith(`${key}=`))
    return match ? decodeURIComponent(match.slice(key.length + 1)) : null
  } catch {
    return null
  }
}

function removeCookie(key: string): void {
  try {
    document.cookie = `${key}=; path=/; max-age=0; SameSite=Lax`
  } catch {
  }
}

function setItem(key: string, value: string): boolean {
  let stored = false
  memoryStore.set(key, value)
  try {
    localStorage.setItem(key, value)
    stored = true
  } catch {
    try {
      sessionStorage.setItem(key, value)
      stored = true
    } catch {
    }
  }
  return setCookie(key, value) || stored || memoryStore.get(key) === value
}

function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key) || getCookie(key) || memoryStore.get(key) || null
  } catch {
    try {
      return sessionStorage.getItem(key) || getCookie(key) || memoryStore.get(key) || null
    } catch {
      return getCookie(key) || memoryStore.get(key) || null
    }
  }
}

function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
  }
  try {
    sessionStorage.removeItem(key)
  } catch {
  }
  removeCookie(key)
  memoryStore.delete(key)
}

function getStoredPassword(): string {
  return getItem(PASSWORD_KEY) || '1111'
}

export function login(password: string): boolean {
  if (password === getStoredPassword()) {
    return setItem(AUTH_KEY, JSON.stringify({ loggedInAt: Date.now() }))
  }
  return false
}

export function logout(): void {
  removeItem(AUTH_KEY)
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  const data = getItem(AUTH_KEY)
  if (!data) return false
  try {
    const parsed = JSON.parse(data)
    return !!(parsed.loggedInAt)
  } catch {
    return false
  }
}

export function changePassword(currentPassword: string, newPassword: string): string | null {
  if (currentPassword !== getStoredPassword()) return 'Current password is incorrect'
  if (!newPassword || newPassword.length < 4) return 'New password must be at least 4 characters'
  setItem(PASSWORD_KEY, newPassword)
  return null
}
