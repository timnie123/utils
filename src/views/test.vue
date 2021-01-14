<template>
  <div class="test"></div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'test',
  mounted() {
    const socket = io('http://192.168.5.49:8088/websocket');
  },
};
</script>

<style scoped>

</style>
