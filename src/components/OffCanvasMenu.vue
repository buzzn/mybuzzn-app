<template>
    <div id="off-canvas-menu" :class="{'open': open}">
        <nav>
            <ul>
                <li v-if="auth.loggedIn"><router-link @click.native="$emit('navigate')" :to="{ name: 'Profile' }">{{ 'profile' | translate }}</router-link></li>
                <li v-if="auth.loggedIn"><router-link @click.native="$emit('navigate')" :to="{ name: 'MyBuzzn' }">{{ 'my-buzzn' | translate }}</router-link></li>
                <li v-if="auth.loggedIn"><router-link @click.native="$emit('navigate')" :to="{ name: 'OurBuzzn' }">{{ 'our-buzzn' | translate }}</router-link></li>
                <li><router-link @click.native="$emit('navigate')" to="/meta/support">{{ 'support' | translate }}</router-link></li>
                <li v-if="auth.loggedIn"><a href="#" @click.prevent="logout">{{ 'logout' | translate }}</a></li>
            </ul>
        </nav>
        <nav class="meta">
            <ul>
                <li><router-link @click.native="$emit('navigate')" :to="{ path: '/meta/privacy-policy' }">{{ 'privacy-policy' | translate }}</router-link></li>
                <li><router-link @click.native="$emit('navigate')" :to="{ path: '/meta/imprint' }">{{ 'imprint' | translate }}</router-link></li>
                <li><router-link @click.native="$emit('navigate')" :to="{ path: '/meta/terms' }">{{ 'terms' | translate }}</router-link></li>
                <li><router-link @click.native="$emit('navigate')" :to="{ path: '/meta/about' }">{{ 'about' | translate }}</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import AuthState from '../states/AuthState';

export default {
  name: 'OffCanvasMenu',
  props: ['open'],
  data: () => ({
    auth: AuthState.state,
  }),
  methods: {
    logout() {
      // do logout call here
      AuthState.set('loggedIn', false);
      AuthState.set('token', null);
      AuthState.destroy();
      this.$emit('navigate');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

#off-canvas-menu {
    position: fixed;
    top: 0;
    max-width: 450px;
    min-height: 100vh;
    .ios & {
        min-height: 105vh;
    }
    width: 80vw;
    z-index: 10;
    background-image: $solarGradient;
    background-position: top left;
    box-shadow: 0;
    box-sizing: border-box;
    padding: 100px 30px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: translate3D(-100%, 0, 1px);
    transition: transform 500ms ease;
    &.open {
        box-shadow: 0 0 10px rgba($black, 0.4);
        nav {
            ul {
                li {
                    transform: translate3D(0, 0, 1px);;
                }
            }
        }
    }
    nav {
        ul {
            padding: 0;
            margin: 0;
            list-style: none;
            li {
                transform: translate(-20px);
                transition: transform 1000ms ease;
                @for $i from 1 through 10 {
                    &:nth-child(#{$i}) {
                        transition-delay: $i * 50ms;
                    }
                }
                a {
                    color: $black;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 24px;
                    line-height: 2em;
                }
            }
        }
        &.meta {
            ul {
                li {
                    a {
                        color: $grey-4;
                        font-size: 15px;
                        font-weight: normal;
                    }
                }
            }
        }
    }
}
</style>
