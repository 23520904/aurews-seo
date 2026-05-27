import { describe, it, expect } from 'vitest'
import bcrypt from 'bcryptjs'

// ── Role enum (mirrors Prisma schema) ──
const ROLES = ['USER', 'EDITOR', 'ADMIN'] as const
type Role = typeof ROLES[number]

function isValidRole(role: string): role is Role {
  return (ROLES as readonly string[]).includes(role)
}

function hasAdminAccess(role: Role): boolean {
  return role === 'ADMIN'
}

function hasEditorAccess(role: Role): boolean {
  return role === 'ADMIN' || role === 'EDITOR'
}

describe('Auth Helpers — Password Hashing', () => {
  it('bcrypt hash is not equal to plaintext', async () => {
    const plaintext = 'mySecurePassword123'
    const hash = await bcrypt.hash(plaintext, 10)
    expect(hash).not.toBe(plaintext)
  })

  it('bcrypt compare returns true for correct password', async () => {
    const plaintext = 'mySecurePassword123'
    const hash = await bcrypt.hash(plaintext, 10)
    const isMatch = await bcrypt.compare(plaintext, hash)
    expect(isMatch).toBe(true)
  })

  it('bcrypt compare returns false for wrong password', async () => {
    const hash = await bcrypt.hash('correctPassword', 10)
    const isMatch = await bcrypt.compare('wrongPassword', hash)
    expect(isMatch).toBe(false)
  })
})

describe('Auth Helpers — Role Validation', () => {
  it('valid roles are USER, EDITOR, ADMIN', () => {
    expect(isValidRole('USER')).toBe(true)
    expect(isValidRole('EDITOR')).toBe(true)
    expect(isValidRole('ADMIN')).toBe(true)
  })

  it('invalid role strings return false', () => {
    expect(isValidRole('SUPERUSER')).toBe(false)
    expect(isValidRole('')).toBe(false)
    expect(isValidRole('admin')).toBe(false) // case sensitive
  })

  it('only ADMIN has admin access', () => {
    expect(hasAdminAccess('ADMIN')).toBe(true)
    expect(hasAdminAccess('EDITOR')).toBe(false)
    expect(hasAdminAccess('USER')).toBe(false)
  })

  it('ADMIN and EDITOR have editor access', () => {
    expect(hasEditorAccess('ADMIN')).toBe(true)
    expect(hasEditorAccess('EDITOR')).toBe(true)
    expect(hasEditorAccess('USER')).toBe(false)
  })
})
