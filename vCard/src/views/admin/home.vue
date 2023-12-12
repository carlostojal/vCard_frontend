<script setup>
import Menu from '@/components/menu.vue'
import { useUserStore } from '@/stores/user'
import FormatUtil from '@/utils/FormatUtil'
import { onMounted} from 'vue'

const user = useUserStore();
onMounted( async () => {
    await user.fetchAdmin()
})


</script>

<template>
    <Menu> </Menu>
    <div class="container">
        <div class="header">
            <h1 class="welcome">Hello, {{ FormatUtil.formatFirstName(user.name) }}.</h1>
        </div>
    </div>
</template>

<style scoped>

.welcome {
  font-size: 3rem;
  margin: 1rem 0 0.7rem 0;
}

.transactions {
  margin-top: 2rem;
}

</style>
