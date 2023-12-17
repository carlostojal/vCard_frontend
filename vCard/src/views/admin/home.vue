<script setup>
import Menu from '@/components/menu.vue'
import { useUserStore } from '@/stores/user'
import FormatUtil from '@/utils/FormatUtil'
import { onMounted} from 'vue'
import CardAdminHome from '../../components/cardAdminHome.vue'

const user = useUserStore();
onMounted( async () => {
    await user.fetchAdmin()
})

</script>

<template>
  
    <Menu> </Menu>

    <div class="container">
        <div class="header">
            <h1 class="welcome">Hello, {{ FormatUtil.formatFirstName(user.name) }}</h1>
        </div>
    </div>

    <div class="container" style="margin-top: 5rem;">

      <CardAdminHome href="/admins" title="Admins" desc="List, Add and Delete Administrators"></CardAdminHome>
      <CardAdminHome href="/vcards" title="Vcards" desc="List, Add, Delete, (Un)Block Vcards and Edit max debit"></CardAdminHome>
      <CardAdminHome href="/allTransactions" title="Transactions" desc="List all Transactions"></CardAdminHome>
      <CardAdminHome href="/allCategories" title="Categories" desc="List, Add and Delete Default Categories"></CardAdminHome>
      <CardAdminHome href="/addAdmin" title="Add Admin" desc="Create a new Administrator"></CardAdminHome>
      <CardAdminHome href="/addCategory" title="Add Category" desc="Create a new Default Category"></CardAdminHome>
      <CardAdminHome href="/seeStatistics" title="See Statistics" desc="Watch the current web App statistics"></CardAdminHome>
      
    </div>

</template>

<style scoped>
.container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
    }
.card:hover {
      transform: scale(1.05);
    }
.card {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      text-decoration: none;
      color: #333;
      transition: transform 0.2s;
    }
.welcome {
  font-size: 3rem;
  margin: 1rem 0 0.7rem 0;
}

.transactions {
  margin-top: 2rem;
}

</style>
