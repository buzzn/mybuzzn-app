<template>
    <div id="off-canvas-menu" :class="{'open': open}">
        <nav>
            <ul>
                <li><router-link :to="{ name: 'Profile' }">{{ 'profile' | translate }}</router-link></li>
                <li><router-link :to="{ name: 'MyBuzzn' }">{{ 'my-buzzn' | translate }}</router-link></li>
                <li><router-link :to="{ name: 'OurBuzzn' }">{{ 'our-buzzn' | translate }}</router-link></li>
            </ul>
        </nav>
        <nav class="meta">
            <ul>
                <li><router-link :to="{ name: 'Meta' }">{{ 'privacy-policy' | translate }}</router-link></li>
                <li><router-link :to="{ name: 'Meta' }">{{ 'imprint' | translate }}</router-link></li>
                <li><router-link :to="{ name: 'Meta' }">{{ 'terms' | translate }}</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'OffCanvasMenu',
  props: ['open'],
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

#off-canvas-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    max-width: 450px;
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
    transform: translate(-100%);
    transition: transform 500ms ease, box-shadow 700ms ease;
    &.open {
        box-shadow: 0 0 10px rgba($black, 0.4);
        nav {
            ul {
                li {
                    transform: translate(0);
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
