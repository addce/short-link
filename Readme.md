A Short Link Service
---
![Test Status](https://img.shields.io/github/actions/workflow/status/addce/short-link/test.yml?branch=main&label=test&style=flat-square)

---

### How to run backend

- change dir`cd backend`
- install dependencies `npm i`
- run test  `npm test`
- start service  `npm start`

### How to run frontend

- install python
- change dir `cd frontend`
- run `python -m http.server 8080`
- you need change `13.58.176.19:3000` to `localhost:8080` in `frontend/index.html`file

### Description

#### Front end

Frontend's file contains in directory `frontend`

pure static file

#### Back end

Backend's file contains in directory `backend`

#### Software requirements

- node  (running backend server)
- python (using http.server module host static file, you can use anything other tool you like)
