# WitsFreelancing
Serverside repo can be found here https://github.com/PermanentPortionX/Wits-freelancing-ServerSide

## Requirements
To add support or rebuild a project for any platform, you need to run the command-line interface from the same machine that supports the platform's SDK. The CLI supports the following combinations:

iOS (Mac)
Android (Mac, Linux, Windows)
BlackBerry 10 (Mac, Linux, Windows)
Windows Phone 7 (Windows)
Windows Phone 8 (Windows)
Windows 8 (Windows)
Firefox OS (Mac, Linux, Windows)
On the Mac, the command-line is available via the Terminal application. On the PC, it's available as Command Prompt under Accessories.

The more likely it is that you run the CLI from different machines, the more it makes sense to maintain a remote source code repository, whose assets you pull down to local working directories.

To install the cordova command-line tool, follow these steps:

Download and install Node.js. Following installation, you should be able to invoke node or npm on your command line.

Install the cordova utility. In Unix, prefixing the additional sudo command may be necessary to install development utilities in otherwise restricted directories:

$ sudo npm install -g cordova
The installation log may produce errors for any uninstalled platform SDKs. Following installation, you should be able to run cordova on the command line.

## Build and run
Go to the directory where you maintain your source code, and run a command such as the following:

    $ cordova create hello com.example.hello HelloWorld
It may take some time for the command to complete, so be patient. Run the cordova -d to see information about progress.

The first argument specifies a hello directory to be generated for your project. Its www subdirectory houses your application's home page, along with various resources under css, js, and img, which follow common web development file-naming conventions. The config.xml file contains important metadata needed to generate and distribute the application.

The other two arguments are optional: the com.example.hello argument provides your project with a reverse domain-style identifier, and the HelloWorld provides the application's display text. You can edit both of these values later in the config.xml file.

Add Platforms
All subsequent commands need to be run within the project's directory, or any subdirectories within its scope:

    $ cd hello
Before you can build the project, you need to specify a set of target platforms. Your ability to run these commands depends on whether your machine supports each SDK, and whether you have already installed each SDK. Run any of these from a Mac:

    $ cordova platform add ios
    $ cordova platform add android
    $ cordova platform add blackberry10
    $ cordova platform add firefoxos
Run any of these from a Windows machine, where wp refers to different versions of the Windows Phone operating system:

    $ cordova platform add wp7
    $ cordova platform add wp8
    $ cordova platform add windows8
    $ cordova platform add android
    $ cordova platform add blackberry10
    $ cordova platform add firefoxos
Run this to check your current set of platforms:

    $ cordova platforms ls
(Note the platform and platforms commands are synonymous.)

Run either of the following synonymous commands to remove a platform:

    $ cordova platform remove blackberry10
    $ cordova platform rm android
Running commands to add or remove platforms affects the contents of the project's platforms directory, where each specified platform appears as a subdirectory. The www source directory is reproduced within each platform's subdirectory, appearing for example in platforms/ios/www or platforms/android/assets/www. By default, each platform's configuration file is set up to be able to access all of Cordova's APIs.

If you wish, you can use an SDK at this point to open the project you created. However, any edits you make to the project within an SDK affect the derivative set of assets, not the original cross-platform source files. Use this approach if you simply want to initialize a project. (See the Platform Guides for information on how to develop applications within each SDK.) Read on if you wish to use command-line tools for the entire development cycle.

Build the App
By default, the cordova create script generates a skeletal web-based application whose home page is the project's www/index.html file. Edit this application however you want, but any initialization should be specified as part of the [deviceready](../../cordova/events/events.deviceready.html) event handler, referenced by default from www/js/index.js.

Run the following command to iteratively build the project:

    $ cordova build
This generates platform-specific code within the project's platforms subdirectory. You can optionally limit the scope of each build to specific platforms:

    $ cordova build ios
The cordova build command is a shorthand for the following, which in this example is also targeted to a single platform:

    $ cordova prepare ios
    $ cordova compile ios
In this case, once you run prepare, you can use Apple's Xcode SDK as an alternative to modify and compile the platform-specific code that Cordova generates within platforms/ios. You can use the same approach with other platforms' SDKs.

Test the App on an Emulator or Device
SDKs for mobile platforms often come bundled with emulators that execute a device image, so that you can launch the app from the home screen and see how it interacts with many platform features. Run a command such as the following to rebuild the app and view it within a specific platform's emulator:

    $ cordova emulate android


