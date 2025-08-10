import install from '@/install'

// import host
const { host } = install

// base route
export const ROOT_URL = `${host}api/v1/`

// auth routes
export const AUTH = {
  REGISTER: `${ROOT_URL}auth/register`,
  VERIFY_OTP: `${ROOT_URL}auth/verify-otp`,
  RESEND_OTP: `${ROOT_URL}auth/resend-otp`,
  SET_PIN: `${ROOT_URL}auth/set-pin`,
  LOGIN: `${ROOT_URL}auth/login`,
  LOGOUT: `${ROOT_URL}auth/logout`,
  REFRESH_TOKEN: `${ROOT_URL}auth/refresh-token`,
  CHECK: `${ROOT_URL}auth/check`,
  DASHBOARD: `${ROOT_URL}auth/dashboard`
}

// pin reset
export const PIN = {
  RESET: `${ROOT_URL}pin/reset`,
  RESEND_OTP: `${ROOT_URL}pin/resend-otp`,
  VERIFY_OTP: `${ROOT_URL}pin/verify-otp`,
  NEW_PIN: `${ROOT_URL}pin/new-pin`
}

// wallet routes
export const WALLET = {
  BALANCE: `${ROOT_URL}wallet/balance`,
  STATEMENT: `${ROOT_URL}wallet/statement`
}

// transaction routes
export const TRANSACTION = {
  SEND: `${ROOT_URL}transaction/send`,
  CASH_OUT: `${ROOT_URL}transaction/cash-out`,
  SUMMERY: `${ROOT_URL}transaction/summery`,
}

// kyc routes
export const KYC = {
  UPLOAD: `${ROOT_URL}kyc/upload`,
  STATUS: `${ROOT_URL}kyc/status`
}

// agent routes
export const AGENT = {
  CASH_IN: `${ROOT_URL}agent/cash-in`,
  DASHBOARD: `${ROOT_URL}agent/dashboard`
}

// merchant routes
export const MERCHANT = {
  RECEIVE_PAYMENT: `${ROOT_URL}merchant/receive-payment`,
  CREATE_APP: `${ROOT_URL}merchant/create-app`,
  GET_APP: `${ROOT_URL}merchant/get-app`,
  DASHBOARD: `${ROOT_URL}merchant/dashboard`
}

// payment routes
export const PAYMENT = {
  TOKEN: `${ROOT_URL}payment/token`,
  CREATE: `${ROOT_URL}payment/create`,
  PROCEED: (id) => `${ROOT_URL}payment/proceed/${id}`,
  VERIFY_OTP: (id) => `${ROOT_URL}payment/otp/verify/${id}`,
  VERIFY_PIN: (id) => `${ROOT_URL}payment/pin/verify/${id}`
}

// SMS routes
export const SMS = {
  LIST: `${ROOT_URL}sms-methods/`,
  CREATE: `${ROOT_URL}sms-methods/create`,
  UPDATE: `${ROOT_URL}sms-methods/update`,
  DELETE: (id) => `${ROOT_URL}sms-methods/delete/${id}`,
  OPEN: (id = '') => `${ROOT_URL}sms-methods/open/${id}`,
  SET_ACTIVE: `${ROOT_URL}sms-methods/set`,
  GET_ACTIVE: `${ROOT_URL}sms-methods/active`
}

// admin routes
export const ADMIN = {
  PENDING_KYC: (id = '') => `${ROOT_URL}admin/kyc/${id}`,
  APPROVE_KYC: (id) => `${ROOT_URL}admin/kyc/approve/${id}`,
  REJECT_KYC: (id) => `${ROOT_URL}admin/kyc/reject/${id}`,
  DASHBOARD: `${ROOT_URL}admin/dashboard`
}
