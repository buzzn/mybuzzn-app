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
            <div class="mask" :style="{backgroundImage: `url(${profile.avatar})`}"></div>
            <span><img src="/static/img/photo.png" alt=""></span>
          </div>
        </div>
        <div>
          <field v-model="username" :label="'username' | translate" type="text" name="username"></field>
          <div class="row">
            <field v-model="flatSize" :label="'flat-size' | translate" type="text" name="flatSize"></field>
            <field v-model="flatPopulation" :label="'flat-population' | translate" type="number" name="flatPopulation"></field>
          </div>
          <div class="row">
            <field :value="profile.firstname" :disabled="true" :label="'firstname' | translate" type="text" name="firstname"></field>
            <field :value="profile.lastname" :disabled="true" :label="'lastname' | translate" type="text" name="lastname"></field>
          </div>
          <field :value="profile.email" :disabled="true" :label="'email' | translate" type="text" name="email"></field>
          <field-button :label="'save' | translate"></field-button>
          <div class="hints wrap">
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
  data() {
    return {
      error: '-',
      username: '-',
      flatPopulation: 0,
      flatSize: 0,
      profile: ProfileState.state,
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
      padding: 15px;
      img {
        width: 70%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
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
