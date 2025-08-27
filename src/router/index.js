import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
      path: '/',
      name: 'index',
      component: () => import('../layout/AuthLayout.vue'),
      redirect: 'login',
      children:[
        {
          path:'login',
          name:'login',
          meta:{title:'ABPay wallet portal'},
          component: () => import('../views/LoginView.vue')
        },
        {
          path:'register',
          name:'register',
          meta:{title:'ABPay wallet portal'},
          component: () => import('../views/RegisterView.vue')
        },
        {
          path:'set-pin',
          name:'setPin',
          meta:{title:'ABPay wallet pin-setup'},
          component: () => import('../views/WalletPin.vue')
        },
        {
          path:'payment/:type',
          name:'merchantPayment',
          meta:{title:'Online merchant payment'},
          component: () => import('../views/payment/Payment.vue')
        }
      ]
    },
    {
      path:'/user',
      name:'user',
      component: () => import('../layout/DashboardLayout.vue'),
      redirect: 'dashboard',
      children:[
        {
          path:'/dashboard',
          name:'dashboard',
          component: () => import('../views/users/DashboardView.vue'),
          meta:{title:'User Dashboard', isAuth:true}
        },
        {
          path:'/direct-payment',
          name:'directPayment',
          component: () => import('../views/users/PaymentView.vue'),
          meta:{title:'Payment', isAuth:true}
        },
        {
          path:'/send-money',
          name:'sendMoney',
          component: () => import('../views/users/SendMoney.vue'),
          meta:{title:'Send money', isAuth:true}
        },
        {
          path:'/cash-in',
          name:'cashIn',
          component: () => import('../views/users/CashIn.vue'),
          meta:{title:'Cash in', isAuth:true}
        },
        {
          path:'/bank-transfer',
          name:'bankTransfer',
          component: () => import('../views/users/BankTransfer.vue'),
          meta:{title:'Bank Transfer', isAuth:true}
        },
        {
          path:'/cash-out',
          name:'cashOut',
          component: () => import('../views/users/CashOut.vue'),
          meta:{title:'Cash out', isAuth:true}
        },
        {
          path:'/transactions',
          name:'transactions',
          component: () => import('../views/users/TransactionsView.vue'),
          meta:{title:'Transactions', isAuth:true}
        },
        {
          path:'/settings',
          name:'settings',
          component: () => import('../views/users/SettingsView.vue'),
          meta:{title:'Settings', isAuth:true}
        },
        {
          path:'/statement',
          name:'statement',
          component: () => import('../views/users/StatementView.vue'),
          meta:{title:'Statement', isAuth:true}
        },
        {
          path:'/kyc-process',
          name:'kycProcess',
          component: () => import('../views/users/KycView.vue'),
          meta:{title:'KYC Process', isAuth:true}
        },
        {
          path:'/merchant-app',
          name:'merchantApp',
          component: () => import('../views/merchants/App.vue'),
          meta:{title:'Merchant App List', isAuth:true}
        },
        {
          path:'/add-merchant-app',
          name:'addMerchantApp',
          component: () => import('../views/merchants/NewApp.vue'),
          meta:{title:'Create New Merchant APP', isAuth:true}
        },
        {
          path:'/merchant-details/{id}',
          name:'merchantAppDetails',
          component: () => import('../views/merchants/AppDetail.vue'),
          meta:{title:'Merchant App Details', isAuth:true}
        }
      ]
    }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'Default Title';
  console.log(to)

  const { useAuthStore } = await import('@/stores/authStore')
  const authStore = useAuthStore();

  await authStore.isAuth(); // Ensure auth state is loaded

  const isLoggedIn = authStore.authUser !== null;

  if (to.meta.isAuth && !isLoggedIn) {
    // Route requires auth but user is NOT logged in
    next({ name: 'login' });
  } else if (to.path === '/login' && isLoggedIn) {
    // Logged in user trying to access login page
    next({ name: 'dashboard' });
  } else {
    next();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


export default router
