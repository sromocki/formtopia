default["formtopia_app"]["dir"]                              = "/opt/formtopia"
default["formtopia_app"]["user"]                             = "formtopia"
default["formtopia_app"]["log_dir"]                          = "#{node["formtopia_app"]["dir"]}/log"
default["formtopia_app"]["repository"]                       = "git://github.com/daftcorp/formtopia.git"
default["formtopia_app"]["port"]                             = 8082
default["formtopia_app"]["server_name"]                      = "www.formtopia.dev"

default["formtopia_app"]["analyzer"]["update_interval"]      = 60000
default["formtopia_app"]["analyzer"]["aggregation_interval"] = 600000
default["formtopia_app"]["analyzer"]["ping_history"]         = 8035200000

default["formtopia_app"]["mongodb"]["host"]                  = "127.0.0.1"
default["formtopia_app"]["mongodb"]["database"]              = "formtopia"
default["formtopia_app"]["mongodb"]["user"]                  = "root"
default["formtopia_app"]["mongodb"]["password"]              = ""

default["formtopia_app"]["monitor"]["name"]                  = "origin"
default["formtopia_app"]["monitor"]["api_endpoint"]          = "http://localhost:#{node["formtopia_app"]["port"]}/api"
default["formtopia_app"]["monitor"]["polling_interval"]      = 10000
default["formtopia_app"]["monitor"]["timeout"]               = 60000


default["formtopia_app"]["enable_basic_auth"]				  = false
default["formtopia_app"]["basic_auth_user"]				  = "admin"
default["formtopia_app"]["basic_auth_password"]			  = "l4tm42n"

default["formtopia_app"]["enable_alerts"]					  = false