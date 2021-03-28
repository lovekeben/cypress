pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npx cypress run'
            }
        }
        stage('Deploy') {
            steps {
                println "Deploy"
            }
        }
    }
}
