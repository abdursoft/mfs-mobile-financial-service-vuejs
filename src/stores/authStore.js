import { AUTH } from "@/server/Api";
import apiClient from "@/service/axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("authStore", () => {
  const authUser = ref(null);
  const authRole = ref(null);
  const authToken = ref(localStorage.getItem("abpToken") || null);
  const signupToken = ref(null);
  const walletToken = ref(null);
  const loading = ref(false);
  const isRefresh = ref(false);
  const refreshCount = ref(0);

  const router = useRouter();

  // set auth role
  function setAuthRole(role) {
    authRole.value = role;
  }

  // set auth token
  function setAuthToken(token) {
    authToken.value = token;
    if (token) {
      localStorage.setItem("abpToken", token);
    } else {
      localStorage.removeItem("abpToken");
    }
  }

  // set signup token
  function setSignupToken(token) {
    signupToken.value = token;
  }

  // set wallet token
  function setWalletToken(value) {
    walletToken.value = value;
  }

  // check authenticated
  function isAuthenticated() {
    return authToken.value !== null;
  }

  // check is auth available
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
      const refresh = await refreshAuthToken();
      if(!refresh && isRefresh && refreshCount == 0){
        refreshCount.value += 1;
        router.push({name:'login'});
      }
    }
  }

  // signin with refresh token
  async function refreshAuthToken() {
    try {
      const token = localStorage.getItem("abpRefToken") || null;
      if (!token) return false;
      const res = await apiClient.post(AUTH.REFRESH_TOKEN, [], {
        headers: {
          refreshToken: token,
        },
      });
      if (res.data && res.data.token) {
        setAuthToken(res.data.token);
        return true;
      }
    } catch (error) {
      isRefresh.value = true;
      return false;
    }
  }

  // logout and remove user session data
  async function logout() {
    try {
      const res = await apiClient.post(AUTH.LOGOUT);
      setAuthToken(null);
      setAuthRole(null);
      authUser.value = null;
      localStorage.removeItem("abpToken");
      localStorage.removeItem("abpRefToken");
      return res;
    } catch (error) {
      return error;
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
    logout,
  };
});
