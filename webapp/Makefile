SHELL=/bin/bash
api-server/%: ## api-server/${lang}docker-compose up with mysql and api-server 
	cp ../provisioning/ansible/roles/web-bootstrap/files/my.cnf ./docker-compose/mysql/my.cnf
	docker-compose -f docker-compose/$(shell basename $@).yaml down -v
	docker-compose -f docker-compose/$(shell basename $@).yaml up --build mysql api-server

isuumo/%: ## isuumo/${lang} docker-compose up with mysql and api-server frontend nginx
	cp ../provisioning/ansible/roles/web-bootstrap/files/my.cnf ./docker-compose/mysql/my.cnf
	docker-compose -f docker-compose/$(shell basename $@).yaml down -v
	docker-compose -f docker-compose/$(shell basename $@).yaml up --build mysql api-server nginx frontend

