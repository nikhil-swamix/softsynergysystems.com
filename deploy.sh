#!/bin/bash
rsync -avz --delete --progress \
	--exclude='.claude' \
	--exclude='deploy.sh' \
	. oci:/var/www/softsynergysystems.com/
