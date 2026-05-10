const AUTH_KEY = 'azan_admin_auth'
const PASSWORD_KEY = 'azan_admin_password'

function setItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    try {
      sessionStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  }
}

function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    try {
      return sessionStorage.getItem(key)
    } catch {
      return null
    }
  }
}

function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    try {
      sessionStorage.removeItem(key)
    } catch {
    }
  }
}

function getStoredPassword(): string {
  return getItem(PASSWORD_KEY) || '123456'
}

export function login(password: string): boolean {
  if (password === getStoredPassword()) {
    setItem(AUTH_KEY, JSON.stringify({ loggedInAt: Date.now() }))
    return true
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
