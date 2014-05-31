include_recipe "apt"
include_recipe "build-essential"
include_recipe "git"
include_recipe "nodejs::install_from_package"
include_recipe "apache2"
include_recipe "apache2::mod_rewrite"
include_recipe "apache2::mod_alias"
include_recipe "apache2::mod_ssl"
include_recipe "apache2::mod_proxy"
include_recipe "apache2::mod_proxy_http"
include_recipe "apache2::mod_proxy_balancer"
include_recipe "mongodb::10gen_repo"
include_recipe "mongodb"
include_recipe "logrotate"
# include_recipe "postfix"

apt_package "openssl" do
  action :upgrade
end

user node["formtopia_app"]["user"] do
  system true
  shell "/bin/false"
end

# git node["formtopia_app"]["dir"] do
#   repository node["formtopia_app"]["repository"]
#   action :sync
#   notifies :restart, "service[formtopia-app]"
#   notifies :restart, "service[formtopia-monitor]"
# end

execute "npm-install" do
  cwd node["formtopia_app"]["dir"]
  command "npm install"
end

%w{ node-inspector nodemon }.each do |global|
  execute "node inspector" do
    cwd node["formtopia_app"]["dir"]
    command "npm install -g #{global}"
  end
end

template "#{node["formtopia_app"]["dir"]}/config/production.yml" do
  mode "0644"
  source "production.yml.erb"
  variables(
    :port                           => node["formtopia_app"]["port"],
    :mongodb_host                   => node["formtopia_app"]["mongodb"]["host"],
    :mongodb_database               => node["formtopia_app"]["mongodb"]["database"],
    :mongodb_user                   => node["formtopia_app"]["mongodb"]["user"],
    :mongodb_password               => node["formtopia_app"]["mongodb"]["password"],
    :monitor_name                   => node["formtopia_app"]["monitor"]["name"],
    :api_endpoint                   => node["formtopia_app"]["monitor"]["api_endpoint"],
    :monitor_polling_interval       => node["formtopia_app"]["monitor"]["polling_interval"],
    :monitor_timeout                => node["formtopia_app"]["monitor"]["timeout"],
    :analyzer_update_interval       => node["formtopia_app"]["analyzer"]["update_interval"],
    :analyzer_aggregation_interval  => node["formtopia_app"]["analyzer"]["aggregation_interval"],
    :analyzer_ping_history          => node["formtopia_app"]["analyzer"]["ping_history"],
    :enable_basic_auth              => node["formtopia_app"]["enable_basic_auth"],
    :basic_auth_user                => node["formtopia_app"]["basic_auth_user"],
    :basic_auth_password            => node["formtopia_app"]["basic_auth_password"],
    :enable_alerts                  => node["formtopia_app"]["enable_alerts"]
  )
  notifies :restart, "service[formtopia-app]"
  #notifies :restart, "service[formtopia-monitor]"
end

file "#{node["formtopia_app"]["dir"]}/config/runtime.json" do
  owner node["formtopia_app"]["user"]
  mode "0755"
  action :create
end

apache_module "proxy"
apache_module "proxy_http"
apache_module "proxy_balancer"

apache_site "000-default" do
  enable false
end

web_app "formtopia" do
  template "formtopia.conf.erb"
  docroot "#{node["formtopia_app"]["dir"]}/app/dashboard/public"
  server_name node["formtopia_app"]["server_name"]
end

directory node["formtopia_app"]["log_dir"] do
  mode "0755"
  owner node["formtopia_app"]["user"]
  group node["formtopia_app"]["user"]
end

logrotate_app "formtopia" do
  cookbook "logrotate"
  path "#{node["formtopia_app"]["log_dir"]}/*.log"
  frequency "daily"
  rotate 7
  create "644 root root"
end

[ "formtopia-app", "formtopia-inspector" ].each do |component|
  template "/etc/init/#{component}.conf" do
    mode "0644"
    source "#{component}.conf.erb"
    variables(
      :dir     => node["formtopia_app"]["dir"],
      :user    => node["formtopia_app"]["user"],
      :log_dir => node["formtopia_app"]["log_dir"]
      )
    notifies :restart, "service[#{component}]"
  end

  service component do
    provider Chef::Provider::Service::Upstart
    action [ :enable, :start ]
  end
end