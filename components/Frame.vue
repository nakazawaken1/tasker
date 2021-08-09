<template>
  <div>
    <header class="flex items-center justify-end bg-blue-200 p-1">
      <template v-if="$store.state.user">
        <img
          :src="$store.state.user.photo"
          width="32"
          height="32"
          class="flex-initial"
        />
        <label class="flex-initial">{{ $store.state.user.name }}</label>
        <a
          class="
            flex-initial
            rounded-lg
            py-1
            px-4
            text-white
            bg-green-500
            hover:bg-green-700
          "
          :href="`/api/auth/logout?url=${$route.path}`"
          >Logout</a
        >
      </template>
      <template v-else>
        <a :href="`/api/auth/login?url=${$route.path}`">Login with GitHub</a>
      </template>
    </header>
    <main v-if="$store.state.user">
      <slot />
    </main>
  </div>
</template>
