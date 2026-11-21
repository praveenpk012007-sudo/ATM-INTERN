import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const ROLE_CONFIG = {
  i4c:          { label: 'I4C Officer',     icon: '🏛️', jurisdiction: 'National',    defaultState: null, defaultUser: 'officer.i4c@mha.gov.in', designation: 'Director (Operations), I4C' },
  police:       { label: 'Police Official', icon: '👮', jurisdiction: 'State',       defaultState: 'Maharashtra', defaultUser: 'dsp.cyber@mahapolice.gov.in', designation: 'DySP Cyber Cell, Mumbai' },
  bank:         { label: 'Bank / FI',       icon: '🏦', jurisdiction: 'Institution', defaultState: null, defaultUser: 'nodal.ciso@sbi.co.in', designation: 'Nodal Cyber Fraud Officer, SBI' },
  investigator: { label: 'Investigator',    icon: '🔍', jurisdiction: 'Case-based',  defaultState: null, defaultUser: 'inv.spl@cbi.gov.in', designation: 'Sr. Cyber Investigator, CBI' },
  admin:        { label: 'Admin',           icon: '⚙️', jurisdiction: 'System',      defaultState: null, defaultUser: 'sysadmin.root@nic.in', designation: 'Platform Administrator, NIC' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cybereye_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [role, setRole] = useState(() => {
    try {
      const saved = localStorage.getItem('cybereye_user');
      return saved ? JSON.parse(saved).role : 'i4c';
    } catch (e) {
      return 'i4c';
    }
  });

  const login = useCallback((username, password, selectedRole) => {
    const config = ROLE_CONFIG[selectedRole] || ROLE_CONFIG.i4c;
    const newUser = {
      username: username || config.defaultUser,
      role: selectedRole,
      ...config,
      loginTime: new Date().toLocaleString('en-IN'),
    };
    setRole(selectedRole);
    setUser(newUser);
    try {
      localStorage.setItem('cybereye_user', JSON.stringify(newUser));
    } catch (e) {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRole('i4c');
    try {
      localStorage.removeItem('cybereye_user');
    } catch (e) {}
  }, []);

  const switchRole = useCallback((newRole) => {
    const config = ROLE_CONFIG[newRole] || ROLE_CONFIG.i4c;
    setRole(newRole);
    setUser(prev => {
      const updated = {
        ...(prev || {}),
        username: config.defaultUser,
        role: newRole,
        ...config,
      };
      try {
        localStorage.setItem('cybereye_user', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, login, logout, switchRole, ROLE_CONFIG }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
