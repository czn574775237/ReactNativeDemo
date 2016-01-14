# A simple app written by React Native
![](./assert/dashboard.png?raw=true)

## How to run
1. Prepare your environment: [Requirements](http://facebook.github.io/react-native/docs/getting-started.html#requirements) and [Android Setup](http://facebook.github.io/react-native/docs/android-setup.html)
2. run `git clone https://github.com/czn574775237/ReactNativeDemo.git`
3. run `cd ReactNativeDemo && npm install`
4. Build on Xcode

# TODO
* Support Android


# License
The MIT license.

## IOS Use fontawesome icon
### Option: Manually

If you want to use any of the bundled icons, you need to add the icon fonts to your XCode project. Just follow these steps:

* Right click on you project in XCode and select Add files to "NameOfYourProject".
* Browse to node_modules/react-native-vector-icons and select the folder Fonts (or just the ones you want). Make sure your app is checked under "Add to targets" and that "Create groups" is checked if you add the whole folder.
* Edit Info.plist and add a property called Fonts provided by application (if you haven't added one already) and type in the files you just added. It will look something like this:

If you want to use the TabBar/NavigatorIOS integration or use getImageSource, then you need to add RNVectorIcons.xcodeproj to Libraries and add libRNVectorIcons.a to Link Binary With Libraries under Build Phases. More info and screenshots about how to do this is available in the React Native documentation.
