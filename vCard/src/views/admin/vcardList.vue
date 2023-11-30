<script setup>
import { onMounted, ref } from 'vue';
import Menu from '@/components/menu.vue'
import { useVcardsStore } from '@/stores/vcards'
import Vcard from '@/components/vcard_list.vue'
import Search from '@/components/search.vue'
import Paginate from '@/components/paginate.vue'

const vcardsStore = useVcardsStore();
const totalPages = ref();

onMounted(async () => {
    await vcardsStore.fetchVcards().then(() => {
        totalPages.value = vcardsStore.lastPage
    })
})

</script>


<template>
    <Menu> </Menu>

    <Search :type="'vcard'" :totalPages="totalPages" :currentPage="1"></Search>

    <div class="container">
        <div class="row justify-content-center">
            <div style="margin-top:3rem" >
                <h2 class="margens">Vcards</h2>
                <br>
            </div>

            <div class="transactions">
                <div class="transactions-list">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Blocked</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Max Debit</th>
                            </tr>
                        </thead>
                        <Vcard v-if="vcardsStore.data_vcard" v-for="vcard in vcardsStore.data_vcard" :id="vcard.id" :name="vcard.name" :email="vcard.email" :phone="vcard.phone_number" :blocked="vcard.blocked" :max_debit="vcard.max_debit" :balance="vcard.balance"/>
                    </table>
                </div>
            </div>
            <Paginate v-if="totalPages" :type="'vcard'" :totalPages="totalPages" :currentPage="1"> </Paginate>
        </div>
    </div>
</template>


<style scoped>

</style>