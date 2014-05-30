name             'formtopia-cookbook'
maintainer       'YOUR_NAME'
maintainer_email 'YOUR_EMAIL'
license          'All rights reserved'
description      'Installs/Configures formtopia-cookbook'
long_description 'Installs/Configures formtopia-cookbook'
version          '0.1.0'

%w{ apache2 git logrotate mongodb nodejs postfix apt build-essential }.each do |d|
  depends d
end

