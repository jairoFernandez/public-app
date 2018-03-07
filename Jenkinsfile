pipeline {
  agent any
  stages {
    stage('Begin') {
      parallel {
        stage('Begin') {
          steps {
            sh 'echo "Hello desde jetkins"'
          }
        }
        stage('browser') {
          steps {
            echo 'Hola mundo'
          }
        }
      }
    }
  }
}