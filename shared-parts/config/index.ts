type ProjectConfig = {
  axiosBaseUrl: string;
  axiosTimeout: number;
}

const config: ProjectConfig = {
  axiosBaseUrl: 'https://ogonkiy-todo-test-server-app.herokuapp.com/',
  axiosTimeout: 10000
}

export { config }
