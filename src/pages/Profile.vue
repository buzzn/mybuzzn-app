<template>
  <div class="theme--meta">
    <header-bar @menu="$emit('menu')">{{ 'profile' | translate }}</header-bar>
    <main>
      <div class="wrap">
        <h2>{{ 'profile-headline' | translate }}</h2>
        <p>
            {{ 'profile-intro' | translate }}
        </p>
        <div class="avatar">
          <label>{{ 'avatar' | translate }}</label>
          <span></span>
          <div class="image"  @click="takePhoto">
            <div class="mask" v-if="profile.avatar" :style="{backgroundImage: `url(${profile.avatar})`}"></div>
            <div class="mask" v-if="!profile.avatar">
              <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_default_avatar</title><path d="M19,22.4h-.72V21.13a3.4,3.4,0,0,0,0-.45,6.82,6.82,0,0,0,3.6-5.82,3.39,3.39,0,0,0,1.95-3.07v-.73a1.83,1.83,0,0,0-1.83-1.83h-.11V8a5,5,0,0,0-5-5H13.23a5,5,0,0,0-5,5V9.23H8.08a1.83,1.83,0,0,0-1.83,1.83v.73A3.39,3.39,0,0,0,8.2,14.86a6.8,6.8,0,0,0,3.6,5.82,3.42,3.42,0,0,0,0,.45V22.4h-.71A7.61,7.61,0,0,0,3.45,30h1a6.61,6.61,0,0,1,6.6-6.6h.77a3.22,3.22,0,0,0,6.36,0H19a6.61,6.61,0,0,1,6.6,6.6h1A7.61,7.61,0,0,0,19,22.4Zm3-12.17a.83.83,0,0,1,.83.83v.73a2.42,2.42,0,0,1-.94,1.91V10.23ZM7.25,11.79v-.73a.83.83,0,0,1,.83-.83h.11V13.7A2.42,2.42,0,0,1,7.25,11.79Zm1.94,2.88V8a4,4,0,0,1,4-4h3.54a4,4,0,0,1,4,4v6.69a5.81,5.81,0,0,1-11.62,0Zm8,8.19a2.24,2.24,0,0,1-4.47,0V21.1a6.73,6.73,0,0,0,4.46,0v1.76Z"/></svg>
            </div>
            <span><svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_camera</title><path d="M23,22.47H7a1.83,1.83,0,0,1-1.83-1.83V12.53A1.83,1.83,0,0,1,7,10.7H9.66a1.24,1.24,0,0,0,1-.5l1.5-2a1.39,1.39,0,0,1,1.1-.54h3.5a1.39,1.39,0,0,1,1.1.54l1.5,2a1.24,1.24,0,0,0,1,.5H23a1.83,1.83,0,0,1,1.83,1.83v8.11A1.83,1.83,0,0,1,23,22.47ZM7,11.7a.83.83,0,0,0-.83.83v8.11a.83.83,0,0,0,.83.83H23a.83.83,0,0,0,.83-.83V12.53A.83.83,0,0,0,23,11.7H20.34a2.24,2.24,0,0,1-1.79-.89l-1.49-2a.39.39,0,0,0-.31-.15h-3.5a.39.39,0,0,0-.31.15l-1.49,2a2.24,2.24,0,0,1-1.79.89Z"/><path d="M15,21a4.86,4.86,0,1,1,4.86-4.86A4.87,4.87,0,0,1,15,21Zm0-8.72a3.86,3.86,0,1,0,3.86,3.86A3.87,3.87,0,0,0,15,12.27Z"/><path d="M16.42,10.6H13.58a.5.5,0,0,1-.5-.5.51.51,0,0,1,.5-.5h2.84a.51.51,0,0,1,.5.5A.5.5,0,0,1,16.42,10.6Z"/></svg></span>
          </div>
        </div>
        <div>
          <field :error="errorMessage.username" @blur="validate('username')" v-model="username" :label="'username' | translate" type="text" name="username"></field>
          <div class="row">
            <field :error="errorMessage.flatSize" @blur="validate('flatSize')"  v-model="flatSize" :label="'flat-size' | translate" type="text" name="flatSize"></field>
            <field :error="errorMessage.flatPopulation" @blur="validate('flatPopulation')" v-model="flatPopulation" :label="'flat-population' | translate" type="number" name="flatPopulation"></field>
          </div>
          <div class="row">
            <field :value="profile.firstname" :disabled="true" :label="'firstname' | translate" type="text" name="firstname"></field>
            <field :value="profile.lastname" :disabled="true" :label="'lastname' | translate" type="text" name="lastname"></field>
          </div>
          <field :value="profile.email" :disabled="true" :label="'email' | translate" type="text" name="email"></field>
          <field-button :label="'save' | translate"></field-button>
          <div class="hints wrap" v-if="$route.params.firstView">
            <p>
              {{ 'not-now' | translate }} <router-link :to="{ name: 'MyBuzzn' }">{{ 'skip' | translate }}</router-link>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import Field from '@/components/Field';
