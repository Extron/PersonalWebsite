---
title: "Hue SmartSwitch"
date: "03/07/2018"
category: "Software Development"
cover: ""
previewCopy: "An Android Things app for controlling Philips Hue smart lights"
previewImage: "./smart-swtich-cover.png"
tags:
    - programming
    - mobile
    - Android
    - Raspberry Pi
dir: "projects"
template: "projectTemplate.jsx"
status: "active"
---
Source: [Extron/SmartLightSwitch](https://github.com/Extron/SmartLightSwitch)

## Overview
I started this project after acquiring several Philips Hue smart lights to light my home, primarily the [LED light strips](https://www2.meethue.com/en-us/p/hue-white-and-color-ambiance-lightstrip-plus-na-base/719015548), which support a full HSV color palette. As smart lights, Philips Hues have mobile and web apps that allow users to fully control and customize their lights, including brightness and color, as well as set up rooms and schedules. Philips Hues also support integration with digital assistants like Amazon Alexa, allowing control through voice commands. Philips also sells [several accesory devices](https://www2.meethue.com/en-us/products/controls#filters=CONTROLS_SU&sliders=&support=&price=&priceBoxes=&page=&layout=12.subcategory.p-grid-icon) such as switches and motion sensors that can be used to control the lights.

Despite all these control options, I needed a mechanism that allowed robust control in a form that could replace a light switch. Having to go through the official mobile app to change light settings can be a slow process, especially when sitting in the dark, and while the digital assistant integration is pretty good, it isn't robust enough to easily control most light features just with voice. Further, voice controls are slow; the process of *speaking to Alexa -> Alexa interpreting the command -> Alexa telling the Philips Hue bridge the command -> Philips Hue bridge telling the lights* can take a dozen seconds, which is uncomfortable when navigating a dark room. I wanted a smart switch that could take the place of a normal lightswitch in most cases, but allow me to fully control any light or group of lights connected to my Hue bridge, ideally without having to navigate through too many screens or prompts.

## Project Goals
The smart switch had to meet several primary requirements:
* Support a responsive touch interface that would be able to run on an embedded always-on device mounted on a wall.
* Communicate to a Philips Hue bridge to send and receive states of various lights, groups, and accessories.
* Have a elegant interface that succinctly displayed the live state of any chosen light or group of lights, and allows the user to change the state of these lights in as few interactions as possible

#### Goal 1: Embedded device with touch interface
I chose to use a Raspberry Pi to prototype the smart switch. The [RPi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) supports wireless LAN and Bluetooth capability, which was a must in order for the smart switch to be able to communicate with a Philips Hue bridge in a practical way. It also supports touch screen peripherials, and Raspberry Pi even produces a [7" capacitive touch screen](https://www.raspberrypi.org/products/raspberry-pi-touch-display/) that easily integrates with the RPi 3.

I considered developing the app on [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), but decided to use [Android Things](https://developer.android.com/things/index.html) instead. The reason was manifold. First, I am more familiar with Android app development and enjoy the platform and [Material Design](https://material.io/). Secondly, Android Things runs on the core Android OS, allowing any Android Things app to be run on any Android device with little work. Finally, Philips has an Android SDK that utilizes the Hue API, allowing Android apps to be written to control Hue lights easily. 

#### Goal 2: Communicate with Philips Hue
Philips Hue smart lights have a [fully developed API](https://www.developers.meethue.com/) that allows developers to write custom applications to control Hue lights. There are also several SDKs that integrate with the API, including one for Android development. This SDK manages connecting to a Philips Hue bridge, obtaining a list of connected lights and other devices, and managing the state of these connected devices.

#### Goal 3: An elegant and succinct interface
The interface of the app needed to be as succinct as possible, as its primary function was to replace a standard lightswitch. It also needed to at minimum support being able to turn on and off and change the color and brightness of an arbitrary group of lights, both as a group and individually. I wanted as much of this to be able to be performed from a single screen. The interface also needed to display the state of the lights in a way that allowed users to quickly discern, as the switch was going to be an always-on device.

## UI
The app's UI can be divided into several sections:
* Bridge connection - A set of screens for finding and connecting to a Hue bridge
* Switch - For controlling a set of lights
* Settings & state - A set of UIs for displaying the state of the app and controlling app settings

#### Bridge Connection
This is the screen that displays the first time the app runs, as well as when there is no Philips Hue bridge connected to the device. It allows the user to launch a search on the LAN the device is on to find Hue bridges, and presents them with a list of found bridges to connect to. Once a user chooses a bridge, it displays the connection status and prompts the user when needed, or displays any errors when connecting.

#### Switch
This is the primary screen of the app. Most of the UI is taken up by the *On* and *Off* buttons, each of which takes up half of the screen. As the primary function of the switch, turning lights on and off needed to be as easy as possible, allowing the user to do so in the same way they do with a physical lightswitch. A button on the edge of the screen allows the user to select from a list which lights they want to control. When at least one of the selected lights is on, the background of the *On* button displays the color of the lights. A brightness slider is present under the *On* button when the lights are on. Two buttons appear on the sides of the *On* button when on, one of which brings up a dialog to select light color, the other brings up a dialog with a list of scenes each light supports. Finally, a bottom sheet can be brought up to show a list of all individual lights selected, and each list element contains an on/off switch, a brightness slider, and a color picker to control that individual light.

#### Settings & State
The settings page of the app contains all of the app settings (as of v1.0, there is only one setting to control the device screen orientation). This settings page can be accessed from the navigation drawer of the app.  The navigation drawer also displays the current IP address of the smart switch (useful for communicating with it through Android's abd program) as well as the name and IP address of the connected Hue bridge.  The user can also disconnect from the Hue bridge and manually shut down the device from the navigation drawer.