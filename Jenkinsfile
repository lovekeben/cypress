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
                bat 'npm run cypress'
            }
        }
        stage('Deploy') {
            steps {
                println "Deploy"
            }
        }
    }
}