do-it-all:
	docker build -t tech-dog-test .
	docker run -d -p 8080:80 tech-dog-test