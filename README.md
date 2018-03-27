# Google Home Notification Gateway

![img](https://www.screencast.com/t/NSkwJytILfHU)

Google Home Notification Gateway (GHNG) is an administrable API allowing your Google devices to receive voice notifications from anything able to send very basics HTTP requests.

It works pretty well with [IFTTT](https://ifttt.com/discover). You can create small automations (applets) that triggers voice notifications on your devices.

Here a simple example of IFTTT and GHNG working together:

>**IF** My favorite Twitch streamer goes live **THEN** Send a HTTP request to GHDG to say "Your favorite Twitch streamer goes live" on all your devices.

If you have some coding skills, it's very easy to send notification to GHNG from any scripting language, you just need to be able to send HTTP Request.
    
## Features
- Receive voice notifications to a single device, or all your devices.
- Support multiple voice languages that can be specified in the request.
- API key protected.
- Embedded [localtunnel](https://localtunnel.github.io/www/) option to test the application without port forwarding configuration.
- A "How to use" section explaining how to create the notification request.

## How it works
Below a diagram showing how GHNG works. The application must be installed on a host on your local network supporting NodeJS.

![img](https://content.screencast.com/users/marlburrow/folders/Snagit/media/18019f5b-9a0c-43ba-bd2b-f62f5938c081/2018-03-17_19-05-26.png)

## Requirement
- Nodejs (v8.6.0 or higher)
- NPM (v5.6.0 or higher)
- Git

## Installation
First, you need NodeJS installed on the target host (v8.6.0 or higher). If this is not the case, go to the [NodeJS website](https://nodejs.org/en/) to download the version corresponding to your platform.
### 1. Clone the repository 

`$ git clone `https://github.com/MarlBurroW/google-home-notification-gateway


### 2. Install dependencies with NPM
`$ cd google-home-notification-gateway`
`$ npm install`

This step can take a while depending on the speed of your connection and your machine.

### 2. Build the frontend
The frontend part of the project is not commited on the git repository, so you have to build it yourself with this command.

`$ npm run build`

This step can take a while

### 3. Run GHNG
Now, you can run the application witth the following command.

`$ npm start`

The web administration interface is listening by default on the port 3000. 

### 4. Run GHNG with forever

[Forever](https://github.com/foreverjs/forever) is a simple CLI tool for ensuring that a given script runs continuously. 
To run GHNG with forever, use the following commands:

`$ npm install -g forever`
`$ NODE_ENV=production NODE_PORT=3000 forever start start.js`

To see if the script is running, run the command 

`$ forever list`

You should see the list of forever processes. If you want to stop a process, take the corresponding UID and use this command:

`$ forever stop the-uid`


## Usage

### 1. Authenticate
Go to the administration UI (by default: http://localhost:3000 if the host is your machine). 
On the login screen, type the default password `!adminpassword!`and press enter. 
Now the first thing to do is to change the admin password, go to the **Settings** section and type a new password in the field **Admin password**, and click on **Save**.


### 2. Add your devices
Go to the **Devices** section and click on the plus icon on the top right of the screen. Just type the IP address of one of your google devices. If you don't know it you can view the IP from the Google Home app on Android or iOS.
If the IP is right and your device is reachable, the name and the identifier should be autofilled, but you can change them if you need.
Repeat this step for each of your devices.

### 3. Add an API key.

ideally, you should create an API key for each source of notification. Let's create one for IFTTT first.

Go to the **API Key** section and click on the plus button on the top right of the screen.
Type the name of your API Key (E.g. IFTTT Applets), and click on **Create**

Now, GHNG is ready to receive notification from IFTTT.


### 4. How to use with IFTTT Applets

If you want to send a request from a IFTTT Applet to GHNG, you must use the **Webhooks** service. 
To know how compose the request, go to the section **How to use** in the GHNG Administration panel.


## Network & Localtunnel

Coming soon
## Development

Coming soon

