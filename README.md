# Google Home Notification Gateway


Google Home Notification Gateway (GHNG) is an administrable API allowing your Google devices to receive voice notifications from anything able to send very basics HTTP requests.

![img](https://content.screencast.com/users/marlburrow/folders/Snagit/media/da213002-2fe9-40d3-a31c-edd5af85a64c/2018-03-27_21-48-59.png)

It works pretty well with [IFTTT](https://ifttt.com/discover). You can create small automations (applets) that triggers voice notifications on your devices.

Here a simple example of IFTTT and GHNG working together:

>**IF** My favorite Twitch streamer is going live **THEN** Send a HTTP request to GHDG to say "Your favorite Twitch streamer is going live" on all your devices.

If you have some coding skills, it's very easy to send notification to GHNG from any scripting language, you just need to be able to send HTTP Request.
    
## Features
- Receive voice notifications to a single device, or all your devices.
- Support multiple voice languages that can be specified in the request.
- API key protected.
- Embedded [localtunnel](https://localtunnel.github.io/www/) option to test the application without port forwarding configuration.
- A "How to use" section explaining how to create the notification request.

## How it works
Below a diagram showing how GHNG works. The application must be hosted somewhere on your local network (NodeJS must be supported by the host machine).

![img](https://content.screencast.com/users/marlburrow/folders/Snagit/media/18019f5b-9a0c-43ba-bd2b-f62f5938c081/2018-03-17_19-05-26.png)

As show above, GHNG can receive HTTP requests that trigger voice notifications on your devices. 
If you want GHND to receives HTTP request from outside your local network (E.g. IFTTT), you need to configure a NAT rule on your router/box.

## Requirements
- Nodejs (v8.6.0 or higher)
- NPM (v5.6.0 or higher)
- Git

## Installation
First, you need NodeJS installed on the target host (v8.6.0 or higher). If this is not the case, go to the [NodeJS website](https://nodejs.org/en/) to download the version corresponding to your platform.
### 1. Clone the repository 

`$ git clone https://github.com/MarlBurroW/google-home-notification-gateway`


### 2. Install dependencies with NPM

`$ cd google-home-notification-gateway`

`$ npm install`

This step can take a while depending on the speed of your connection and your machine.

### 2. Build the frontend
The frontend part of the project is not commited on the git repository, so you have to build it yourself with this command.

`$ npm run build`

This step can take a while.

### 3. Run GHNG
Now, you can run the application witth the following command.

`$ npm start`

The web administration interface is listening by default on the port 3000.

The above command is good for running GHNG for test purposes, but for a real usecase, read the next step.

### 4. Run GHNG with forever

You probably want to start GHND as a deamon, [Forever](https://github.com/foreverjs/forever) is very good for this.

[Forever](https://github.com/foreverjs/forever) is a simple CLI tool ensuring that a given script runs continuously. 
To run GHNG with forever, use the following commands:

Install Forever globally:

`$ npm install -g forever`

And use this command to start GHND as a deamon:

`$ NODE_ENV=production NODE_PORT=3000 forever start start.js`

To see if the script is running, run the command 

`$ forever list`

You should see the list of forever processes. If you want to stop a process, take the corresponding UID and use this command:

`$ forever stop the-uid`


## Usage

Now the script is running. You need to configure some little thing from the GHND administration panel.

### 1. Authenticate
Go to the administration UI (by default: http://localhost:3000 if the host is your machine). 
On the login screen, type the default password `!adminpassword!`and press enter. 
Now the first thing to do is to change the admin password, go to the **Settings** section and type a new password in the field **Admin password**, and click on **Save**.


### 2. Add your devices

To send notifications to your devices, GHND must know how to reach your devices and how to identify them.

Go to the **Devices** section and click on the plus icon in the top right of the screen. Just type the IP address of one of your google devices. If you don't know it you can view the IP from the Google Home app on Android or iOS.

If the IP is right and your device is reachable, the name and the identifier should be autofilled, but you can change them if you need.

Repeat this step for each of your devices.

### 3. Add an API key.

To Accept notifications, GHND must receive a valid API key in each notification request. 

ideally, you should create an API key for each source of notification. Let's create one for IFTTT first.

Go to the **API Key** section and click on the plus button in the top right of the screen.
Type the name of your API Key (E.g. IFTTT Applets), and click on **Create**

Now, GHNG is ready to receive notification from IFTTT.


### 4. How to use with IFTTT Applets

If you want to send a request from a IFTTT Applet to GHNG, you must use the **Webhooks** service. 

To know how compose the request, go to the section **How to use** in the GHNG Administration panel.


## Network & Localtunnel

You probably want GHND to be able to receive notifications from outside your local network. For this you need to:

- Configure a NAT rule on your router/box pointing on the local machine hosting GHND (on the port 3000 if you have not changed it).
- A static WAN IP address or a DDNS.

### The localtunnnel alternative

If you are not able to be in the previous configuration, I added a localtunnel feature. 
Basically it exposes the notification API to internet without any configuration needed on your router.

In the current version, the localtunnel is not stable over time. However, it's very helpful if you only want to test GHNG without configure NAT on your router.

## Development

Coming soon

## License
MIT © [MarlburroW](https://www.linkedin.com/in/nicolas-varrot-b6b05857/)

