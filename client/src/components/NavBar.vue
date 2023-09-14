<template>
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">Airsoft4Ohio</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">HOME <i class="bi bi-house-door-fill"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">ABOUT <i class="bi bi-file-earmark-person-fill"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/events">EVENTS <i class="bi bi-calendar2-event-fill"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/fields">FIELDS <i class="bi bi-grid-3x3-gap-fill"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/privacy">PRIVACY POLICY</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">FORUMS <i class="bi bi-info-circle-fill"></i></a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/forums">View <i class="bi bi-eye-fill"></i></router-link></li>
            <li v-if="useAuthStore().isAuthenticated"><router-link class="dropdown-item" to="/create/post">Create Post <i class="bi bi-postcard"></i></router-link></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link v-if="!useAuthStore().isAuthenticated" class="nav-link" to="/login">LOGIN <i class="bi bi-door-open-fill"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="useAuthStore().isAuthenticated" class="nav-link" to="/logout">LOGOUT <i class="bi bi-door-open-fill"></i></router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script setup>
import { useAuthStore } from '../stores/auth';


</script>
