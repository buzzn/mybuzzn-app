<template>
    <div class="challenges" :class="{ 'success': isPassed}">
      <div v-if="!isLoading && !isError" class="challenges-content">
        <div v-if="isPassed" class="success-background"></div>
        <div v-if="!challenges.active && !challenge">
          <h3>{{ 'start-challenge' | translate }}</h3>
          <div class="challenge-container">
            <h3>{{ 'current-challenges' | translate }}</h3>
            <ul>
              <li v-for="(c, key) in challenges.available" :key="key" @click="challenge = c">
                <div class="item">
                  <div class="image">
                    <div v-html="icon"></div>
                  </div>
                  <div class="name">
                    <span class="name-right">
                      <strong>{{ c.name }}</strong><br>
                      <small>{{ c.total }} mal versucht {{ c.succeeded ? `/ ${c.succeeded} mal geschafft` : null }}</small>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="challenge">
          <a class="close" href="#" @click.prevent="cancel">
            <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_close</title><path d="M15,3.48A11.52,11.52,0,1,0,26.52,15,11.54,11.54,0,0,0,15,3.48Zm0,22A10.52,10.52,0,1,1,25.52,15,10.53,10.53,0,0,1,15,25.52Z"/><path d="M20.69,9.31a.51.51,0,0,0-.71,0l-5,5-5-5a.5.5,0,1,0-.71.71l5,5-5,5a.51.51,0,0,0,0,.71.54.54,0,0,0,.36.14.52.52,0,0,0,.35-.14l5-5,5,5a.52.52,0,0,0,.35.14.54.54,0,0,0,.36-.14.51.51,0,0,0,0-.71l-5-5,5-5A.51.51,0,0,0,20.69,9.31Z"/></svg>
          </a>
          <h3 v-if="!challenges.active">{{ 'whats-about' | translate }}</h3>
          <h3 v-if="isRunning">{{ 'running-challenge' | translate }}</h3>
          <h3 v-if="isPassed">{{ 'challenge-passed' | translate }}</h3>
          <h3 v-if="isFailed">{{ 'challenge-failed' | translate }}</h3>
          <div class="challenge-container">
            <h3>{{ challenge.name }}</h3>
            <div>
              <div class="icon" :class="{ 'transparent': isFailed }" v-html="icon"></div>
              <p v-if="!isFailed && !isPassed">{{ challenge.description }}</p>
              <p v-if="isFailed || isPassed">{{ challenges.active.message }}</p>
              <div v-if="!challenges.active">
                <field-button @click="start(challenge)" :label="'start-challenge' | translate"></field-button>
              </div>
              <div v-if="isFailed || isPassed">
                <field-button @click="cancel" :label="'choose-new-challenge' | translate"></field-button>
              </div>
              <div v-if="isRunning">
                <h5>{{ 'just-days' | translate(leftDays)}}</h5>
                <div class="progress-bar">
                  <div class="progress-indicator" :style="{ width: challenges.active.progress * 100 + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="section-loader">
        <loading-icon></loading-icon>
      </div>
      <div v-if="isError" class="section-loader">
        <error-icon :message="'error-400' | translate"></error-icon>
      </div>
    </div>
</template>

<script>
import FieldButton from '@/components/FieldButton';
import LoadingIcon from '@/components/LoadingIcon';
import ErrorIcon from '@/components/ErrorIcon';
import APIService from '../services/APIService';
import ChallengesState from '../states/ChallengesState';

