
First, you need NodeJS installed on the target host (v8.6.0 or higher). If this is not the case, go to the [NodeJS website](https://nodejs.org/en/) to download the version corresponding to your platform.

You also need to install XCode to build native libraries


#### 1. Clone the repository 

`$ git clone https://github.com/MarlBurroW/google-home-notification-gateway`


#### 2. Install dependencies with NPM

`$ cd google-home-notification-gateway`

`$ npm install --production`

This step can take a while depending on the speed of your connection and your machine.

If this step fails with a `node-gyp` related error, go to [node-gyp](`https://github.com/nodejs/node-gyp`) and follow the instructions for your plateform.

#### 2. Run GHNG

Now, you can run the application witth the following command.

`$ npm start`

The web administration interface is listening by default on the port 3000.

The above command is good for running GHNG for test purposes, but for a real usecase, read the next step.

#### 3. Run GHNG with forever

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
