# mfp-exporter
##A JavaScript exporter for MyFitnessPal

Download your strength training data from MyFitnessPal! Mfp-exporter is currently the only way to do this without access to MyFitnessPal's private API.

## How to Export Your Strength Training Data
1. In the exercise tab of MyFitnessPal, click the "View Full Report (Printable)" button
![](https://github.com/laurakelly/mfp-exporter/blob/master/screenshots/Screen-Shot-2015-05-12-at-6.43.44-PM.png?raw=true)
2. Unclick everything except "Exercise Diary" and select the dates you want to export. Click the "change report" button.
![](https://github.com/laurakelly/mfp-exporter/blob/master/screenshots/Screen%20Shot%202015-05-12%20at%209.00.45%20PM.png?raw=true)
3. Open up the Chrome Dev Tools JavaScript console (`command` + `option` + `J` on Mac)
4. Copy and Paste the code from `exporter.js`. When you hit `enter` a file with your data will be downloaded.

## Support
I'm only supporting strength training data for now, but maybe I'll add more in the future? If you want cardio data, file an issue!
