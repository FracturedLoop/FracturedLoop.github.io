---
path: '/managing-dotfiles-and-zsh-with-dotbot-and-antigen'
date: "2017-11-06T20:23:14Z"
title: "Managing dotfiles and ZSH with dotbot and antigen"
tags: 
- config
- computer setup
- tutorial
---

I'm gonna be honest here, quite often I would get frustrated with dotfiles. A large part of that frustration was because I never took the time to properly set up my dotfiles, so any time that I would add a new file or make a change, I would have to manually relink files, or put them in the proper place. I finally had enough, so I did some research into the "proper" method of organizing and keeping track of them. What I found was [Dotbot](https://git.io/dotbot) for general dotfiles and [Antigen](http://antigen.sharats.me/) for managing my ZSH installation.

I also set up a Github [repository](https://github.com/fracturedloop/dotfiles) for my dotfiles. This enables me to easily backup my configuration. Additionally, it makes setup on a new machine _incredibly_ simple; just two commands and I have my custom-tailored terminal and dotfiles.

```bash
git clone https://github.com/FracturedLoop/dotfiles.git # Clone the repo
dotfiles/./install # Run the install script
```

So... How do you get started making your own configuration? Firstly, make a folder to store your dotfiles. I would suggest making it in your home (`~`) directory, and naming it `dotfiles`. You could also hide the directory if you want by prepending the name with a period (eg. `.dotfiles`). Then, go ahead and set it up as a git repository (`git init`), and set it up on Github if you want. Next, we'll set up Dotbot. Dotbot is useful even if you don't use ZSH. It works with any dotfiles or configuration files/directories. To use Dotbot, we are going to set it up as a submodule to our dotfiles repository.

```bash
mkdir dotfiles && cd dotfiles # Make a dotfiles folder and change into it
git submodule add https://github.com/anishathalye/dotbot # Add the Dotbot repo as a submodule
cp dotbot/tools/git-submodule/install . # Copy the install script to the main dotfiles folder
touch install.conf.yaml # create a config file for Dotbot
```

Boring part: done. Now on the the fun part of setting up your own dotfiles. Go ahead and move your current dotfiles into the dotfiles directory. If you want, you can set up subdirectories to group them based on purpose. I, for example, have a folder set up for shell configurations, as well as one set up for linters. Next, open `install.conf.yaml` in a text editor. This is where your configuration for dotbot will be. Here's my config file. We'll look at the important aspects of it a bit later.

```yaml
# install.conf.yaml
- defaults:
    link:
      relink: true

- clean: ['~']

- link:
    # Shell stuff
    ~/.aliases: shell/.aliases
    ~/.functions: shell/.functions
    ~/.zshrc: shell/.zshrc
    # Linters
    ~/.eslintrc: linters/.eslintrc
    # Git
    ~/.gitconfig: git/.gitconfig
    ~/.gitignore: git/.gitignore
    # Apps
    ~/.hammerspoon: applications/.hammerspoon
    ~/.zazurc.json: applications/.zazurc.json

- shell:
  - [git submodule update --init --recursive, Installing submodules]
```

The `clean` section is relatively self explanitory. It will check an array of directories for dead or broken links, and remove them. Here, I have it cleaning out my home folder.

The `link` section is where most of the good stuff happens. To setup a link, specify where the symbolic link itself should go, followed by where it should link to. If you want, you could link folders in addition to files.

The next section that is useful for configuration is the `shell` section. You can pass the shell section a list of commands to run on install. Optionally, you can pass in an array with the command, as well as a short description that will be displayed as the command is run while executing the install command. In my config, I have it installing/updating submodules. At some point in the future, I may also add another file of terminal commands to run to configure certain parts of my OS.

Finally is the `defaults` section. This lets you set default options for other commands. More info about the defaults, as well as additional options for the other commands can be found in the [Dotbot readme](https://github.com/anishathalye/dotbot/blob/master/README.md).

Now that your Dotbot config is complete, let's go ahead and run it.

```
[dotfiles] ./install
All targets have been cleaned
Link exists ~/.hammerspoon -> /Users/josiah/dotfiles/applications/.hammerspoon
Link exists ~/.functions -> /Users/josiah/dotfiles/shell/.functions
Link exists ~/.gitconfig -> /Users/josiah/dotfiles/git/.gitconfig
Link exists ~/.zazurc.json -> /Users/josiah/dotfiles/applications/.zazurc.json
Link exists ~/.gitignore -> /Users/josiah/dotfiles/git/.gitignore
Link exists ~/.zshrc -> /Users/josiah/dotfiles/shell/.zshrc
Link exists ~/.eslintrc -> /Users/josiah/dotfiles/linters/.eslintrc
Link exists ~/.aliases -> /Users/josiah/dotfiles/shell/.aliases
All links have been set up
Installing submodules [git submodule update --init --recursive]
All commands have been executed

==> All tasks executed successfully
[dotfiles]
```

As you can see, Dotbot is relatively verbose in letting you know what's going on. Oh, and that "`==> All tasks executed successfully`" line at the bottom? That means everything worked, and you are good to go with your dotfiles! If you get an error message instead, I would suggest checking out the [Dotbot repo](https://github.com/anishathalye/dotbot) and getting your issues fixed before moving on to the next part.

And now begins part 2... Configuring ZSH with Antigen. If you don't use ZSH as your shell (which you should), this doesn't apply to you. If you are one of those people though, I would definitely suggest checking out [Oh My ZSH](http://ohmyz.sh/).

And now for [Antigen](http://antigen.sharats.me/). Antigen makes managing your ZSH configuration simple. Let's look at my config to see how it works.

```bash
# .zshrc
ZSH_BASE=$HOME/dotfiles # Base directory for ZSH configuration

source $ZSH_BASE/antigen/antigen.zsh # Load Antigen

source ~/.aliases # Source some extra files
source ~/.functions

antigen use oh-my-zsh # Yes, I want to use Oh My ZSH

# Terminal stuff
antigen bundle git
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-history-substring-search
antigen bundle zsh-users/zsh-autosuggestions
antigen bundle z

# Node stuff
antigen bundle node
antigen bundle npm

# Do OS dependant stuff
case `uname` in
  Darwin)
    # Commands for OS X go here
    antigen bundle osx
  ;;
  Linux)
    # Commands for Linux go here
  ;;
esac

# Set the theme
antigen theme theunraveler

# And lastly, apply the Antigen stuff
antigen apply
```

That works and is pretty and everything but what does it do? Well... Let's give it a look.

```bash
ZSH_BASE=$HOME/dotfiles # Base directory for ZSH configuration

source $ZSH_BASE/antigen/antigen.zsh # Load Antigen

source ~/.aliases # Source some extra files
source ~/.functions
```

This section just does some basic setup. If you are using a different directory for your dotfiles, changing `ZSH_BASE` will let everything know where to look for stuff. Then comes the important step of sourcing Antigen. I also sourced some other files that I use for my shell configuration.

```bash
antigen use oh-my-zsh # Yes, I want to use Oh My ZSH

# Terminal stuff
antigen bundle git
antigen bundle zsh-users/zsh-syntax-highlighting
#...
```

The `antigen use` command lets you load a prepackaged library, and in this case, I'm loading [Oh My ZSH](http://ohmyz.sh/). Oh My ZSH has a bunch of plugins and tweaks that makes ZSH really nice to use, so I would definitely suggest including it. It also includes quite a few [themes](https://github.com/robbyrussell/oh-my-zsh/wiki/themes) as well. The `bundle` command tells Antigen which plugins to load. Oh My ZSH comes with plenty of [plugins](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins) ready for you to include, but Antigen also supports loading plugins from Gtihub repositories as well, as you can see with the [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) plugin. The only issue I had, was sometimes you only want a plugin to be included on certain operating systems. This is where the next section comes in.

```bash
# Do OS dependant stuff
case `uname` in
  Darwin)
    # Commands for OS X go here
    antigen bundle osx
  ;;
  Linux)
    # Commands for Linux go here
  ;;
esac
```

The `uname` command is used to figure out which OS is running, then the switch case includes the proper bundles for that system. Certainly useful, because for some reason, the macOS specific commands weren't running on my linux install. Can't imagine why... ¯\\\_(ツ)\_/¯

The `antigen theme` command is used to set which theme is being used for ZSH. Antigen includes all the themes from Oh My ZSH automatically, but if you want to use another one, it can also load other themes as well, just like the `bundle` command.

Finally, to actually get the plugins and load them into ZSH, you run `antigen apply`. This will fetch any bundles that are not already on your system as well.

Now, when you open your terminal, you should see your custom plugins and theme are applied and working. For further configuration, be sure to check out the [Antigen](http://antigen.sharats.me/) website. While you are at it, you may also want to do a bit further reading on [Dotbot](https://github.com/anishathalye/dotbot) so you can tweak it and make it work better for you. Lastly, don't forget to push your dotfiles to Github so you have a backup, just in case. While you are there, you may also want to star the Dotbot and Antigen repositories to show your appreciation for their authors' hard work.
