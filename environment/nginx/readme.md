listen = Listen on express port
location  = Location of our docker container
proxy_set_header X-Real-IP $remote_addr = Retain the ip of the requester
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for = Make sure those ip is attached to the header
proxy_pass http://tsnode-docker:5000 = Send the traffic to our docker container
