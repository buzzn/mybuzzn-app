# BUZZN Hybrid Mobile App

The BUZZN App is a consumer mobile Application. It targets the BUZZN clients and includes features like displaying the current consumption or the suffiency of a week. 

## Develop:
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start

```

## Prepare for building on devices:
``` bash
./prepare.sh
```

## Run on devices

``` bash
# on android
cordova run android

# on ios
cordova run ios
```


# Build for release

```bash
sudo sh ./prepare.sh
nvm use 10
cordova build ios # open in xcode 
```

- in xcode set the build target to generic IOS Device
- then click on `Archive`
- Validate and Distribute your new App
- Check that you increased the version number

