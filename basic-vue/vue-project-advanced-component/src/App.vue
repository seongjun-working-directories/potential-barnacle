<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/nestedcomponent">Nested Component</router-link><br/>
    <router-link to="/parent-child">Parent and Child</router-link> |
    <router-link to="/parent-child-2">Parent and Child 2</router-link> |
    <router-link to="/parent-child-3">Parent and Child 3</router-link> |
    <router-link to="/parent-child-4">Parent and Child 4</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
