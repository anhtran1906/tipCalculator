# Pre-work - *Tip Calculator*

**tipCalculator** is a tip calculator application for React Native.

Submitted by: **Anh Tran**

Time spent: **16** hours spent in total

**Note** I have built this app on ios since I have a Mac. In order to run on Android, all you need to do is copy the index.ios.js file
into index.android.js

## Usage

- Clone the project from git to your local repo

- Go to your local repo

- Follow these steps to run your project locally

**Install**
```
npm install
```

**Start the application in development mode**
```
react-native run-ios
```

## User Stories

The following **required** functionality is complete:

* [X] User can enter a bill amount, choose a tip percentage, and see the tip and total values.
* [X] Settings page to change Scene Transition
* [X] Navigator integrate (keep it's simple)

The following **optional** features are implemented:
* [X] UI animations:
  - Added easing-in animation for the sliders on the front page
* [X] Settings page to change the default tip percentage.
* [ ] Using locale-specific currency and currency thousands separators.
* [X] Making sure the keyboard is always visible and the bill amount is always the first responder. This way the user doesn't have to tap anywhere to use this app. Just launch the app and start typing.

The following **additional** features are implemented:
* [X] Change the Segment control tab to a Slider so users can easily change the tip percent
* [X] Add the Split slider for users to split their bills among 1-10 people
* [X] Replace the Setting and Save buttons and Split Slider with icons
* [X] Minimize words on the app for better UI/UX

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/Tbtv1co.gif' title='Video Walkthrough Tip Calculator React native' width='' alt='Video Walkthrough Tip Calculator React native' />

GIF created with [LiceCap](http://www.cockos.com/licecap/).

## Notes

- Still looking for better ways to implement Animations for the AppRegistry
- Cannot figure out how to change local currency for the app
- Having trouble setting up the Android dev environment on Mac

## License

    Copyright [2017] [Anh Tran]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