export default {
  name: 'Challenges',
  components: {
    FieldButton,
    LoadingIcon,
    ErrorIcon,
  },
  computed: {
    leftDays() {
      if (this.challenges && this.challenges.active && this.challenges.active.expire_at) {
        const delta = this.challenges.active.expire_at - ((new Date()).getTime() / 1000);
        return Math.round(delta / 24 / 60 / 60);
      }
      return '?';
    },
    isPassed() {
      return this.challenges.active && this.challenges.active.status === 'passed';
    },
    isRunning() {
      return this.challenges.active && this.challenges.active.status === 'running';
    },
    isFailed() {
      return this.challenges.active && this.challenges.active.status === 'failed';
    },
  },
  data() {
    return {
      icon: '<svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_challenge</title><path d="M23.55,6.89H6.45A2.46,2.46,0,0,0,4,9.34v.2a5,5,0,0,0,5,5,2.43,2.43,0,0,0,1.28-.36,7.93,7.93,0,0,0,3.31,1.42v3.1a2.62,2.62,0,0,0-1.23,1.75H12a1.48,1.48,0,0,0-1.48,1.48v2.29A1.48,1.48,0,0,0,12,25.71h6.1a1.48,1.48,0,0,0,1.48-1.48V21.94a1.48,1.48,0,0,0-1.48-1.48h-.42a2.58,2.58,0,0,0-1.23-1.73V15.61a7.93,7.93,0,0,0,3.31-1.42,2.43,2.43,0,0,0,1.28.36,5,5,0,0,0,5-5v-.2A2.46,2.46,0,0,0,23.55,6.89ZM22,7.89a7,7,0,0,1-14,0ZM9,13.55a4,4,0,0,1-4-4v-.2A1.45,1.45,0,0,1,6.45,7.89H7a8,8,0,0,0,2.43,5.59A1.54,1.54,0,0,1,9,13.55Zm9.52,8.39v2.29a.47.47,0,0,1-.48.48H12a.47.47,0,0,1-.48-.48V21.94a.48.48,0,0,1,.48-.48h6.1A.48.48,0,0,1,18.53,21.94ZM13.4,20.46a1.67,1.67,0,0,1,1.65-1.13,1.63,1.63,0,0,1,1.55,1.13Zm2-4.72v2.59h-.8V15.74ZM25,9.54a4,4,0,0,1-4,4,1.54,1.54,0,0,1-.42-.07A8,8,0,0,0,23,7.89h.55A1.45,1.45,0,0,1,25,9.34Z"/></svg>',
      challenges: ChallengesState.state,
      challenge: null,
      isLoading: true,
      isError: false,
    };
  },
  mounted() {
    APIService.challenges().then(() => APIService.currentChallenge().then(() => {
      if (this.challenges.active) {
        this.challenge = this.challenges.available.filter(c => c.id === this.challenges.active.id)[0];
      }

      this.isLoading = false;
    }));
  },
  methods: {
    cancel() {
      this.challenge = null;
      // TODO: API Call to cancel the running challenge
      ChallengesState.set('active', null);
    },
    start(challenge) {
      // TODO: API Call to start the a new challenge
      ChallengesState.set('active', {
        id: challenge.id,
        progress: 0,
        status: 'running',
        expire_at: ((new Date()).getTime() / 1000) + (7 * 24 * 60 * 60),
      });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.challenges {
  min-height: 300px;
  .success-background {
    background: rgb(178,235,242);
    background: linear-gradient(45deg, rgba(178,235,242,1) 0%, rgba(192,202,51,1) 100%);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .close {
    position: absolute;
    top: 1em;
    left: 1em;
    width: 30px;
    height: 30px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  h3 {
    position: relative;
    z-index: 1;
  }
  .challenge-container {
    position: relative;
    z-index: 1;
    padding: 20px 0 40px;
    h3 {
      font-size: 35px;
      margin-bottom: 0;
    }
    .icon {
      height: 130px;
      margin: 0 0 1em;
      &.transparent {
        opacity: 0.3;
      }
      svg {
        height: 100%;
        display: block;
        margin: 0 auto;
        * {
          fill: $color;
        }
      }
    }
    p {
      text-align: center;
      margin: 0 0 2em;
    }

    .progress-bar {
      height: 18px;
      background: $grey-2;
      border-radius: 9px;
      position: relative;
      overflow: hidden;
      .progress-indicator {
        width: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        background: rgb(185,40,97);
        background: linear-gradient(45deg, rgba(185,40,97,1) 0%, rgba(101,95,222,1) 100%);
        border-radius: 9px;
        transition: width 500ms ease;
      }
    }

    h5 {
      text-align: center;
      font-size: 25px;
      margin: 0 0 0.75em;
    }

    ul {
      margin: 2em 0 0;
      padding: 0;
      list-style: none;
      li {
        margin: 0;
        padding: 0;
        &:last-of-type {
          .item {
            &:after {
              display: none;
            }
          }
        }
      }
    }
    .item {
      display: flex;
      padding: 15px 0;
      position: relative;
      &:after {
        content: '';
        display: block;
        width: 105%;
        position: absolute;
        bottom: 0;
        height: 1px;
        background: $grey-3;
        right: -40px;
        opacity: 0.3;
      }
      .image {
        width: 50px;
        height: 50px;
        svg {
          display: block;
          width: 100%;
          height: 100%;
          width: 50px;
          height: 50px;
          * {
            fill: $color !important;
            stroke: none;
          }
        }
      }
      .name {
        display: flex;
        padding-left: 20px;
        padding-top: 10px;
        .name-right {
          font-weight: 500;
          display: block;
          letter-spacing: 0.05em;
          small {
            font-weight: 300;
          }
        }
      }
    }
  }
}
</style>
