# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.require_version ">= 1.5.0"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.hostname = "www.formtopia.dev"
  config.landrush.tld = "dev"
  config.landrush.enabled = true

  config.omnibus.chef_version = :latest

  config.vm.box = "precise64"

  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  config.vm.network :private_network, type: "dhcp"

  config.berkshelf.enabled = true

  # config.vm.synced_folder "omd/apps/cas/build/cas-server-webapp/target/cas-server-webapp-3.3.5", "/opt/cas.war", :mount_options => ["dmode=777","fmode=666"]
  # config.vm.synced_folder "bms/BMS.war", "/opt/BMS.war", :mount_options => ["dmode=777","fmode=666"]
  config.vm.synced_folder "./", "/opt/formtopia", :mount_options => ["dmode=777","fmode=666"]

  config.vm.provision :chef_solo do |chef|
    chef.run_list = [
        "recipe[formtopia-cookbook::default]"
    ]
  end
end
