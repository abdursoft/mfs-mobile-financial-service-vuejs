import { AUTH } from "@/server/Api";
import apiClient from "@/service/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('authStore', () => {
  const authUser = ref(null);
  const authRole = ref(null);
  const authToken = ref(localStorage.getItem('abpToken') || null);
  const signupToken = ref(null);
  const walletToken = ref(null);
  const loading = ref(false);

  function setAuthRole(role) {
    authRole.value = role;
  }

  function setAuthToken(token) {
    authToken.value = token;
    if (token) {
      localStorage.setItem('abpToken', token);
    } else {
      localStorage.removeItem('abpToken');
    }
  }

  function setSignupToken(token) {
    signupToken.value = token;
  }

  function setWalletToken(value) {
    walletToken.value = value;
  }

  function isAuthenticated() {
    return authToken.value !== null;
  }

  async function isAuth() {
    loading.value = true;
    try {
      const res = await apiClient.get(AUTH.CHECK);
      if (res.data) {
        setAuthRole(res.data?.user?.role);
        authUser.value = res.data.user ?? null;
        loading.value = false;
      }
    } catch (error) {
      await refreshAuthToken();
    }
  }

  async function refreshAuthToken() {
    try {
      const token = localStorage.getItem('abpRefToken') || null;
      if (!token) return false;
      const res = await apiClient.post(AUTH.REFRESH_TOKEN, {  },{
        'refreshToken': token
      });
      if (res.data && res.data.token) {
        setAuthToken(res.data.token);
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  return {
    authUser,
    authRole,
    authToken,
    signupToken,
    walletToken,
    loading,
    setAuthRole,
    setAuthToken,
    setSignupToken,
    setWalletToken,
    isAuthenticated,
    isAuth,
    refreshAuthToken,
  };
});
