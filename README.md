# TechDogTest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.2.

## Development server

Para instalar as dependencias:

```bash
npm install
```

Para rodar o projeto (atenção a versão 21.2.2 do angular instalada)

```bash
npx ng serve
```
ou

```bash
ng serve
```

Com isso o projeto estará rodando em `http://localhost:4200/`.



## Opção Docker

### se tiver o docker na máquina rode os seguintes comandos na raiz do projeto:


```bash
docker build -t tech-dog-test .
```


```bash
docker run -d -p 8080:80 tech-dog-test
```

Com isso o projeto estará rodando em `http://localhost:8080/`.



## Opção Docker e Makefile

### se tiver o Docker e Makefile na máquina rode os seguintes comandos na raiz do projeto:

```bash
make do-it-all
```

Com isso o projeto estará rodando em `http://localhost:8080/`.