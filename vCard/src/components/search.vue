<script setup>

</script>

<template>

    <form class="navbar navbar-expand-lg" style="margin-top: 2.5rem" action="{{ route('search') }}" method="GET">
        <div class="container">
            <input class="form-control" type="text" name="query" placeholder="Search...">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </div>
    </form>

</template>

<style scoped>

</style>