import FieldButton from '@/components/FieldButton';
import ProfileState from '../states/ProfileState';

export default {
  name: 'Profile',
  components: {
    HeaderBar,
    Field,
    FieldButton,
  },
  watch: {
    username(value) {
      this.validator.username = value.length >= 8;
    },
    flatSize(value) {
      this.validator.flatSize = !isNaN(+value);
    },
    flatPopulation(value) {
      this.validator.flatPopulation = !isNaN(+value);
    },
  },
  data() {
    return {
      error: '-',
      username: '-',
      flatPopulation: 0,
      flatSize: 0,
      profile: ProfileState.state,
      validator: {
        username: false,
        flatSize: false,
        flatPopulation: false,
      },
      errorMessage: {
        username: '',
        flatSize: '',
        flatPopulation: '',
      },
    };
  },
  mounted() {
    this.flatSize = this.profile.flatSize;
    this.flatPopulation = this.profile.flatPopulation;
    this.username = this.profile.username;
  },
  methods: {
    takePhoto() {
      if (navigator.camera) {
        navigator.camera.getPicture((imageData) => {
          ProfileState.set('avatar', imageData);
        }, (error) => {
          this.error = error;
        }, {
          quality: 50,
          // eslint-disable-next-line
          destinationType: Camera.DestinationType.FILE_URI, //DATA_URL , FILE_URI
          // eslint-disable-next-line
          sourceType: Camera.PictureSourceType.CAMERA,
          // eslint-disable-next-line
          encodingType: Camera.EncodingType.JPG,
          // eslint-disable-next-line
          mediaType: Camera.MediaType.PICTURE,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: true,
          correctOrientation: true,
        });
      } else {
        this.error = 'navigator camera error';
      }
    },
    validate(key) {
      switch (key) {
        case 'username':
          this.errorMessage.username = this.username.length && !this.validator.username ? 'not valid' : '';
          break;
        case 'flatSize':
          this.errorMessage.flatSize = this.flatSize.length && !this.validator.flatSize ? 'not valid' : '';
          break;
        case 'flatPopulation':
          this.errorMessage.flatPopulation = this.flatPopulation.length && !this.validator.flatPopulation ? 'not valid' : '';
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.avatar {
  .image {
    height: 200px;
    width: 200px;
    margin: 0 auto 2em;
    position: relative;
    .mask {
      border-radius: 50%;
      overflow: hidden;
      border: 8px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.5);
      background-size: cover;
      background-position: center center;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(45deg, rgba(182,234,236,1) 0%, rgba(207,223,87,1) 100%);
      svg {
        width: 100%;
        height: 100%;
        display: block;
        path {
          fill: white;
        }
      }
    }
    span {
      position: absolute;
      top: 0;
      right: 0;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: $solar-3;
      display: block;
      box-sizing: border-box;
      padding: 5px;
      svg {
        transform: translate(0, -2px);
        path {
          fill: white;
        }
      }
    }
  }
  label {
    font-size: 12px;
    color: $grey-3;
    display: inline-block;
    padding: 2px 5px;
  }
}
.field.no-margin {
  margin-bottom: 0;
}


small {
  display: inline-block;
  padding-left: 16px;
  margin-bottom: 30px;
}

.hints {
  margin-bottom: 30px;
  p {
    text-align: center;
    font-size: 12px;
    margin: 0;
    padding: 0 0 1em;
    a {
      text-decoration: none;
      font-weight: bold;
      color: $color;
    }
  }
}
</style>
